"use client";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const registerAcct = async (newUser: any) => {
  const response = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(newUser),
  });
  if (!response.ok) throw new Error("Error while registering, Pls Try Again!");
  return response.json();
};
export default function Register() {
  const router = useRouter();
  const { data, mutate, isPending } = useMutation({
    mutationFn: registerAcct,
    onSuccess: () => {
      toast.success("You are registered! Congrats.");
      router.push("/login");
    },
    onError: (err) => toast.error(err.message),
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const userDetails = { username, email, password };
    mutate(userDetails);
  }

  return (
    <div className="bg-slate-200">
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-black p-4 rounded-md w-4/5 md:w-1/3 lg:w-1/2 xl:w-1/3"
        >
          <h2 className="text-center text-xl font-bold ">
            Register Into Xocial!
          </h2>
          <div className="mt-4">
            <label className="block">Username:</label>
            <input
              disabled={isPending}
              type="text"
              name="name"
              id="name"
              className="border-2 w-full border-black rounded px-2 py-2 mt-2 "
            />
          </div>

          <div className="mt-1">
            <label className="block">Email:</label>
            <input
              disabled={isPending}
              type="email"
              name="name"
              id="name"
              className="border-2 w-full border-black rounded px-2 py-2 mt-2 "
            />
          </div>

          <div className="mt-1">
            <label className="block">Password:</label>
            <input
              disabled={isPending}
              type="password"
              name="name"
              id="name"
              className="border-2 w-full border-black rounded px-2 py-2 mt-2 "
            />
          </div>

          <div>
            <button
              disabled={isPending}
              className="text-white bg-black border-2 border-white px-2 py-2 rounded w-full mt-2 hover:bg-slate-800"
            >
              Register Now
            </button>
          </div>
          <p className="text-slate-800">
            Already registered!{" "}
            <Link href="/login" className="hover:text-slate-200 font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
