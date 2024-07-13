"use client";
import { useFormStatus } from "react-dom";

export default function LoginButton() {
  const { pending, data } = useFormStatus();

  console.log(data);
  return (
    <div>
      <button
        disabled={pending}
        className="text-white bg-black border-2 border-white px-2 py-2 rounded w-full mt-2 hover:bg-slate-800"
      >
        {pending ? "Signing In" : "Sign In"}
      </button>
    </div>
  );
}
