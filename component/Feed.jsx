"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Feed = () => {
  const [prompt, setPrompt] = useState([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const getPrompt = async () => {
      try {
        const res = await fetch(`/api/prompt${tag ? `?tag=${tag}` : ""}`);
        if (!res.ok) throw new Error("Failed to fetch prompts");
        const data = await res.json();
        setPrompt(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getPrompt();
  }, [tag]);

  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center">
        <input
          type="text"
          placeholder="Search any tag"
          className="w-1/2 p-3 mt-7 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 p-4 gap-4 pt-12">
        {prompt.length > 0 ? (
          prompt.map((prompt) => (
            <div
              key={prompt._id}
              className="flex flex-col border border-gray-300 p-4"
            >
              <div className="flex justify-between items-center">
                <img
                  src={prompt.userId.image}
                  alt="image"
                  className="h-12 w-12 rounded-full"
                />
                <div className="flex flex-col">
                  <h1>{prompt.userId.username}</h1>
                  <Link href={`/profile/${prompt.userId._id}`}>
                    <p className="text-blue-500">{prompt.userId.email}</p>
                  </Link>
                </div>
              </div>


              <br />
              <p className="text-xl">{prompt.prompt}</p>
              <div className="flex">
                #<p className="text-blue-400">{prompt.tag}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-2">
            No prompts found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Feed;
