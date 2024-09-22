"use client";

import { useState } from "react";
import { HelthIsueBody } from "../../interface";
import { Checkbox, TextField } from "@mui/material";
import FinishButton from "./FinishButton";
import updateHelth from "@/libs/user/updateHelth";

export default function HelthIshueClient({
  helthIshue,
  token,
}: {
  helthIshue: HelthIsueBody;
  token: string;
}) {
  const [food, set1] = useState<string>(helthIshue.food);
  const [medicine, set2] = useState<string>(helthIshue.medicine);
  const [chronicDisease, set3] = useState<string>(helthIshue.chronicDisease);
  const [spicy, set4] = useState<boolean>(helthIshue.spicy);
  const [extra, set5] = useState<string>(helthIshue.extra);
  const [isWearing, set6] = useState<boolean>(helthIshue.isWearing);
  const [mode, setMode] = useState<boolean>(false);
  const [foodConcern, set7] = useState<string>(helthIshue.foodConcern);
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div className="text-4xl font-medium">ปัญหาสุขภาพ</div>

      <form className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        <div className="flex flex-row items-center">
          <label className="w-2/5 text-2xl text-slate-200">
            แพ้อาหารอะไรบ้าง
          </label>
          <TextField
            name="Name"
            id="Name"
            className="w-3/5 bg-slate-100 rounded-2xl shadow-inner"
            onChange={(e) => set1(e.target.value)}
            defaultValue={food}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">แพ้ยาอะไรบ้าง</label>
          <TextField
            name="LastName"
            id="LastName"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => set2(e.target.value)}
            defaultValue={medicine}
          />
        </div>
        <div className="flex flex-row items-center">
          <label className="w-2/5 text-2xl text-slate-200">
            มีโรคประจำตัวอะไรบ้าง
          </label>
          <TextField
            name="Nickname"
            id="Nickname"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => set3(e.target.value)}
            defaultValue={chronicDisease}
          />
        </div>
        <div>
          <label className="w-2/5 text-2xl text-slate-200">
            กินเผ็ดไม่ได้ใช่หรือไม่
          </label>
          <Checkbox
            onChange={(e, c) => {
              set4(c);
            }}
            defaultChecked={spicy}
          />
        </div>

        {mode ? (
          <>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-slate-200">
                มีอะไรเพิ่มเติม
              </label>
              <TextField
                name="Email"
                id="Email"
                className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
                onChange={(e) => set5(e.target.value)}
                defaultValue={extra}
              />
            </div>
            <div>
              <label className="w-2/5 text-2xl text-slate-200">
                ใส่แพมเพิสหรือไม่
              </label>
              <Checkbox
                onChange={(e, c) => {
                  set6(c);
                }}
                defaultChecked={isWearing}
              />
            </div>
          </>
        ) : null}
        <div>
          <label className="w-2/5 text-2xl text-slate-200">advance</label>
          <Checkbox
            onChange={(e, c) => {
              setMode(c);
            }}
          />
        </div>
        <FinishButton
          text="update"
          onClick={() => {
            updateHelth(
              {
                food,
                chronicDisease,
                medicine,
                spicy,
                extra,
                isWearing,
                foodConcern,
              },
              token
            );
          }}
        />
      </form>
    </div>
  );
}
