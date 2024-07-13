"use client";
import Image from "next/image";
import BannerImg from "@/public/banner_img.png";
import Avatar from "@/public/avatar.png";
import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

export default function Profile() {
  const [openModal, setOpenModal] = useState(false);
  useEffect(
    function () {
      function handleOutsideClick(event: any) {
        if (!event?.target.closest(".modal")) {
          setOpenModal(false);
        }
      }
      document.addEventListener("click", handleOutsideClick);
      return function () {
        document.removeEventListener("click", handleOutsideClick);
      };
    },
    [openModal]
  );

  return (
    <div>
      <div className="relative  lg:w-2/3  lg:mx-auto">
        <Image
          src={BannerImg}
          width={1000}
          height={200}
          alt="banner_img"
          className="rounded-md shadow-xl border-black border-2"
        />
        <div className="absolute -mt-12 left-6">
          <Image
            src={Avatar}
            alt="avatar"
            width={1000}
            height={1000}
            className="size-20 rounded-full border-black border-2"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-between px-4 lg:w-2/3 lg:mx-auto ">
        <div>
          <h2 className="font-semibold text-xl">Ayomide</h2>
          <p className="text-slate-400">@ayomide</p>
          <button
            onClick={() => setOpenModal(true)}
            className="rounded-md p-2 bg-slate-600 text-white mt-2 hover:bg-black"
          >
            Edit
          </button>
        </div>
        <div>
          <button className="bg-black px-2 py-2 rounded font-medium hover:bg-slate-600 text-white">
            Follow
          </button>
        </div>
      </div>

      {openModal && (
        <div
          aria-hidden="true"
          className="fixed modal bottom-0 top-20 left-0 right-0 mx-auto rounded w-4/5 h-4/5 lg:w-1/2  md:left-1/4  md:w-2/3  bg-slate-200"
        >
          <div className=" mt-3 flex justify-between px-3">
            <h2 className="font-semibold md:text-xl">
              UPDATE YOUR PROFILE INFO
            </h2>
            <IoCloseCircle
              onClick={() => setOpenModal(false)}
              className="size-8 cursor-pointer"
            />
          </div>

          <div className="mt-4 px-4 w-full">
            <form action="">
              <div>
                <label className="block  font-medium">Username:</label>
                <input
                  type="text"
                  placeholder="Your username..."
                  className="w-[100%] px-2 py-2 rounded mt-1"
                />
              </div>

              <div className="mt-3">
                <label className="block  font-medium">Email:</label>
                <input
                  type="email"
                  placeholder="Your email..."
                  className="w-[100%] px-2 py-2 rounded mt-1"
                />
              </div>

              <div className=" mt-3">
                <label
                  htmlFor="profile_img"
                  className="block relative  font-medium mb-20"
                >
                  Profile Image:
                  <Image
                    src={Avatar}
                    width={1000}
                    height={1000}
                    alt="banner_img"
                    className="rounded-full  size-20 absolute   border-black border-2"
                  />
                </label>
                <input
                  id="profile_img"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  hidden
                />
              </div>

              <div className=" mt-3 ">
                <label
                  htmlFor="banner_img"
                  className="block relative font-medium pb-20"
                >
                  Banner Image:
                  <Image
                    src={BannerImg}
                    width={1000}
                    height={200}
                    alt="banner_img"
                    className="rounded-md shadow-xl  absolute w-[100%] h-24 border-black border-2"
                  />
                </label>
                <input
                  id="banner_img"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  hidden
                />
              </div>

              <div className="mt-8 ">
                <button className="bg-black p-2 w-full rounded text-white font-medium hover:bg-slate-600">
                  Update Your Info
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
