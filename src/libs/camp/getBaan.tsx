import { backendUrl } from "@/components/setup";
import { InterBaanFront, InterCampFront } from "../../../intreface";
import mongoose from "mongoose";

export default async function getBaan(id:mongoose.Types.ObjectId): Promise<InterBaanFront> {
  const response = await fetch(`${backendUrl}/camp/Baan/params/${id}`);
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
