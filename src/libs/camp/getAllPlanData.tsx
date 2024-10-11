import { getBackendUrl } from "@/components/setup";
import mongoose from "mongoose";
import { GetAllPlanData } from "../../../interface";

export default async function getAllPlanData(
  id: mongoose.Types.ObjectId,
):Promise<GetAllPlanData> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getAllPlanData/params/${id.toString()}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
