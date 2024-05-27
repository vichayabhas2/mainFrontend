"use client";
import { updateBottle } from "@/libs/user/updateBottle";
import { updateProfile } from "@/libs/user/updateProfile";
import updateSize from "@/libs/user/updateSize";

import { Input, TextField, ToggleButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { InterUser } from "../../intreface";
import { Session } from "next-auth";
import SelectSize from "./SelectSize";

export default function UpdateProfileRaw({
  user,
  session,
}: {
  user: InterUser;
  session: Session | null;
}) {
  const userRef = useRef("");
  const router = useRouter();
  const [tel, setTel] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [shertSize, setShertSize] = useState<
    "S" | "M" | "L" | "XL" | "XXL" | "3XL" | null
  >(null);
  const [haveBottle, setHaveBottle] = useState<boolean | null>(null);
  if (!session) {
    router.push("/");
    return <></>;
  }
  //console.log(user)
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div className="text-4xl font-medium">Update Profile </div>
      
      <form className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">Email</label>
          <TextField
            name="Email"
            id="Email"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">Telephone</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setTel(e.target.value)}
          />
        </div>

        <div className="flex flex-row justify-end">
          <button
            className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            onClick={() => {
              //console.log(tel);
              //console.log(email);

              //console.log(userRef);
              if (tel && email) {
                try {
                  updateProfile(email, tel, session.user.token);
                } catch (error) {
                  console.log(error);
                }
              } else {
                alert("Please type in all the details!");
              }
            }}
          >
            update email and tel
          </button>
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            เลือกขนาดเสื้อ
          </label>
          
          <SelectSize select={setShertSize}/>
        </div>
        <div className="flex flex-row justify-end">
          <button
            className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            onClick={() => {
              if (shertSize) {
                try {
                  updateSize(shertSize, session.user.token);
                } catch (error) {
                  console.log(error);
                }
              } else {
                alert("Please type in all the details!");
              }
            }}
          >
            update size
          </button>
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            มีกระติกน้ำหรือไม่
          </label>
          <Input
            type="radio"
            id="bottle"
            value={"true"}
            onClick={() => setHaveBottle(true)}
            className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-600"
          />
          <label className="w-2/5 text-2xl text-slate-200">มี</label>
          <Input
            type="radio"
            id="bottle"
            value={"false"}
            onClick={() => setHaveBottle(false)}
            className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-600"
          />
          <label className="w-2/5 text-2xl text-slate-200">ไม่มี</label>
        </div>
        <div className="flex flex-row justify-end">
            <button
            className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50 "
            onClick={() => {alert(user._id)
              }}
          >
            รหัส mongo
          </button>
          <button
            className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            onClick={() => {
              console.log(tel);
              console.log(email);

              //console.log(userRef);
              if (haveBottle != null) {
                try {
                  updateBottle(haveBottle, session.user.token);
                } catch (error) {
                  console.log(error);
                }
              } else {
                alert("Please type in all the details!");
              }
            }}
          >
            update กระติกน้ำ
          </button>
        </div>
      </form>
      
    </div>
  );
}
