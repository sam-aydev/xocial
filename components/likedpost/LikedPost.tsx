"use client";

import { useLikedTweet } from "@/utils/hooks/useLikedTweet";

export default function LikedTweet() {
  const { likedTweet, likedTweetStatus } = useLikedTweet();
  if (likedTweetStatus === "success") {
    console.log(likedTweet);
  }
  return (
    <div>
      <div className="pb-4">
        <div className="bg-slate-200 p-3 rounded lg:w-[60%] lg:mx-auto">
          <p className="font-semibold">34 mins ago</p>
          <p className="mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            facere culpa officiis blanditiis quae cupiditate molestias sit unde
            a repudiandae architecto, similique, quos omnis expedita pariatur.
          </p>
        </div>
      </div>
    </div>
  );
}
