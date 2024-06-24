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
export default function UpdateBaanClient({
  baan,
  boy,
  girl,
  normal,
  allPlace,
  allBuildings,
  camp,
}: {
  baan: InterBaanFront;
  boy: InterPlace | null;
  girl: InterPlace | null;
  normal: InterPlace | null;
  allPlace: Map<string, InterPlace[]>;
  allBuildings: Map<mongoose.Types.ObjectId, InterBuilding>;
  camp: InterCampFront;
}) {
  // dispatch = useDispatch<AppDispatch>();
  //const update = useAppSelector((state) => state.bookSlice.bookItem);
  const { data: session } = useSession();
  const [bP, setBP] = useState<InterPlace | null>(boy);
  const [gP, setGP] = useState<InterPlace | null>(girl);
  const [nP, setNP] = useState<InterPlace | null>(normal);
  const [bB, setBB] = useState<string | null>(
    allBuildings.get(boy?.buildingId as mongoose.Types.ObjectId)?.name as
      | string
      | null
  );
  const [gB, setGB] = useState<string | null>(
    allBuildings.get(girl?.buildingId as mongoose.Types.ObjectId)?.name as
      | string
      | null
  );
  const [nB, setNB] = useState<string | null>(
    allBuildings.get(normal?.buildingId as mongoose.Types.ObjectId)?.name as
      | string
      | null
  );
  const bC = bB ? (allPlace.get(bB) as InterPlace[]) : [];
  const gC = gB ? (allPlace.get(gB) as InterPlace[]) : [];
  const nC = nB ? (allPlace.get(nB) as InterPlace[]) : [];
  const [name, setName] = useState<string>(baan.name);
  const [fullName, setFullName] = useState<string | null>(baan.fullName);
  const [link, setLink] = useState<string | null>(baan.link);
  const buildings: string[] = [];
  allPlace.forEach((e, input: string) => {
    buildings.push(input);
  });
  if (!session) {
    return <BackToHome />;
  }
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div className="text-4xl font-medium">Update บ้าน </div>

      <form className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200"> ชื่อย่อ</label>
          <TextField
            name="Email"
            id="Email"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setName(e.target.value)}
            defaultValue={baan.name}
          />
        </div>

        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">ชื่อเต็ม</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setFullName(e.target.value)}
            defaultValue={baan.fullName}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">link</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setLink(e.target.value)}
            defaultValue={baan.link}
          />
        </div>

        {camp.nongSleepModel == "ไม่มีการค้างคืน" ? null : (
          <>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-slate-200">
                เลือกตึกที่ใช้เป็นห้องนอนน้องผู้ชาย
              </label>
              <Select
                variant="standard"
                name="location"
                id="location"
                className="h-[2em] w-[200px]"
                defaultValue={bB}
              >
                {buildings.map((choice: string) => {
                  return (
                    <MenuItem value={choice} onClick={() => setBB(choice)}>
                      {choice}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>

            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-slate-200">
                เลือกชั้นและห้องที่ใช้เป็นห้องนอนน้องผู้ชาย
              </label>
              <Select
                variant="standard"
                name="location"
                id="location"
                className="h-[2em] w-[200px]"
                defaultValue={`${bP?.flore} ${bP?.room}`}
              >
                {bC?.map((choice: InterPlace) => {
                  return (
                    <MenuItem
                      value={`${choice.flore} ${choice.room}`}
                      onClick={() => setBP(choice)}
                    >
                      {choice.flore} {choice.room}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>

            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-slate-200">
                เลือกตึกที่ใช้เป็นห้องนอนน้องผู้หญิง
              </label>
              <Select
                variant="standard"
                name="location"
                id="location"
                className="h-[2em] w-[200px]"
                defaultValue={gB}
              >
                {buildings.map((choice: string) => {
                  return (
                    <MenuItem value={choice} onClick={() => setGB(choice)}>
                      {choice}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-slate-200">
                เลือกชั้นและห้องที่ใช้เป็นห้องนอนน้องผู้หญิง
              </label>
              <Select
                variant="standard"
                name="location"
                id="location"
                className="h-[2em] w-[200px]"
                defaultValue={`${gP?.flore} ${gP?.room}`}
              >
                {gC?.map((choice: InterPlace) => {
                  return (
                    <MenuItem
                      value={`${choice.flore} ${choice.room}`}
                      onClick={() => setGP(choice)}
                    >
                      {choice.flore} {choice.room}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </>
        )}
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            เลือกตึกที่ใช้เป็นห้องบ้าน
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
            เลือกชั้นและห้องที่ใช้เป็นห้องบ้าน
          </label>
          <Select
            variant="standard"
            name="location"
            id="location"
            className="h-[2em] w-[200px]"
            defaultValue={`${nP?.flore} ${nP?.room}`}
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
              if (true) {
                try {
                  updateBaan(
                    {
                      name,
                      fullName,
                      baanId: baan._id,
                      link,
                      girlSleepPlaceId: gP ? gP._id : null,
                      boySleepPlaceId: bP ? bP._id : null,
                      nomalPlaceId: nP ? nP._id : null,
                    },
                    session.user.token
                  );
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
