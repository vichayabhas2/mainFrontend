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
        <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
          <div
            className="flex flex-row items-center my-5 rounded-3xl"
            style={{
              backgroundColor: "#961A1D",
              width: "60%",
              padding: "20px",
            }}
          >
            <label className="w-2/5 text-2xl text-white mx-5">Password</label>
            <TextField
              name="Password"
              id="Password"
              type="password"
              className="w-3/5 bg-white  rounded-2xl border-gray-200"
              sx={{
                backgroundColor: "#f5f5f5",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: " 1rem",
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "#5479FF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#5479FF",
                  },
                },
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FinishButton
              text="submit"
              onClick={() => {
                checkPassword(typePassword, token, setMode);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
