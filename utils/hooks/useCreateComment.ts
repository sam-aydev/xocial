import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

async function createComment(body: any) {
  try {
    const res = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("There is error in creating tweet");
    return await res.json();
  } catch (error) {
    throw new Error("There is problem adding tweet");
  }
}

export function useCreateComment() {
  const queryClient = new QueryClient();
  const {
    mutate,
    isPending,
    error,
    data,
    isSuccess: isCommentSucess,
  } = useMutation({
    mutationFn: createComment,
    mutationKey: ["tweet"],
    onSuccess: () => {
      toast.success("You just commented!");
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { mutate, isPending, error, isCommentSucess, data };
}
