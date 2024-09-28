"use client";

import React, { useState } from "react";
import { TextField } from "@mui/material";
import FinishButton from "./FinishButton";
import userLogin from "@/libs/user/userLogIn";
import bcrypt from "bcrypt";
import checkPassword from "@/libs/user/checkPassword";
export default function PasswordLock({
  children,
  token,
  bypass,
}: {
  children: React.ReactNode;
  token: string;
  bypass: boolean;
}) {
  const [typePassword, setPassword] = useState<string>("");
  const [mode, setMode] = useState<boolean>(bypass);
  return (
    <>
      {mode ? (
        children
      ) : (
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">Password</label>
          <TextField
            name="Password"
            id="Password"
            type="password"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FinishButton
            text="submit password"
            onClick={() => {
              checkPassword(typePassword, token, setMode);
            }}
          />
        </div>
      )}
    </>
  );
}
