"use client";
import { Select, MenuItem } from "@mui/material";
import mongoose from "mongoose";
import { useRef, useState } from "react";
import { MyMap } from "../../interface";

export default function SelectTemplate({
  mapIn,
  select,
  buttonText,
}: {
  mapIn: MyMap[];
  select: (output: mongoose.Types.ObjectId) => void;
  buttonText: string;
}) {
  const userRef = useRef("");

  const [chose, setChose] = useState<mongoose.Types.ObjectId | null>(null);
  return (
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
          if (chose) {
            console.log("ffffffffffffffffffffffffffff");
            try {
              console.log("ffffffffffffffffffffffffffff");
              select(chose);
            } catch (error) {
              console.log(error);
            }
          } else {
            alert("Please type in all the details!");
          }
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}
