"use client";
import { Session } from "next-auth";
import { InterCampFront, InterUser } from "../../intreface";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FinishButton from "./FinishButton";
import peeUpdateMode from "@/libs/user/peeUpdateMode";
import { Checkbox, Input } from "@mui/material";
import mongoose from "mongoose";
import { ClockIcon } from "@mui/x-date-pickers";
import link from "next/link";
import InteractiveCard from "./InteractiveCard";
import { swop } from "./setup";

export default function UpdateModeRaw({
  session,
  user,
  camps,
}: {
  session: Session | null;
  user: InterUser | null;
  camps: InterCampFront[];
}) {
  const router = useRouter();

  if (!session || !user || user.role == "nong") {
    router.push("/");
    return <></>;
  }
  const [mode, setMode] = useState<"pee" | "nong" | null>(null);
  const [fillterIds, setFillterIds] = useState<mongoose.Types.ObjectId[]>(
    user.filterIds
  );

  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div className="text-4xl font-medium">Verifile</div>
      <form className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">mode</label>
          <Input
            type="radio"
            id="bottle"
            value={"male"}
            onClick={() => setMode("pee")}
            className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-600"
          />
          <label className="w-2/5 text-2xl text-slate-200">พี่</label>
          <Input
            type="radio"
            id="bottle"
            value={"female"}
            onClick={() => setMode("nong")}
            className="h-4 w-4 rounded border-gray-300 focus:ring-indigo-600"
          />
          <label className="w-2/5 text-2xl text-slate-200">น้อง</label>
        </div>
        <div className="flex flex-row justify-end">
          <FinishButton
            text="update mode"
            onClick={() => {
              if (mode) {
                peeUpdateMode(session.user.token, mode, []);
              }
            }}
          />
        </div>
        {camps.map((camp: InterCampFront) => {
          return (
            <div className="text-2xl my-10">
              <Checkbox
                onChange={(v) => {
                  if (v) {
                    setFillterIds(swop(camp._id, null, fillterIds));
                  } else {
                    setFillterIds(swop(null, camp._id, fillterIds));
                  }
                }}
                defaultChecked={fillterIds.includes(camp._id)}
              />
              {camp.campName}
            </div>
          );
        })}
      </form>
    </div>
  );
}
