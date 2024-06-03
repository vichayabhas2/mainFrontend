"use client";
import { Select, MenuItem } from "@mui/material";
import mongoose from "mongoose";
import { useRef, useState } from "react";

export default function SelectTemplate({
  mapIn,
  select,
}: {
  mapIn: Map<string, mongoose.Types.ObjectId>;
  select: Function;
}) {
  const userRef = useRef("");
  const choices: string[] = [];
  mapIn.forEach((v, k: string) => {
    choices.push(k);
  });
  const [chose, setChose] = useState<string| null>(null);
  return (
    <div className=" rounded-lg ">
      <Select
        variant="standard"
        name="location"
        id="location"
        className="h-[2em] w-[200px]"
      >
        {choices.map((choice: string) => {
          return <MenuItem value={choice} onClick={()=>{setChose(choice)}}>{choice}</MenuItem>;
        })}
      </Select>
      <button
        className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
        onClick={async () => {
          console.log(userRef);
          if (chose) {
            console.log("ffffffffffffffffffffffffffff");
            try {
              console.log("ffffffffffffffffffffffffffff");
              select(mapIn.get(chose));
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
    </div>
  );
}
