import Image from "next/image";
import { BiComment, BiCommentAdd, BiHeart, BiSolidHeart } from "react-icons/bi";
import Avatar from "@/public/avatar.png";
import { useEffect, useState } from "react";
import { useCreateComment } from "@/utils/hooks/useCreateComment";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { getComment } from "@/utils/hooks/actions/getComment";
import { timeAgo } from "@/utils/hooks/actions/TimeSpent";
import { useCreateLike } from "@/utils/hooks/useCreateLike";
import { useDeleteLike } from "@/utils/hooks/useDeleteLike";
import { getTweetById } from "@/utils/useTweet";

export default function Tweets({ tweet }: any) {
  const [openComent, setOpenComment] = useState<boolean>(false);
  const [body, setBody] = useState<string>("");
  const [id, setId] = useState("");
  const [like, setLike] = useState(false);
  const { mutate, error, isCommentSucess } = useCreateComment();
  const { mutateLike, likes, isLoadingCreateLike, errorLike, isLikeSuccess } =
    useCreateLike();
  const { deleteLik, isDeleteSuccess, isDeletingLike, errorDeleteLike } =
    useDeleteLike();

  function handleComment(id: string) {
    if (!body) {
      toast.error("Please add a comment!");
      return;
    }

    mutate({ body, id });
    setBody("");
  }

  const {
    data: comments,
    isPending: isLoadingComment,
    error: commentError,
    isSuccess,
    refetch,
  } = useQuery({
    queryFn: () => getComment(id),
    queryKey: ["comments", id],
    staleTime: 0,
    refetchInterval: 1000,
  });

  const {
    data,
    error: errorTweetById,
    isPending: isLoadingATweet,
    refetch: tweetIdfetch,
    status,
  } = useQuery({
    queryFn: () => getTweetById(id),
    queryKey: ["tweet", id],
    enabled: false,
  });

  if (status === "success") {
    console.log(data);
  }

  useEffect(
    function () {
      if (data) {
        setLike(data?.tweetById?.includes(id));
      }
    },
    [data]
  );

  function handleCommentId(id: string) {
    setOpenComment((open) => !open);

    setId(id);
    refetch();
  }

  function handleLike(authorId: string, tweetId: string) {
    mutateLike({ authorId, tweetId });
    setId(tweetId);
    tweetIdfetch();
    console.log(likes);
  }
  function handleUnlike(authorId: string, tweetId: string) {
    deleteLik({ authorId, tweetId });
    setLike(false);
  }
  return (
    <div>
      <div className="flex space-x-4 mt-4">
        <div>
          <Image
            src={Avatar}
            className="size-12"
            alt="avatar"
            width={100}
            height={100}
          />
        </div>
        <div>
          <div>
            <p className="font-semibold">{tweet.author?.username}</p>
          </div>
          <div className="font-medium">
            @{tweet.author?.username.toLocaleLowerCase()}
          </div>
        </div>
        <div>
          <p>{timeAgo(tweet.createdAt)}</p>
        </div>
      </div>
      <div>
        <div className="mt-2">
          <p>{tweet.body}</p>
        </div>
        <div className="flex justify-between mt-2">
          {!like ? (
            <BiHeart
              className="size-6 cursor-pointer"
              onClick={() => handleLike(tweet.author.id, tweet.id)}
            />
          ) : (
            <BiSolidHeart
              className="size-6 cursor-pointer"
              onClick={() => handleUnlike(tweet.author.id, tweet.id)}
            />
          )}

          <BiComment
            className="size-6 cursor-pointer "
            onClick={() => handleCommentId(tweet.id)}
          />
        </div>
      </div>

      {openComent && (
        <div>
          <div className="w-full mt-3 pb-3 flex space-x-4 justify-end">
            <input
              onChange={(e: any) => setBody(e.target.value)}
              type="text"
              className="py-1 px-2 w-[60%] rounded border-2 border-black"
            />
            <BiCommentAdd
              onClick={() => handleComment(tweet.id)}
              className="size-9 rounded-full bg-slate-100 p-2"
            />
          </div>
          {comments?.commentsWithUsers?.map(
            (comment: any) =>
              id === comment.tweetId && (
                <div key={comment.id} className="flex justify-end w-full mt-4">
                  <div className="flex space-x-2 w-[80%]">
                    <Image
                      src={Avatar}
                      className="size-12"
                      alt="avatar"
                      width={100}
                      height={100}
                    />
                    <div>
                      <p className="font-semibold">
                        {comment.author?.username}
                      </p>
                      <p>{comment.body}</p>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
