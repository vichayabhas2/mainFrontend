import { getBackendUrl } from "@/components/setup";
import { InterCampFront } from "../../../interface";
import mongoose from "mongoose";

export default async function getCamp(
  id: mongoose.Types.ObjectId
): Promise<InterCampFront> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getCamp/params/${id.toString()}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
