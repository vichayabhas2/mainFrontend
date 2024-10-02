import { getBackendUrl } from "@/components/setup";
import { InterBaanFront, InterCampFront } from "../../../interface";
import mongoose from "mongoose";

export default async function getBaan(
  id: mongoose.Types.ObjectId
): Promise<InterBaanFront> {
  const response = await fetch(`${getBackendUrl()}/camp/Baan/params/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
