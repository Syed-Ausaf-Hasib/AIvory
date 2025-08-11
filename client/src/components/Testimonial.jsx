import React from 'react'
import { assets, dummyTestimonialData } from '../assets/assets'

const Testimonial = () => {
  return (
    <div className='px-4 sm:px-5 xl:px-10 py-24'>
        {/* Title and Description */}
        <div className='text-center'>
            <h2 className='text-slate-700 text-[42px] font-semibold'>Loved by Creators</h2>
            <p className='text-gray-500 max-w-lg mx-auto'>Don't just take our word for it. Here's what our users are saying.</p>
        </div>

        {/* Testimonial Cards */}
        <div className='mx-10 flex flex-wrap mt-10 justify-center'>
            {dummyTestimonialData.map((testimonial, index) => (
                <div key={index} className='p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition duration-300 cursor-pointer'>
                    {/* Stars */}
                    <div className="flex items-center gap-1">
                        {/* REPEATING DARK STARS RATING NUMBER OF TIMES AND THE REST AS DULL STARS */}
                        {Array(5).fill(0).map((_, i) => (
                            <img key={i} src={i < testimonial.rating ? assets.star_icon : assets.star_dull_icon} alt="star" classname='w-4 h-4'/>
                        ))}
                    </div>
                    <p className='text-gray-500 text-sm my-5'>"{testimonial.content}"</p>
                    <hr className='mb-5 border-gray-300' />
                    <div className='flex items-center gap-4'>
                        <img src={testimonial.image} className='w-12 object-contain rounded-full' alt='' />
                        <div className='text-sm text-gray-600'>
                            <h3 className='font-medium'>{testimonial.name}</h3>
                            <p className='text-xs text-gray-500'>{testimonial.title}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )
}

export default Testimonial
