import {clerkClient} from '@clerk/clerk-sdk-node'

// This is used to get the count of users who are trusted
export const getTrustedUsersCount = async(req, res)=>{
    const count = await clerkClient.users.getCount()
    if(count === undefined || count === null){
        return res.json({ success: false, message: "Could not fetch trusted users count" })
    }
    res.json({ success: true, count: count })
}