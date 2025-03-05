"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page = () => {
    const { id } = useParams();
    console.log("id in frotned is", id);
    const { data: session, status } = useSession();

    const [prompt, setprompt] = useState([])

    const router = useRouter();

    const getPrompt = async () => {
        try {
            const response = await fetch(`/api/users/${id}`);
            if (!response.ok) throw new Error("Failed to fetch data");

            const data = await response.json();
            setprompt(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        if (status === "loading") {
            return;
        };
        if (!id) {
            console.warn(" ID is undefined, skipping API call.");
            return;
        }

        getPrompt();
    }, [id, status]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/prompt/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) throw new Error("Failed to delete prompt");

            getPrompt();
        } catch (error) {
            console.error("Error deleting prompt:", error);
        }
    }

    const userInfo = prompt.length > 0 ? prompt[0].userId : null;

    return (
        <div>
            {userInfo && (
   <div className="w-full flex flex-col md:flex-row items-center justify-between bg-white shadow-md border border-green-100 p-6 rounded-lg">
   <img 
       src={userInfo.image} 
       className="h-24 w-24 border-4 border-green-300 rounded-full object-cover" 
       alt="User Profile"
   />
   <div className="text-center md:text-left mt-4 md:mt-0">
       <h1 className="text-2xl font-bold text-gray-800">{userInfo.username}</h1>
       <p className="text-gray-600">{userInfo.email}</p>
   </div>
</div>

            )}
            <h1 className='text-3xl font-bold flex justify-center p-5'>Prompts</h1>
            {session?.user?._id === id ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-4'>
                    {prompt.map((prompt) => (
                        <div key={prompt._id} className='flex flex-col border border-gray-300 p-4'>
                            {prompt.userId && (
                                <>
                                    <div className='flex justify-between items-center '>
                                        <img src={prompt.userId.image} alt="image" className='w-15 h-15 rounded-full' />
                                        <div className='flex flex-col'>
                                            <p className='font-bold'>{prompt.userId.username}</p>
                                            <p>{prompt.userId.email}</p>
                                        </div>
                                    </div>
                                    <div className='pt-4'>
                                        <p className='pt-3' >Prompt : {prompt.prompt}</p>
                                        <p className='text-blue-500 pt-3'>Tag : #{prompt.tag}</p>
                                    </div>
                                    <div className='flex justify-center gap-15 pt-4'>
                                        <button className='p-3 px-5 hover:bg-black hover:text-white rounded-4xl border  bg-blue-300 ' onClick={() => router.push(`/update-prompt/${prompt._id}`)}>Edit</button>
                                        <button className='p-3 px-5 hover:bg-black hover:text-white rounded-4xl border  bg-blue-300 ' onClick={() => handleDelete(prompt._id)}>Delete</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}

                </div>
        
            )

                :

                (
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-4'>
                        {prompt.map((prompt) => (
                            <div key={prompt._id} className='flex flex-col border border-gray-300 p-4'>
                                {prompt.userId && (
                                    <>
                                        <div className='flex justify-between items-center '>
                                            <img src={prompt.userId.image} alt="image" className='w-15 h-15 rounded-full' />
                                            <div className='flex flex-col'>
                                                <p className='font-bold'>{prompt.userId.username}</p>
                                                <p>{prompt.userId.email}</p>
                                            </div>
                                        </div>
                                        <div className='pt-4 px-5'>
                                            <p className='pt-3' >Prompt : {prompt.prompt}</p>
                                            <p className='text-blue-500 pt-3'>Tag : #{prompt.tag}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}

                    </div>
                )
            }
        </div>
        
    );
};

export default Page;
