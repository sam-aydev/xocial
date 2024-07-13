"use client";

import Image from "next/image";
import Avatar from "@/public/avatar.png";
import { useUsers } from "@/utils/hooks/useUsers";

export default function People() {
  const { users, usersStatus } = useUsers();

  if (usersStatus === "success") {
    console.log(users);
  }

  return (
    <div>
      <div className="grid grid-cols-3 lg:grid-cols-4 place-items-center gap-x-2 gap-y-6">
        <div className="text-center">
          <div className="px-4">
            <Image
              src={Avatar}
              className="size-16 "
              alt="avatar"
              width={100}
              height={100}
            />
          </div>
          <div>
            <p className="">My Username</p>
            <button className="text-white bg-black p-2 rounded hover:bg-slate-600">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
