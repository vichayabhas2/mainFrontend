"use client";
import { updateBottle } from "@/libs/user/updateBottle";
import { updateProfile } from "@/libs/user/updateProfile";
import updateSize from "@/libs/user/updateSize";

import { Checkbox, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { InterUser } from "../../intreface";
import { Session } from "next-auth";
import SelectSize from "./SelectSize";
import updateSleep from "@/libs/user/updateSleep";
import { Size } from "../../interface";

export default function UpdateProfileRaw({
  user,
  session,
}: {
  user: InterUser;
  session: Session | null;
}) {
  const userRef = useRef("");
  const [name, setName] = useState<string>(user.name);
  const [tel, setTel] = useState<string>(user.tel);
  const [email, setEmail] = useState<string>(user.email);
  const [nickname, setNickname] = useState<string>(user.nickname);
  const [lastname, setLastname] = useState<string>(user.lastname);
  const [citizenId, setCitizenId] = useState<string>(user.citizenId);
  const [shertSize, setShertSize] = useState<Size>(user.shertSize);
  const [haveBottle, setHaveBottle] = useState<boolean>(user.haveBottle);
  const [likeToSleepAtCamp, setLikeToSleepAtCamp] = useState<boolean>(
    user.likeToSleepAtCamp
  );
  const router = useRouter();
  if (!session) {
    router.push("/");
    return <></>;
  }
  //console.log(user)
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div className="text-4xl font-medium">Update Profile </div>

      <form className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        <div className="flex flex-row items-center">
          <label className="w-2/5 text-2xl text-slate-200">ชื่อจริง</label>
          <TextField
            name="Name"
            id="Name"
            defaultValue={name}
            className="w-3/5 bg-slate-100 rounded-2xl shadow-inner"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">นามสกุล</label>
          <TextField
            name="LastName"
            id="LastName"
            defaultValue={lastname}
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center">
          <label className="w-2/5 text-2xl text-slate-200">ชือเล่น</label>
          <TextField
            name="Nickname"
            id="Nickname"
            defaultValue={nickname}
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">Email</label>
          <TextField
            name="Email"
            id="Email"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={email}
          />
        </div>

        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">เบอร์โทรศัพท์</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setTel(e.target.value)}
            defaultValue={tel}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            รหัสประจำตัวประชาชน
          </label>
          <TextField
            name="citizenId"
            id="citizenId"
            defaultValue={citizenId}
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setCitizenId(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            เลือกขนาดเสื้อ
          </label>

          <SelectSize select={setShertSize} def={user.shertSize} />
        </div>

        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            มีกระติกน้ำหรือไม่
          </label>
          <Checkbox
            onChange={(e, state) => {
              setHaveBottle(state);
            }}
            defaultChecked={user.haveBottle}
          />
        </div>

        <div className="flex flex-row justify-end"></div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            ประสงค์นอนในค่ายหรือไม่
          </label>
          <Checkbox
            onChange={(e, state) => {
              setLikeToSleepAtCamp(state);
            }}
            defaultChecked={user.likeToSleepAtCamp}
          />
        </div>
        <div className="flex flex-row justify-end">
          <button
            className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50 "
            onClick={() => {
              alert(user._id);
            }}
          >
            รหัส mongo
          </button>
          <button
            className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            onClick={() => {
              console.log(tel);
              console.log(email);
              if (true) {
                try {
                  updateProfile(
                    email,
                    tel,
                    name,
                    nickname,
                    lastname,
                    citizenId,
                    session.user.token
                  );
                  updateSize(shertSize, session.user.token);
                  updateBottle(haveBottle, session.user.token);
                  updateSleep(likeToSleepAtCamp, session.user.token);
                } catch (error) {
                  console.log(error);
                }
              } else {
                alert("Please type in all the details!");
              }
            }}
          >
            update all
          </button>
        </div>
      </form>
    </div>
  );
}
