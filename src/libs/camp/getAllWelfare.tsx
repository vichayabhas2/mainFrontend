import { getBackendUrl } from "@/components/setup";
import mongoose from "mongoose";
import { CampWelfarePack } from "../../../interface";

export default async function getAllWelfare(
  campId: mongoose.Types.ObjectId
): Promise<CampWelfarePack> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getAllWelfare/params/${campId}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
