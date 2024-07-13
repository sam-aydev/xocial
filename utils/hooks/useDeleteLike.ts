import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

async function deleteLike({ authorId, tweetId }: any) {
  try {
    const res = await fetch("/api/likes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authorId, tweetId),
    });
    if (!res.ok) throw new Error("There is error in deleting tweet");
    return await res.json();
  } catch (error) {
    throw new Error("There is problem deleting tweet");
  }
}

export function useDeleteLike() {
  const queryClient = new QueryClient();
  const {
    mutate: deleteLik,
    isPending: isDeletingLike,
    error: errorDeleteLike,
    isSuccess: isDeleteSuccess,
  } = useMutation({
    mutationFn: deleteLike,
    mutationKey: ["like"],
    onSuccess: () => {
      toast.success("You unliked a tweet!");
      queryClient.invalidateQueries({ queryKey: ["like"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteLik, isDeletingLike, errorDeleteLike, isDeleteSuccess };
}
