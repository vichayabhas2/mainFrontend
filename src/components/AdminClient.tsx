"use client";

import { Session } from "next-auth";
import { CreateCamp, InterNameContainer } from "../../intreface";
import { Select, MenuItem, TextField } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

export default function AdminClient({
  campNameContainers,
  session,
}: {
  campNameContainers: InterNameContainer[];
  session: Session;
}) {
  const [chose, setChose] = useState<string | null>(null);
  const [round, setRound] = useState<number | null>(null);
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  const [memberStructre, setMemberStructre] = useState<
    | "nong->highSchool,pee->1year,peto->2upYear"
    | "nong->highSchool,pee->2upYear"
    | "nong->1year,pee->2upYear"
    | "nong->highSchool,pee->allYear"
    | null
  >(null);
  const [registerModel, setRegisterModel] = useState<
    "noPaid" | "noInterview" | "all" | null
  >(null);
  const [boardIds, setBoardIds] = useState<string[]>([]);

  return (
    <form className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
      <div className=" rounded-lg ">
        <Select
          variant="standard"
          name="location"
          id="location"
          onChange={(e) => setChose(e.target.value as string)}
          className="h-[2em] w-[200px]"
        >
          {campNameContainers.map((choice: InterNameContainer) => {
            return <MenuItem value={choice.id}>{choice.name}</MenuItem>;
          })}
        </Select>
      </div>

      <div className=" rounded-lg ">
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">Password</label>
          <input
            type="number"
            id="name"
            name="name"
            required
            onChange={(e) => {
              setRound(parseInt(e.target.value));
            }}
          />
        </div>
      </div>
      <div className=" rounded-lg ">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            className="bg-white m-10"
            value={dateStart}
            onChange={(newValue) => {
              setDateStart(newValue);
              console.log(newValue);
            }}
          />
        </LocalizationProvider>
      </div>
      <div className=" rounded-lg ">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            className="bg-white m-10"
            value={dateEnd}
            onChange={(newValue) => {
              setDateEnd(newValue);
              console.log(newValue);
            }}
          />
        </LocalizationProvider>
      </div>
      <div className=" rounded-lg ">
        <Select
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px]"
        >
          <MenuItem
            onSelect={() => {
              setMemberStructre("nong->highSchool,pee->1year,peto->2upYear");
            }}
          >
            น้องค่ายเป็นเด็กมใปลาย พี่บ้านเป็นปี 1
          </MenuItem>
          <MenuItem
            onSelect={() => {
              setMemberStructre("nong->1year,pee->2upYear");
            }}
          >
            น้องค่ายเป็นปี 1
          </MenuItem>
          <MenuItem
            onSelect={() => {
              setMemberStructre("nong->highSchool,pee->2upYear");
            }}
          >
            น้องค่ายเป็นเด็กมใปลาย พี่บ้านเป็นปีโต
          </MenuItem>
          <MenuItem
            onSelect={() => {
              setMemberStructre("nong->highSchool,pee->allYear");
            }}
          >
            น้องค่ายเป็นเด็กมใปลาย พี่บ้านเป็นปี 1-4
          </MenuItem>
        </Select>
      </div>
      <div className=" rounded-lg ">
        <Select
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px]"
        >
          <MenuItem
            onSelect={() => {
              setRegisterModel("all");
            }}
          >
            มีสัมภาสและค่าใช้จ่าย
          </MenuItem>
          <MenuItem
            onSelect={() => {
              setRegisterModel("noInterview");
            }}
          >
            ไม่มีสัมภาสแต่มีค่าใช้จ่าย
          </MenuItem>
          <MenuItem
            onSelect={() => {
              setRegisterModel("noPaid");
            }}
          >
            ไม่มีสัมภาสและไม่มีค่าใช้จ่าย
          </MenuItem>
        </Select>
      </div>
      <div className="flex flex-row items-center">
        <label className="w-2/5 text-2xl text-slate-200">
          บอร์ดค่าย userId ให้ใส่ , ห้ามเว้นวรรค
        </label>
        <TextField
          name="Name"
          id="Name"
          className="w-3/5 bg-slate-100 rounded-2xl shadow-inner"
          onChange={(e) => setBoardIds(e.target.value.split(","))}
        />
      </div>
      <div className=" rounded-lg ">
        <button
          className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
          onClick={() => {
            if (
              chose &&
              boardIds.length &&
              memberStructre &&
              registerModel &&
              round &&
              dateStart &&
              dateEnd
            ) {
              const redy: CreateCamp = {
                nameId: chose,
                boardIds,
                registerModel,
                round,
                dateEnd,
                dateStart,
                memberStructre,
              };
              console.log("ffffffffffffffffffffffffffff");
              try {
                console.log("ffffffffffffffffffffffffffff");
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
    </form>
  );
}
