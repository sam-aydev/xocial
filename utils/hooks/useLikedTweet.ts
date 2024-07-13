import { useQuery } from "@tanstack/react-query";

async function getLikedTweets() {
  const res = await fetch("/api/likedtweet");
  if (!res.ok) throw new Error("Unable to get users");
  return await res.json();
}

export function useLikedTweet() {
  const { data: likedTweet, status: likedTweetStatus } = useQuery({
    queryFn: getLikedTweets,
    queryKey: ["tweets"],
  });

  return {
    likedTweet,
    likedTweetStatus,
  };
}
