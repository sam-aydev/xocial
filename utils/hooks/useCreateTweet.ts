import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

async function createTweet(body: any) {
  try {
    const res = await fetch("/api/tweet", {
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

export function useCreateTweet() {
  const queryClient = new QueryClient();
  const {
    mutate,
    isPending,
    error,
    data,
    isSuccess: isTweetSuccess,
  } = useMutation({
    mutationFn: createTweet,
    mutationKey: ["tweet"],
    onSuccess: () => {
      toast.success("You created a tweet!");
      queryClient.invalidateQueries({ queryKey: ["tweet"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { mutate, isPending, error, isTweetSuccess, data };
}
