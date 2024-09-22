import { backendUrl } from "@/components/setup";
import { InterUser } from "../../../intreface";
import mongoose from "mongoose";
import { ShowMember } from "../../../interface";

export default async function getUserFromCamp(
  mode:
    | "getNongsFromBaanId"
    | "getPeesFromBaanId"
    | "getPeesFromPartId"
    | "getPetosFromPartId",
  id: mongoose.Types.ObjectId
): Promise<ShowMember[]> {
  console.log(`${backendUrl}/camp/${mode}/params/${id}`)
  const res = await fetch(`${backendUrl}/camp/${mode}/params/${id}`, {
    cache: "no-store",
  });
  return await res.json();
}
