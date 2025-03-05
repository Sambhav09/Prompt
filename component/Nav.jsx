"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";
import {Loader} from "lucide-react"

const Nav = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (status === "loading") {
    return <div className="w-full h-screen flex justify-center items-center "><Loader className="h-36 w-36" /></div>;
  }

  return (
    <div className="flex justify-between items-center m-5 mb-20">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/Images/logo.svg" width={30} height={30} alt="profile" />
        </Link>
        <p className="text-xl font-bold ml-4">Prompt</p>
      </div>


      <div className="hidden md:flex gap-5">
        {session?.user ? (
          <>
            <Link href="/create-prompt">
              <button className="p-3 border border-r-4 shadow-lg rounded-full bg-black text-white hover:text-black hover:bg-white">
                Create Prompt
              </button>
            </Link>
            <button
              className="p-3 border border-r-4 shadow-lg rounded-full bg-red-500 text-white hover:text-black hover:bg-white"
              onClick={() => signOut()}
            >
              Signout
            </button>
            <Link href={`/profile/${session?.user?._id}`}>
              <Image
                src={session?.user?.image || "/default-avatar.png"}
                width={50}
                height={50}
                alt="User Image"
                className="rounded-full"
              />
            </Link>
          </>
        ) : (
          <button
            className="p-3 border border-r-4 shadow-lg rounded-full bg-black text-white hover:text-black hover:bg-white"
            onClick={() => signIn("google")}
          >
            Sign in
          </button>
        )}
      </div>


      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
        {isOpen && (
          <div className="absolute right-5 top-16 bg-white shadow-lg rounded-lg p-5 flex flex-col gap-3 border border-gray-200">
            {session?.user ? (
              <>
                <Link href="/create-prompt">
                  <button className="p-3 border border-r-4 shadow-lg rounded-full bg-black text-white hover:text-black hover:bg-white">
                    Create Prompt
                  </button>
                </Link>
                <button
                  className="p-3 border border-r-4 shadow-lg rounded-full bg-red-500 text-white hover:text-black hover:bg-white"
                  onClick={() => signOut()}
                >
                  Signout
                </button>
                <Link href={`/profile/${session?.user?._id}`}>
                  <Image
                    src={session?.user?.image || "/default-avatar.png"}
                    width={50}
                    height={30}
                    alt="User Image"
                    className="rounded-full"
                  />
                </Link>
              </>
            ) : (
              <button
                className="p-3 border border-r-4 shadow-lg rounded-full bg-black text-white hover:text-black hover:bg-white"
                onClick={() => signIn("google")}
              >
                Sign in
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
