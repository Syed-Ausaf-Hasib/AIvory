import OpenAI from "openai";
import sql from "../configs/db.js";
import axios from "axios";
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
import pdf from 'pdf-parse/lib/pdf-parse.js'
import { clerkClient } from "@clerk/express";

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

// GENERATING ARTICLES FROM OPENAI
export const generateArticle = async (req, res) => {
    try{
        // Taking the req and passing through auth
        // Thus auth() is inbuilt function of clerk
        // It returns userId and has function to check the plan
        const {userId}= req.auth();
        const {prompt, length} = req.body;
        // The next values were set by the auth middleware we created
        const plan = req.plan;
        const free_usage = req.free_usage;

        // Checking if the user has premium plan or not
        if(plan !== 'premium' && free_usage >= 10){
            return res.json({ success: false, message: 'Free usage limit reached. Upgrade to premium for more requests.' });
        }

        // If the user has premium plan or free usage is available
        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },

            ],
            temperature: 0.7,
            max_tokens: length,
        });
        const content = response.choices[0].message.content;

        // Storing the usage in the database
        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article')`;

        // Updating free usage if the user is on free plan
        if(plan !== 'premium'){
            await  clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            });
        }
        res.json({ success: true, content });
    }
    catch(err){
        console.log(err.message);
        res.json({ success: false, message: 'Failed to generate article', error: err.message });
    }
}

// GENERATING BLOG TITLE FROM OPENAI
export const generateBlogTitle = async (req, res) => {
    try{
        // Taking the req and passing through auth
        // Thus auth() is inbuilt function of clerk
        // It returns userId and has function to check the plan
        const {userId}= req.auth();
        const {prompt} = req.body;
        // The next values were set by the auth middleware we created
        const plan = req.plan;
        const free_usage = req.free_usage;

        // Checking if the user has premium plan or not
        if(plan !== 'premium' && free_usage >= 10){
            return res.json({ success: false, message: 'Free usage limit reached. Upgrade to premium for more requests.' });
        }

        // If the user has premium plan or free usage is available
        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },

            ],
            temperature: 0.7,
            // Tells the AI how many characters long
            max_tokens: 100,
        });
        const content = response.choices[0].message.content;

        // Storing the usage in the database
        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

        // Updating free usage if the user is on free plan
        if(plan !== 'premium'){
            await  clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            });
        }
        res.json({ success: true, content });
    }
    catch(err){
        console.log(err.message);
        res.json({ success: false, message: 'Failed to generate title', error: err.message });
    }
}

// GENERATING IMAGE FROM CLIPDROPAI
export const generateImage = async (req, res) => {
    try{
        // Taking the req and passing through auth
        // Thus auth() is inbuilt function of clerk
        // It returns userId and has function to check the plan
        const {userId}= req.auth();
        const {prompt, publish} = req.body;
        // The next values were set by the auth middleware we created
        const plan = req.plan;

        // Checking if the user has premium plan or not
        if(plan !== 'premium'){
            return res.json({ success: false, message: 'This feature is only available for premium subscriptions' });
        }

        // The user has premium plan
        const formData = new FormData()
        formData.append('prompt', prompt)
        console.log("Till beofre generation")
        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {'x-api-key': process.env.CLIPDROP_API_KEY},
            responseType: 'arraybuffer'
        })
        console.log("After Generation")
        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

        // Storing the usage in the cloudinary database then using that url to store inside neon
        const {secure_url} = await cloudinary.uploader.upload(base64Image) 
        await sql`INSERT INTO creations (user_id, prompt, content, type, publish) VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})`;

        res.json({ success: true, content: secure_url });
    }
    catch(err){
        console.log(err.message);
        res.json({ success: false, message: 'Failed to generate image', error: err.message });
    }
}

// REMOVING BACKGROUND USING CLOUDINARY 
export const removeImageBackground = async (req, res) => {
    try{
        // Taking the req and passing through auth
        // Thus auth() is inbuilt function of clerk
        // It returns userId and has function to check the plan
        const {userId}= req.auth();
        const {image} = req.file;
        // The next values were set by the auth middleware we created
        const plan = req.plan;

        // Checking if the user has premium plan or not
        if(plan !== 'premium'){
            return res.json({ success: false, message: 'This feature is only available for premium subscriptions' });
        }

        // The user has premium plan
        const {secure_url} = await cloudinary.uploader.upload(image.path, {
            transformation: [
                {
                    effect: 'background_removal',
                    background_removal: 'remove_the_background'
                }
            ]
        }) 

        // Storing the usage in the cloudinary database then using that url to store inside neon
        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')`;

        res.json({ success: true, content: secure_url });
    }
    catch(err){
        console.log(err.message);
        res.json({ success: false, message: 'Failed to remove BG', error: err.message });
    }
}

// REMOVING OBJECT USING CLOUDINARY 
export const removeImageObject = async (req, res) => {
    try{
        // Taking the req and passing through auth
        // Thus auth() is inbuilt function of clerk
        // It returns userId and has function to check the plan
        const {userId}= req.auth();
        const {object} = req.body;
        const {image} = req.file;
        // The next values were set by the auth middleware we created
        const plan = req.plan;

        // Checking if the user has premium plan or not
        if(plan !== 'premium'){
            return res.json({ success: false, message: 'This feature is only available for premium subscriptions' });
        }

        // The user has premium plan
        const {public_id} = await cloudinary.uploader.upload(image.path) 
        const imageUrl = cloudinary.url(public_id, {
            transformation: [{effect: `gen_remove:${object}`}],
            resource_type: 'image'
        })

        // Storing the usage in the cloudinary database then using that url to store inside neon
        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${`Remove ${object} from image`}, ${imageUrl}, 'image')`;

        res.json({ success: true, content: imageUrl });
    }
    catch(err){
        console.log(err.message);
        res.json({ success: false, message: 'Failed to remove object', error: err.message });
    }
}

// REVIEWING RESUME USING OPENAI 
export const resumeReview = async (req, res) => {
    try{
        // Taking the req and passing through auth
        // Thus auth() is inbuilt function of clerk
        // It returns userId and has function to check the plan
        const {userId}= req.auth();
        const resume = req.file;
        // The next values were set by the auth middleware we created
        const plan = req.plan;

        // Checking if the user has premium plan or not
        if(plan !== 'premium'){
            return res.json({ success: false, message: 'This feature is only available for premium subscriptions' });
        }

        if(resume.size > 5*1024*1024){
            return res.json({success: false, message: "Resume file size exceeds allowed size (5MB)"})
        }
        const dataBuffer = fs.readFileSync(resume.path)
        const pdfData = await pdf(dataBuffer)

        const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses and areas for improvement. Resume Content:\n\n${pdfData.text}`
        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },

            ],
            temperature: 0.7,
            // Tells the AI how many characters long
            max_tokens: 1000,
        });
        const content = response.choices[0].message.content;


        // Storing the usage in the cloudinary database then using that url to store inside neon
        await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Review uploaded resume', ${content}, 'resume-review')`;

        res.json({ success: true, content });
    }
    catch(err){
        console.log(err.message);
        res.json({ success: false, message: 'Failed to remove BG', error: err.message });
    }
}