"use client";

import { useRouter } from "next/navigation";
import { InterBuilding } from "../../interface";
import { TextField } from "@mui/material";
import { useState } from "react";
import createBuilding from "@/libs/randomthing/createBuilding";
import { InterPlace } from "../../intreface";

export default function PlaceClient({
  places,
  token
}: {
  places: InterPlace[];
  token:string
}) {
  const [newName, setNewName] = useState<string | null>(null);
  const router = useRouter();
  return (
    <>
      {places.map((place) => (
        <div
          className="flex flex-row h-auto"
          onClick={() => {
            router.push(`/place/${place.buildingId}/${place._id}`);
          }}
        >
          <div className="w-1/5 h-auto relative rounded-t-lg"></div>

          <div className="w-3/5 h-auto p-[10px]">
            <div className="text-left pl-5">
              <div className="text-3xl">{place.flore} {place.room}</div>
            </div>
          </div>
          <div className="w-1/5 h-auto bg-slate-800 rounded-xl hover:bg-slate-600"></div>
        </div>
      ))}
      <div className="flex flex-row items-center">
        <label className="w-2/5 text-2xl text-slate-200">เพิ่มห้อง</label>
        <TextField
          name="Name"
          id="Name"
          className="w-3/5 bg-slate-100 rounded-2xl shadow-inner"
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <button
        className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
        onClick={() => {
          if (newName) {
            try {
                createBuilding(newName,token)

            } catch (error) {
              console.log(error);
            }
          } else {
            alert("Please type in all the detavdtrjbyfugjunils!");
          }
        }}
      >
        สร้างตึก
      </button>
    </>
  ); 
}
