"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await fetch("/api/prompt/new", {
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
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      setPost({ prompt: "", tag: "" });
    }
  };

  return (
    <div className='w-full flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-32'>
      <h1 className='text-2xl md:text-3xl font-serif text-center mt-8'>Create Your Blog</h1>
      <form 
        onSubmit={handleSubmit} 
        className='flex flex-col w-full max-w-2xl mt-6'
      >
        <textarea
          placeholder='Enter the blog description'
          value={post.prompt}
          className='w-full mt-4 p-4 border border-gray-300 rounded-md text-lg resize-none overflow-hidden'
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
        />
        <input 
          type='text' 
          placeholder='Enter the tag'
          value={post.tag}
          className='w-full h-12 pl-4 mt-6 border border-gray-300 rounded-md text-lg'
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
        />
        <div className='flex flex-col sm:flex-row gap-6 mt-8 justify-between'>
          <Link href='/' className='text-blue-600 text-center sm:text-left'>
            Cancel
          </Link>
          <button 
            type='submit' 
            className='px-6 py-3 bg-blue-500 text-white hover:bg-gray-600 rounded-full border border-black shadow-lg w-full sm:w-auto'
          >
            {submitting ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;