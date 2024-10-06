import mongoose from "mongoose";
import { CampWelfarePack } from "../../../interface";
import { getBackendUrl } from "@/components/setup";

export default async function getAllHealthIssue(
  campId: mongoose.Types.ObjectId
): Promise<CampWelfarePack> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getAllHealthIssue/params/${campId}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }
  return await response.json();
}
