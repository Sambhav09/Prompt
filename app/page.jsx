  "use client"

  import Feed from '@component/Feed';
  import React from 'react';
  import { useSession } from 'next-auth/react';

  export default function Home() {

    const { data: session, status } = useSession();

    if(status === "loading"){
      <p>hdafkhakdsfhafg</p>
      return
    }

    return (
      <div className='w-full flex justify-center items-center flex-col'>
      <h1 className='mt-5 text-5xl font-extrabold text-center text-black sm:text-6xl'>Discover and share</h1>
      <br />
      <span>AI-Powered Prompts</span>
      <p className='text-center'>It is an open source AI prompting tool for modern world to discover, share and create modern prompt</p>
      {session?.user._id && (<Feed/>)}

      </div>
    );
  }
