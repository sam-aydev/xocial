import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import LoginButton from "./LoginButton";
import { AuthError } from "next-auth";

export default async function Login() {
  const session = await auth();
  if (session) {
    console.log(session?.user);
    redirect("/app");
  }
  return (
    <div className="bg-slate-200">
      <div className="flex justify-center items-center h-screen">
        <form
          action={async function (formData) {
            "use server";

            try {
              await signIn("credentials", formData);
            } catch (error) {
              if (error instanceof AuthError) {
                switch (error.type) {
                  case "CredentialsSignin":
                    return "Invalid Credentials";
                  default:
                    return "Something went wrong";
                }
              }
              throw error;
            }
          }}
          className="bg-white border-2 border-black p-4 rounded-md w-4/5 md:w-1/3 lg:w-1/2 xl:w-1/3"
        >
          <h2 className="text-center text-xl font-bold ">
            Login To Your Account!
          </h2>

          <div className="mt-1">
            <label className="block">Email:</label>
            <input
              required
              type="email"
              name="email"
              id="email"
              className="border-2 w-full border-black rounded px-2 py-2 mt-2 "
            />
          </div>

          <div className="mt-1">
            <label className="block">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="border-2 w-full border-black rounded px-2 py-2 mt-2 "
            />
          </div>
          <LoginButton />
          <p className="text-slate-800 ">
            Don't have an account!{" "}
            <Link href="/signup" className="hover:text-slate-200 font-medium">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
