import { getBackendUrl } from "@/components/setup";
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
  const res = await fetch(`${getBackendUrl()}/camp/${mode}/params/${id}`, {
    cache: "no-store",
  });
  return await res.json();
}
