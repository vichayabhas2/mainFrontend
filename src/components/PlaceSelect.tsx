"use client";

import { useState } from "react";
import { AllPlaceData, InterBuilding, InterPlace } from "../../interface";
import mongoose from "mongoose";
import { useSession } from "next-auth/react";
import { MenuItem, Select } from "@mui/material";
import BackToHome from "./BackToHome";
export default function PlaceSelect({
  place,
  onClick,
  buildingText,
  placeText,
  allPlaceData, //const allPlaceData=await getAllPlaceData()
}: {
  place: InterPlace | null;
  onClick: (outPut: InterPlace) => void;
  buildingText: string;
  placeText: string;
  allPlaceData: AllPlaceData; //const allPlaceData=await getAllPlaceData()
}) {
  // dispatch = useDispatch<AppDispatch>();
  //const update = useAppSelector((state) => state.bookSlice.bookItem);
  const { data: session } = useSession();

  const [nP, setNP] = useState<InterPlace | null>(place);

  const [nB, setNB] = useState<string | null>(
    allPlaceData.allBuildings.get(place?.buildingId as mongoose.Types.ObjectId)
      ?.name as string | null
  );

  const nC = nB ? (allPlaceData.allPlace.get(nB) as InterPlace[]) : [];
  const buildings: string[] = [];
  allPlaceData.allPlace.forEach((e, input: string) => {
    buildings.push(input);
  });
  if (!session) {
    return <BackToHome />;
  }
  return (
    <>
      <div className="flex flex-row items-center my-5">
        <label className="w-2/5 text-2xl text-white">{buildingText}</label>
        <Select
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px] text-white"
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
        <label className="w-2/5 text-2xl text-white">{placeText}</label>
        <Select
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px] text-white"
          defaultValue={`${nP?.floor} ${nP?.room}`}
        >
          {nC?.map((choice: InterPlace) => {
            return (
              <MenuItem
                value={`${choice.floor} ${choice.room}`}
                onClick={() => {
                  onClick(choice);
                  setNP(choice);
                }}
              >
                {choice.floor} {choice.room}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </>
  );
}
