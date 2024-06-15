"use client";

import { useState } from "react";
import {
  InterBaanFront,
  InterBuilding,
  InterCampFront,
  InterPlace,
} from "../../interface";
import mongoose from "mongoose";
import { useSession } from "next-auth/react";
import { MenuItem, Select, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import updateBaan from "@/libs/admin/updateBaan";
import BackToHome from "./BackToHome";
import updatePart from "@/libs/admin/updatePart";
export default function UpdatePartClient({
  place,
  allPlace,
  allBuildings,
  partId

}: {
  place: InterPlace | null;
  allPlace: Map<string, InterPlace[]>;
  allBuildings: Map<mongoose.Types.ObjectId, InterBuilding>;
  partId:mongoose.Types.ObjectId

}) {
  // dispatch = useDispatch<AppDispatch>();
  //const update = useAppSelector((state) => state.bookSlice.bookItem);
  const { data: session } = useSession();

  const [nP, setNP] = useState<InterPlace | null>(place);
  
  const [nB, setNB] = useState<string | null>(
    allBuildings.get(place?.buildingId as mongoose.Types.ObjectId)?.name as
      | string
      | null
  );
  
  const nC = nB ? (allPlace.get(nB) as InterPlace[]) : [];
  const buildings: string[] = [];
  allPlace.forEach((e, input: string) => {
    buildings.push(input);
  });
  if (!session) {
    return <BackToHome />;
  }
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div className="text-4xl font-medium">Update Part</div>

      <form className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        

        
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            เลือกตึกที่ใช้เป็นห้องฝ่าย
          </label>
          <Select
            variant="standard"
            name="location"
            id="location"
            className="h-[2em] w-[200px]"
            defaultValue={nB}
          >
            {buildings.map((choice: string) => {
              return (
                <MenuItem value={choice} onClick={() => setNB(choice)}>
                  {choice}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            เลือกชั้นและห้องที่ใช้เป็นห้องฝ่าย
          </label>
          <Select
            variant="standard"
            name="location"
            id="location"
            className="h-[2em] w-[200px]"
            defaultValue={nP}
          >
            {nC?.map((choice: InterPlace) => {
              return (
                <MenuItem
                  value={`${choice.flore} ${choice.room}`}
                  onClick={() => setNP(choice)}
                >
                  {choice.flore} {choice.room}
                </MenuItem>
              );
            })}
          </Select>
        </div>

        <div className="flex flex-row justify-end">
          <button
            className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            onClick={() => {
              if (nP) {
                try {
                    updatePart(partId,nP._id,session.user.token)
                  
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
