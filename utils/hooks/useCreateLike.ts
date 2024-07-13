import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

async function createLike({ authorId, tweetId }: any) {
  try {
    const res = await fetch("/api/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authorId, tweetId),
    });
    if (!res.ok) throw new Error("There is error in creating tweet");
    return await res.json();
  } catch (error) {
    throw new Error("There is problem adding tweet");
  }
}

export function useCreateLike() {
  const queryClient = new QueryClient();
  const {
    mutate: mutateLike,
    isPending: isLoadingCreateLike,
    error: errorLike,
    data: likes,
    isSuccess: isLikeSuccess,
  } = useMutation({
    mutationFn: createLike,
    mutationKey: ["like"],
    onSuccess: () => {
      toast.success("You liked a tweet!");
      queryClient.invalidateQueries({ queryKey: ["like"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return {
    mutateLike,
    likes,
    isLoadingCreateLike,
    errorLike,
    isLikeSuccess,
  };
}
