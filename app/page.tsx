import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="h-screen bg-slate-200 flex justify-center text-center items-center">
        <div className="px-10 space-y-4">
          <p className="text-2xl font-semibold">
            Welcome To The Platform Of That Connect Everbody!
          </p>
          <button className="px-2 py-2 rounded-md  bg-black text-white font-semibold hover:bg-slate-800">
            <Link href="/signup">Get Started Connecting</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
