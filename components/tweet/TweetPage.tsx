"use client";
import Image from "next/image";
import Avatar from "@/public/avatar.png";

import { toast } from "react-toastify";
import { useState } from "react";
import { useCreateTweet } from "@/utils/hooks/useCreateTweet";
import { useTweets } from "@/utils/hooks/useTweets";

import Tweets from "./Tweets";

export default function TweetPage() {
  const [body, setBody] = useState<string>("");
  const { isPending, mutate, error, isTweetSuccess } = useCreateTweet();
  const { isSuccess, isgettingTweets, allTweets, gettweetsError } = useTweets();

  function handleTweet(e: any) {
    e.preventDefault();
    if (!body) {
      toast.error("Please type a tweet");
      return;
    }

    mutate({ body });
    setBody("");
  }

  return (
    <div>
      <div className="pb-20">
        <div className="flex space-x-4 w-full">
          <div className="w-[15%]">
            <Image
              src={Avatar}
              className="size-14"
              alt="avatar"
              width={100}
              height={100}
            />
          </div>

          <div className="w-[80%]">
            <textarea
              disabled={isPending}
              value={body}
              onChange={(e: any) => setBody(e.target.value)}
              placeholder="Let's Tweet"
              className="border-black border-2 resize-none w-full  rounded p-2"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            disabled={isPending}
            onClick={(e) => handleTweet(e)}
            className="rounded-full font-medium bg-black px-4 py-2 text-white hover:bg-slate-600"
          >
            Tweet
          </button>
        </div>
      </div>

      {allTweets?.tweetWithUsers?.map((tweet: any) => (
        <Tweets tweet={tweet} key={tweet.id} />
      ))}
    </div>
  );
}
