"use client";

import { useState } from "react";
import { InterBuilding, InterPlace } from "../../interface";
import mongoose from "mongoose";
import { useSession } from "next-auth/react";
import { MenuItem, Select } from "@mui/material";
import BackToHome from "./BackToHome";
export default function PlaceSelect({
  place,
  allPlace,
  allBuildings,
  onClick,
}: {
  place: InterPlace | null;
  allPlace: Map<string, InterPlace[]>;
  allBuildings: Map<mongoose.Types.ObjectId, InterBuilding>;
  onClick: (outPut: InterPlace) => void;
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
    <>
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
                onClick={() => {
                  onClick(choice);
                  setNP(choice);
                }}
              >
                {choice.flore} {choice.room}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </>
  );
}
