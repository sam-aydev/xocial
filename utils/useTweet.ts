export async function getTweetById(tweetId: string) {
  const res = await fetch(`/api/tweet/${tweetId}`);
  if (!res.ok) return new Error("Error in getting tweet");
  return await res.json();
}
