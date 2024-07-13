import { useQuery } from "@tanstack/react-query";

async function getTweets() {
  try {
    const res = await fetch("/api/tweet");
    if (!res.ok) return;
    return await res.json();
  } catch (error) {
    throw new Error("Unable to get tweet");
  }
}

export function useTweets() {
  const {
    data: allTweets,
    isPending: isgettingTweets,
    error: gettweetsError,
    isSuccess,
  } = useQuery({
    queryKey: ["tweet"],
    queryFn: getTweets,
    staleTime: 0,
    refetchInterval: 1000,
  });
  return { allTweets, isgettingTweets, gettweetsError, isSuccess };
}
