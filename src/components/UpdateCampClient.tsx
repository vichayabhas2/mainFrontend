"use client";

import { useRouter } from "next/navigation";
import { InterCampFront } from "../../interface";
import { InterBaanFront } from "../../intreface";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { TextField, Checkbox } from "@mui/material";

export default function UpdateCampClient({
  baans,
  camp,
}: {
  baans: InterBaanFront[];
  camp: InterCampFront;
}) {
  const router = useRouter();
  const [registerSheetLink, setRegisterSheetLink] = useState<string | null>(
    camp.registerSheetLink
  );
  const [link, setLink] = useState<string | null>(camp.link);
  const [pictureUrls, setPictureUrls] = useState<string[]>(camp.pictureUrls);
  const [logoUrl, setLogoUrl] = useState<string | null>(camp.logoUrl);
  const [dataLock, setDataLock] = useState<boolean>(camp.dataLock);
  const [open, setOpen] = useState<boolean>(camp.open);
  const [allDone, setAllDone] = useState<boolean>(camp.allDone);
  const [lockChangePickup, setLockChangePickup] = useState<boolean>(
    camp.lockChangePickup
  );
  const [peeLock, setPeeLock] = useState<boolean>(camp.peeLock);
  const [dateStart, setDateStart] = useState<Date>(camp.dateStart);
  const [dateEnd, setDateEnd] = useState<Date>(camp.dateEnd);
  const { data: session } = useSession();
  return<></>


  /*return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div className="text-4xl font-medium">Update Profile </div>

      <form className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">Email</label>
          <TextField
            name="Email"
            id="Email"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setLink(e.target.value)}
            defaultValue={link}
          />
        </div>

        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">Telephone</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setPictureUrls(e.target.value.split(','))}
            defaultValue={pictureUrls.toLocaleString()}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">Telephone</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setPictureUrls(e.target.value.split(','))}
            defaultValue={link}
          />
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
            ชอบนอนในค่ายหรือไม่
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
            className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            onClick={() => {
              if (true) {
                try {
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
  );*/
}
