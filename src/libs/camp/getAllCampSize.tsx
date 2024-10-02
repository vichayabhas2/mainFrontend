import { getBackendUrl } from "@/components/setup";
import mongoose from "mongoose";
import { CampSizeContainer } from "../../../interface";

export default async function getAllCampSize(
  campId: mongoose.Types.ObjectId
): Promise<CampSizeContainer> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getAllCampSize/params/${campId}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
