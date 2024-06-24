import { backendUrl, userPath } from "@/components/setup";
import { InterUser } from "../../../intreface";
import mongoose from "mongoose";
export default async function peeUpdateMode(
  token: string,
  mode: "pee" | "nong",
  fillter: mongoose.Types.ObjectId[],
  linkHash:string
) {
  const response = await fetch(`${backendUrl}/${userPath}/updateMode`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",

      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(
      { mode, fillter,linkHash }

      //{email,gender,haveBottle,lastname,name,nickname,password,shertSize,tel}
    ),
    cache:'no-store'
  });
  return await response.json();
}
