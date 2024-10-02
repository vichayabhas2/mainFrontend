"use client";

import { useRouter } from "next/navigation";
import {
  AllPlaceData,
  InterBuilding,
  InterCampFront,
  InterPartFront,
  InterPlace,
  InterTimeOffset,
  InterUser,
  MyMap,
  ShowMember,
} from "../../interface";
import { useState } from "react";
import mongoose from "mongoose";
import PlaceSelect from "./PlaceSelect";
import FinishButton from "./FinishButton";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SelectTemplate from "./SelectTemplate";
import { TextField } from "@mui/material";
import createActionPlan from "@/libs/camp/createActionPlan";
import { useSession } from "next-auth/react";
import { addTime, notEmpty } from "./setup";
import createWorkingItem from "@/libs/camp/createWorkingItem";
import plusActionPlan from "@/libs/camp/plusActionPlan";
export default function PartClient({
  user,
  part,
  pees,
  petos,
  timeOffset,
  camp,
  allPlaceData,
}: {
  part: InterPartFront;
  user: InterUser;
  pees: ShowMember[];
  petos: ShowMember[];
  timeOffset: InterTimeOffset;
  camp: InterCampFront;
  allPlaceData: AllPlaceData;
}) {
  const { data: session } = useSession();
  if (user.mode == "nong" || !session) {
    return null;
  }
  const [password, setPassword] = useState<string>("null");
  const [name, setName] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const [places, setPlaces] = useState<(InterPlace | null)[]>([]);
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [body, setBody] = useState<string | null>(null);
  const [plus, setPlus] = useState<number>(0);
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
    <main className="text-center p-5">
      <div>
        <div>รายชื่อพี่บ้านฝ่าย{part.partName}</div>
        <table>
          <tr>
            <th>ชือเล่น</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            <th>เพศ</th>

            <th>ค้างคืนหรือไม่</th>
            <th>id</th>
            <th>รหัสประจำตัวนิสิต</th>
            <th>เบอร์โทรศัพท์</th>
            <th>email</th>
            <th>มีกระติกน้ำหรือไม่</th>
            <th>ขนาดเสื้อ</th>
            <th>กรุปของนิสิต</th>
            <th>ปัญหาสุขภาพ</th>
          </tr>
          {pees.map((user: ShowMember) => (
            <tr>
              <td>{user.nickname}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.gender}</td>
              <td>{user.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>} </td>
              <td>{user._id.toString()}</td>
              <td>{user.studentId}</td>
              <td>{user.tel}</td>
              <td>{user.email}</td>
              <td>{user.haveBottle.toString()}</td>
              <td>{user.shirtSize}</td>
              <td>{user.group}</td>
              {user.heathIssueId ? (
                <td
                  onClick={() => {
                    router.push(`/heathIssue/${user.heathIssueId?.toString()}`);
                  }}
                >
                  {user.heathIssueId.toString()}
                </td>
              ) : (
                <td> null</td>
              )}
            </tr>
          ))}
        </table>
      </div>
      <div>
        <div>รายชื่อปีโตฝ่าย{part.partName}</div>
        <table>
          <tr>
            <th>ชือเล่น</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            <th>เพศ</th>
            <th>ค้างคืนหรือไม่</th>
            <th>id</th>
            <th>รหัสประจำตัวนิสิต</th>
            <th>เบอร์โทรศัพท์</th>
            <th>email</th>
            <th>มีกระติกน้ำหรือไม่</th>
            <th>ขนาดเสื้อ</th>
            <th>กรุปของนิสิต</th>
            <th>ปัญหาสุขภาพ</th>
          </tr>
          {petos.map((user: ShowMember) => (
            <tr>
              <td>{user.nickname}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.gender}</td>
              <td>{user.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>} </td>
              <td>{user._id.toString()}</td>
              <td>{user.studentId}</td>
              <td>{user.tel}</td>
              <td>{user.email}</td>
              <td>{user.haveBottle.toString()}</td>
              <td>{user.shirtSize}</td>
              <td>{user.group}</td>
              {user.heathIssueId ? (
                <td
                  onClick={() => {
                    router.push(`/heathIssue/${user.heathIssueId?.toString()}`);
                  }}
                >
                  {user.heathIssueId.toString()}
                </td>
              ) : (
                <td> null</td>
              )}
            </tr>
          ))}
        </table>
      </div>
      <div className="w-[80%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
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
            onClick={(ouuPut) => {
              places[i] = ouuPut;
              setPlaces(places);
            }}
            buildingText={`ตึกที่${i + 1}`}
            placeText={`ชั้นและห้องที่${i + 1}`}
            allPlaceData={allPlaceData}
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
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">รายละเอียด</label>
          <TextField
            name="Email"
            id="Email"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <SelectTemplate
          mapIn={maps}
          select={(headId) => {
            if (headId && body && action && start && end) {
              createActionPlan(
                {
                  action,
                  partId: part._id,
                  placeIds: places.filter(notEmpty).map((e) => e._id),
                  start: addTime(start, timeOffset),
                  end: addTime(end, timeOffset),
                  headId,
                  body,
                },
                session.user.token
              );
            }
          }}
          buttonText={"สร้าง action plan"}
        />
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            +- action plan ล่าสุด {camp.actionPlanOffset} นาที
          </label>
          <TextField
            name="Email"
            id="Email"
            type="number"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setPlus(parseInt(e.target.value))}
          />
          <FinishButton
            text="+- action plan"
            onClick={() => {
              plusActionPlan({ campId: camp._id, plus }, session.user.token);
            }}
          />
        </div>
      </div>
      <div className="w-[80%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">ทำอะไร</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">link</label>
          <TextField
            name="Email"
            id="Email"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">รหัสผ่าน</label>
          <TextField
            name="Email"
            id="Email"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setPassword(e.target.value)}
            defaultValue={password}
          />
        </div>
        <FinishButton
          text={"สร้างการทำงาน"}
          onClick={() => {
            if (name) {
              createWorkingItem(
                {
                  name,
                  link,
                  partId: part._id,
                  fromId: null,
                  password: password ? password : "null",
                },
                session.user.token
              );
            }
          }}
        />
      </div>
    </main>
  );
}
/**export interface InterActionPlan {

    action: string,
    partId: mongoose.Types.ObjectId,*
    placeIds: mongoose.Types.ObjectId[],
    start: Date,
    end: Date,
    headId: mongoose.Types.ObjectId,
    body: string,


    start: Date,
    end: Date,
    headId: mongoose.Types.ObjectId,
    body: string,
} */
