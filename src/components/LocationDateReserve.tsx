"use client";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InterCampFront } from "../../intreface";
import { useRef, useState } from "react";
import staffRegisterCamp from "@/libs/camp/staffRegister";
import SelectTemplate from "./SelectTemplate";
import mongoose from "mongoose";

export default function LocationDateReserve({
  partMap,
  token,
}: {
  partMap: Map<string, mongoose.Types.ObjectId>;
  token: string;
}) {
  const userRef = useRef("");
  const choices: string[] = [];
  partMap.forEach((v: mongoose.Types.ObjectId, k: string) => {
    choices.push(k);
  });
  const [partName, setPartName] = useState<string | null>(null);
  return (
    <SelectTemplate
      mapIn={partMap}
      select={(partId: mongoose.Types.ObjectId) => {
        staffRegisterCamp(partId, token);
      }}
    />
  );
} /*<div className=" rounded-lg ">
            <Select variant="standard" name="location" id="location" onChange={(e)=>setPartName(e.target.value as string)}
            className="h-[2em] w-[200px]">
                {choices.map((choice:string)=>{
                    return(<MenuItem value={choice}>{choice}</MenuItem>)
                })}
            </Select>
            <button
            className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            onClick={async () => {
              console.log(userRef);
              if (partName) {
                console.log("ffffffffffffffffffffffffffff");
                try {
                  console.log("ffffffffffffffffffffffffffff");
                  staffRegisterCamp(partMap.get(partName) as string,token)
                } catch (error) {
                  console.log(error);
                }
              } else {
                alert("Please type in all the details!");
              }
            }}
          >
            Register
          </button>





        </div>*/
