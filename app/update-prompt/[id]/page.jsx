"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const page = () => {

    const { id} = useParams();

    const router = useRouter();

    const [prompt, setprompt] = useState({prompt: "", tag: ""});

    useEffect(() => {
        if(!id) {
            console.warn(" ID is undefined, skipping API call.");
            return;
        }
        const getPrompt = async () => {
            try {
                const response = await fetch(`/api/prompt/${id}`,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) throw new Error("Failed to fetch data");

                const data = await response.json();
                setprompt(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getPrompt();
    }, [id])

    const handleSubmit = async () => {
        try {
            const response = await fetch(`/api/prompt/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(prompt),
            });
            if (!response.ok) throw new Error("Failed to update prompt");

            setprompt({ prompt: "", tag: "" });
            router.push("/")
        } catch (error) {
            console.error("Error updating prompt:", error);
        }
    }


    
  return (
    <div className='flex flex-col  justify-center items-center p-5 '>  
        <p>Enter the prompt here</p>
        <input className='w-1/2 border border-red-500 p-3 m-3' type="text" value={prompt.prompt} placeholder='Enter the Prompt here' onChange={(e) => setprompt({...prompt, prompt : e.target.value })} />
        
        <input className='w-1/2 p-3 border border-red-500 mt-7' type="text" value={prompt.tag} placeholder='Enter the tag here' onChange={(e) => setprompt({...prompt, tag : e.target.value })} />
        <p className='pt-4 -pb-5'>Enter the tag here</p>
        <button className='mt-10 p-3  border bg-blue-400 rounded-4xl' type='submit' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default page
