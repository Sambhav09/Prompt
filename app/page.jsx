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
      <div className='w-full flex justify-center items-center flex-col p-5 sm:p-1'>
      <h1 className='mt-5 text-5xl font-extrabold text-center '>Discover and share</h1>
      <br />
      <span className='text-red-400'>AI-Powered Prompts</span>
      <p className='text-center pt-5 sm:pt-0'>It is an open source AI prompting tool for modern world to discover, share and create modern prompt</p>
      {session?.user._id && (<Feed/>)}

      </div>
    );
  }
