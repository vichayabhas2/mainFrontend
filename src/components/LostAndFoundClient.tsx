"use client";

import mongoose from "mongoose";
import { InterBuilding, InterPlace, MyMap } from "../../interface";
import { useRef, useState } from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import PlaceSelect from "./PlaceSelect";
import SelectTemplate from "./SelectTemplate";
import addLostAndFound from "@/libs/randomthing/addLostAndFound";

export default function LostAndFoundClient({
  allBuildings,
  allPlace,
  mapIn,
  token,
}: {
  allPlace: Map<string, InterPlace[]>;
  allBuildings: Map<mongoose.Types.ObjectId, InterBuilding>;
  mapIn: MyMap[];
  token: string;
}) {
  const userRef = useRef("");

  const [chose, setChose] = useState<mongoose.Types.ObjectId | null>(null);
  const [placeId, setPlaceId] = useState<mongoose.Types.ObjectId | null>(null);
  const [detail, setDetail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [type, setType] = useState<"lost" | "found" | null>(null);
  return (
    <form className="w-[70%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
      <div className=" rounded-lg ">
        <label className="w-2/5 text-2xl text-slate-200">lost or found</label>
        <Select
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px]"
        >
          <MenuItem
            onClick={() => {
              setType("lost");
            }}
            value="ค้นหาของหาย"
          >
            ค้นหาของหาย
          </MenuItem>
          <MenuItem
            onClick={() => {
              setType("found");
            }}
            value="เจอของไม่มีเจ้าของ"
          >
            เจอของไม่มีเจ้าของ
          </MenuItem>
        </Select>
      </div>

      <div className="flex flex-row items-center">
        <label className="w-2/5 text-2xl text-slate-200">สิ่งของอะไร</label>
        <TextField
          name="Name"
          id="Name"
          className="w-3/5 bg-slate-100 rounded-2xl shadow-inner"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-row items-center">
        <label className="w-2/5 text-2xl text-slate-200">รายละเอียด</label>
        <TextField
          name="Name"
          id="Name"
          className="w-3/5 bg-slate-100 rounded-2xl shadow-inner"
          onChange={(e) => setDetail(e.target.value)}
        />
      </div>
      <PlaceSelect
        place={null}
        allPlace={allPlace}
        allBuildings={allBuildings}
        onClick={(place) => {
          setPlaceId(place._id);
        }}
        buildingText={"ตึกที่พบเจอหรือคิดว่าทำหายถ้ารู้"}
        placeText={"ชั้นและห้องที่พบเจอหรือคิดว่าทำหายถ้ารู้"}
      />
      <div className=" rounded-lg ">
        <Select
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px]"
        >
          {mapIn.map((choice: MyMap) => {
            return (
              <MenuItem
                value={choice.value}
                onClick={() => {
                  setChose(choice.key);
                }}
              >
                {choice.value}
              </MenuItem>
            );
          })}
        </Select>
        <button
          className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
          onClick={async () => {
            console.log(userRef);
            try {
              if (type && detail && name)
                addLostAndFound(
                  {
                    type,
                    campId: chose,
                    name,
                    detail,
                    placeId,
                  },
                  token
                );
            } catch (error) {}
          }}
        >
          ประกาศ lost & found
        </button>
      </div>
    </form>
  );
}
