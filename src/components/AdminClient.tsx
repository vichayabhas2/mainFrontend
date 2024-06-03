"use client";

import { Session } from "next-auth";
import { Select, MenuItem, TextField, Input } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import createCamp from "@/libs/admin/createCamp";
import addCampName from "@/libs/admin/addCampName";
import mongoose from "mongoose";
import { InterNameContainer, CreateCamp } from "../../interface";
//import { InterNameContainer, CreateCamp } from "../../interface";

export default function AdminClient({
  campNameContainers,
  session,
}: {
  campNameContainers: InterNameContainer[];
  session: Session;
}) {
  const models: (
    | "นอนทุกคน"
    | "เลือกได้ว่าจะค้างคืนหรือไม่"
    | "ไม่มีการค้างคืน"
  )[] = ["นอนทุกคน", "เลือกได้ว่าจะค้างคืนหรือไม่", "ไม่มีการค้างคืน"];
  const [chose, setChose] = useState<mongoose.Types.ObjectId | null>(null);
  const [round, setRound] = useState<number | null>(null);
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  const [memberStructre, setMemberStructre] = useState<
    | "nong->highSchool,pee->1year,peto->2upYear"
    | "nong->highSchool,pee->2upYear"
    | "nong->1year,pee->2upYear"
    | "nong->highSchool,pee->allYear"
    | "allYearMix"
    | null
  >(null);
  const [registerModel, setRegisterModel] = useState<
    "noPaid" | "noInterview" | "all" | null
  >(null);
  const [boardIds, setBoardIds] = useState<string | null>(null);
  const [newName, setNewName] = useState<string | null>(null);
  const [nongSleepModel, setNongSleepModel] = useState<
    "นอนทุกคน" | "เลือกได้ว่าจะค้างคืนหรือไม่" | "ไม่มีการค้างคืน" | null
  >(null);
  const [peeSleepModel, setPeeSleepModel] = useState<
    "นอนทุกคน" | "เลือกได้ว่าจะค้างคืนหรือไม่" | "ไม่มีการค้างคืน" | null
  >(null);
  return (
    <form className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
      <div className=" rounded-lg ">
        <Select
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px]"
        >
          {campNameContainers.map((choice: InterNameContainer) => {
            return (
              <MenuItem
                value={choice.name}
                onClick={() => {
                  setChose(choice._id);
                  alert(choice._id);
                }}
              >
                {choice.name}
              </MenuItem>
            );
          })}
        </Select>
      </div>

      <div className=" rounded-lg ">
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">ครั้งที่</label>
          <Input
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
            value={"น้องค่ายเป็นเด็กมใปลาย พี่บ้านเป็นปี 1"}
            onClick={() => {
              setMemberStructre("nong->highSchool,pee->1year,peto->2upYear");
            }}
          >
            น้องค่ายเป็นเด็กมใปลาย พี่บ้านเป็นปี 1
          </MenuItem>
          <MenuItem
            onClick={() => {
              setMemberStructre("nong->1year,pee->2upYear");
            }}
            value="น้องค่ายเป็นปี 1"
          >
            น้องค่ายเป็นปี 1
          </MenuItem>
          <MenuItem
            onClick={() => {
              setMemberStructre("nong->highSchool,pee->2upYear");
            }}
            value="น้องค่ายเป็นเด็กมใปลาย พี่บ้านเป็นปีโต"
          >
            น้องค่ายเป็นเด็กมใปลาย พี่บ้านเป็นปีโต
          </MenuItem>
          <MenuItem
            onClick={() => {
              setMemberStructre("nong->highSchool,pee->allYear");
            }}
            value="น้องค่ายเป็นเด็กมใปลาย พี่บ้านเป็นปี 1-4"
          >
            น้องค่ายเป็นเด็กมใปลาย พี่บ้านเป็นปี 1-4
          </MenuItem>
          <MenuItem
            onClick={() => {
              setMemberStructre("allYearMix");
            }}
            value="นิสิตเป็นได้ทั้งพี่บ้านและน้องค่าย"
          >
            นิสิตเป็นได้ทั้งพี่บ้านและน้องค่าย
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
            onClick={() => {
              setRegisterModel("all");
            }}
            value="มีสัมภาสและค่าใช้จ่าย"
          >
            มีสัมภาสและค่าใช้จ่าย
          </MenuItem>
          <MenuItem
            onClick={() => {
              setRegisterModel("noInterview");
            }}
            value="ไม่มีสัมภาสแต่มีค่าใช้จ่าย"
          >
            ไม่มีสัมภาสแต่มีค่าใช้จ่าย
          </MenuItem>
          <MenuItem
            onClick={() => {
              setRegisterModel("noPaid");
            }}
            value="ไม่มีสัมภาสและไม่มีค่าใช้จ่าย"
          >
            ไม่มีสัมภาสและไม่มีค่าใช้จ่าย
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
          {models.map(
            (
              value:
                | "นอนทุกคน"
                | "เลือกได้ว่าจะค้างคืนหรือไม่"
                | "ไม่มีการค้างคืน"
            ) => {
              return (
                <MenuItem
                  onClick={() => {
                    setPeeSleepModel(value);
                  }}
                  value={value}
                >
                  {value}
                </MenuItem>
              );
            }
          )}
        </Select>
        <Select
          variant="standard"
          name="location"
          id="location"
          className="h-[2em] w-[200px]"
        >
          {models.map(
            (
              value:
                | "นอนทุกคน"
                | "เลือกได้ว่าจะค้างคืนหรือไม่"
                | "ไม่มีการค้างคืน"
            ) => {
              return (
                <MenuItem
                  onClick={() => {
                    setNongSleepModel(value);
                  }}
                  value={value}
                >
                  {value}
                </MenuItem>
              );
            }
          )}
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
          onChange={(e) => setBoardIds(e.target.value)}
        />
      </div>
      <div className=" rounded-lg ">
        <button
          className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
          onClick={() => {
            if (
              chose &&
              boardIds &&
              memberStructre &&
              registerModel &&
              round &&
              dateStart &&
              dateEnd &&
              nongSleepModel &&
              peeSleepModel
            ) {
              try {
                const redy: CreateCamp = {
                  nameId: chose,
                  boardIds: boardIds
                    .split(",")
                    .map((input: string) => new mongoose.Types.ObjectId(input)),
                  registerModel,
                  round,
                  dateEnd,
                  dateStart,
                  memberStructre,
                  peeSleepModel,
                  nongSleepModel,
                };
                createCamp(redy, session.user.token);
              } catch (error) {
                console.log(error);
              }
            } else {
              alert("Please type in all the details!");
              alert(chose);
              alert(boardIds);
              alert(registerModel);
              alert(round);
              alert(dateEnd);
              alert(dateStart);
              alert(memberStructre);
              console.log({
                nameId: chose,
                boardIds,
                registerModel,
                round,
                dateEnd,
                dateStart,
                memberStructre,
              });
            }
          }}
        >
          Create Camp
        </button>
      </div>
      {campNameContainers.map((nameContainer: InterNameContainer) => (
        <label className="w-2/5 text-2xl text-slate-200">
          {nameContainer.name}
        </label>
      ))}
      <div className="flex flex-row items-center">
        <label className="w-2/5 text-2xl text-slate-200">เพิ่มชื่อค่าย</label>
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
              addCampName(newName, session.user.token);
            } catch (error) {
              console.log(error);
            }
          } else {
            alert("Please type in all the detavdtrjbyfugjunils!");
          }
        }}
      >
        สร้างชื่อค่าย
      </button>
    </form>
  );
}
