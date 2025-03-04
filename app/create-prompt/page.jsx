"use client"

import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';


const page = () => {

  const [submitting, setsubmitting] = useState(false)
  const {data:session} = useSession()

  const [post, setpost] = useState({
    prompt: '',
    tag: '',
  })



  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      setsubmitting(true)
      const res = await fetch("/api/prompt/new", {   
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user._id,
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

    }catch(error){
      console.log(error)
    }finally{
      setsubmitting(false)
      setpost({prompt:"", tag:""})
    }
      
  }


  return (
    <div className='w-full flex justify-center items-center flex-col' >
      <h1 className='text-2xl font-serif ml-40' >Create you blog</h1>
      <form onSubmit={handleSubmit} className='flex flex-col w-full justify-center items-center '>
        <textarea
          placeholder="Enter the blog description"
          value={post.prompt}
          className="w-2/6 mt-10 p-5 border border-r-8 border-gray-300 rounded-md text-lg resize-none overflow-hidden"
          onChange={(e) => setpost({...post , prompt:e.target.value})}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
        />
        <input type="text" placeholder='Enter the tag'
          value={post.tag}
          className='w-2/6 h-10 pl-5 mt-16 border border-gray-100 rounded-md text-lg'
          onChange={(e) => setpost({...post, tag:e.target.value})}

        />
        <div className='flex gap-10 mt-12 justify-between items-center'>
          <Link href="/" className='text-blue-600'>
          Cancel
          </Link>
          <button type='submit' className='p-3 bg-blue-400 hover:bg-gray-400 hover:text-black border rounded-full border-black shadow-2xl'>{submitting ? "Create..." : "Create"}</button>
        </div>

      
      </form>
    </div>
  )
}

export default page
