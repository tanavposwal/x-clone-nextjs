"use client";
import Back from "@/components/Back";
import axios from "axios";
import { useState, useEffect } from "react";
import { HiBadgeCheck } from "react-icons/hi";
import { FaUserEdit } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { loginState } from "@/recoil/recoilState";
import { IoLogOut } from "react-icons/io5";

export default function Home() {
  const [logged, setLogged] = useRecoilState(loginState);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    success: false,
    user: {
      image: "",
      name: "twiclone user",
      username: "a.user",
      since: "2000-12-29",
      bio: "a user of twi clone.",
      followers: "99",
      following: "999",
      verified: false,
    },
  });

  useEffect(() => {
    reload();
  }, []);

  function reload() {
    axios
      .get("http://localhost:3001/user/me", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((req) => {
        setData(req.data);
        setLoading(false);
      });
  }

  return (
    <div className="px-5 mt-4">

      <div className="my-2">
        <Back />
      </div>

      {logged ? (
        <div className="border-b pb-2 px-6 border-slate-800 select-none">
          <div className="pb-4 pt-8 flex flex-col gap-3">
            {loading ?
            <div className="w-28 h-28 rounded-full bg-slate-800 animate-pulse"></div> :
            <img
              className="w-28 rounded-full"
              src={data.user.image}
              alt="user"
            />  
            }
            <div className={"flex "+ (loading &&"blur-sm animate-pulse")}>
            <div className="flex flex-1 flex-col justify-center">
              <p className="text-2xl font-extrabold">{data.user.name}</p>
              <div className="flex items-center gap-1">
                <p className="text-md font-medium">@{data.user.username}</p>
                {data.user.verified && (
                  <span className="text-xl">
                    <HiBadgeCheck className="fill-blue-500" />
                  </span>
                )}
              </div>
              <p className="text-md font-semibold text-slate-300">
                {data.user.bio}
              </p>
            </div>
            </div>
          </div>
          
          <div className="text-sm">
            <p className={"text-slate-400 "+ (loading && "blur-sm  animate-pulse")}>
              joined {data.user.since.substring(0, 10)}
            </p>
          </div>
          <div className={"flex gap-2 divide-slate-400 text-sm text-slate-400 " + (loading && "blur-sm")}>
            <div className="flex gap-2 text-slate-400">
              <p className="text-slate-400">{data.user.followers}</p>
              <p className="text-slate-400">followers</p>
            </div>
            <p className="text-slate-400">•</p>
            <div className="flex gap-2 text-slate-400">
              <p className="text-slate-400">{data.user.following}</p>
              <p className="text-slate-400">following</p>
            </div>
          </div>

          <div className={"py-4 flex gap-4 " +  (loading && "blur-sm")}>
            <button onClick={() => {
              localStorage.removeItem("token");
              setLogged(false);
            }} className="w-10 h-10 flex rounded-full hover:bg-red-600/20 bg-white/20 group items-center justify-center text-2xl transition-colors"><IoLogOut className="bg-transparent group-hover:fill-red-500 transition-colors" /></button>
            <button className="w-10 h-10 flex rounded-full hover:bg-blue-600/20 bg-white/20 group items-center justify-center text-xl transition-colors"><FaUserEdit className="bg-transparent group-hover:fill-blue-500 transition-colors" /></button>
          </div>
        </div>
      ) : (
        <div className="h-56 w-full flex items-center justify-center">
          Login to continue
        </div>
      )}
    </div>
  );
}
