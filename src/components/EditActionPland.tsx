"use client";

import { TextField } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import {
  InterBuilding,
  InterPlace,
  MyMap,
  ShowMember,
  showActionPlan,
} from "../../interface";
import FinishButton from "./FinishButton";
import PlaceSelect from "./PlaceSelect";
import SelectTemplate from "./SelectTemplate";
import { notEmpty } from "./setup";
import { useRouter } from "next/navigation";
import mongoose from "mongoose";
import { useSession } from "next-auth/react";
import updateActionPlan from "@/libs/camp/updateActionPlan";
import BackToHome from "./BackToHome";
import dayjs, { Dayjs } from "dayjs";
import deleteActionPlan from "@/libs/camp/deleteActionPlan";

export default function EditActionPland({
  pees,
  petos,
  allBuildings,
  allPlace,
  actionPland,
  pls

}: {
  pees: ShowMember[];
  petos: ShowMember[];
  allPlace: Map<string, InterPlace[]>;
  allBuildings: Map<mongoose.Types.ObjectId, InterBuilding>;
  actionPland: showActionPlan;
  pls:InterPlace[]
}) {
    const {data:session}=useSession()
    if(!session){
        return<BackToHome/>
    }
  const [action, setAction] = useState<string | null>(actionPland.action);
  const [places, setPlaces] = useState<(InterPlace | null)[]>(pls);
  const [start, setStart] = useState<Dayjs | null>(dayjs(actionPland.start));
  const [end, setEnd] = useState<Dayjs | null>(dayjs(actionPland.end));
  const [body, setBody] = useState<string | null>(actionPland.body);
  const router = useRouter();
  function add() {
    places.push(null);
    //setPlaces(places);
    router.refresh();
  }
  function remove() {
    places.pop();
    //setPlaces(places);
    router.refresh();
  }
  const maps: MyMap[] = [];
  var i = 0;
  while (i < pees.length) {
    const { _id, nickname, name, lastname } = pees[i++];
    maps.push({ key: _id, value: `${nickname} ${name} ${lastname}` });
  }
  i = 0;
  while (i < petos.length) {
    const { _id, nickname, name, lastname } = petos[i++];
    maps.push({ key: _id, value: `${nickname} ${name} ${lastname}` });
  }

  return (
    <>
      <div className=" rounded-lg ">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            className="bg-white m-10"
            value={start}
            onChange={(newValue) => {
              setStart(newValue);
              console.log(newValue);
            }}
          />
        </LocalizationProvider>
      </div>
      <div className=" rounded-lg ">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            className="bg-white m-10"
            value={end}
            onChange={(newValue) => {
              setEnd(newValue);
              console.log(newValue);
            }}
          />
        </LocalizationProvider>
      </div>
      <FinishButton text={"add"} onClick={add} />
      <FinishButton text={"remove"} onClick={remove} />
      {places.map((v, i) => (
        <PlaceSelect
          place={v}
          allPlace={allPlace}
          allBuildings={allBuildings}
          onClick={(ouuPut) => {
            places[i] = ouuPut;
            setPlaces(places);
          }}
        />
      ))}
      <div className="flex flex-row items-center my-5">
        <label className="w-2/5 text-2xl text-slate-200">
          ทำอะไร กริยาขึ้นก่อน
        </label>
        <TextField
          name="Tel"
          id="Tel"
          className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
          onChange={(e) => setAction(e.target.value)}
          defaultValue={action}
        />
      </div>
      <div className="flex flex-row items-center my-5">
        <label className="w-2/5 text-2xl text-slate-200">รายละเอียด</label>
        <TextField
          name="Email"
          id="Email"
          className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
          onChange={(e) => setBody(e.target.value)}
          defaultValue={body}
        />
      </div>
      <SelectTemplate
        mapIn={maps}
        select={(headId) => {
          if (headId && body && action && start && end) {
            updateActionPlan(
              {
                  action,
                  placeIds: places.filter(notEmpty).map((e) => e._id),
                  start:start.toDate(),
                  end:end.toDate(),
                  headId,
                  body
              },
              actionPland._id,
              session.user.token
            );
          }
        }}
        buttonText={"สร้าง action plan"}
      />
      <FinishButton onClick={() => deleteActionPlan(new mongoose.Types.ObjectId(actionPland._id), session.user.token)} text={"delete"} />
    </>
  );
}
