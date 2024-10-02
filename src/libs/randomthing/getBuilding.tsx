import mongoose from "mongoose";
import { InterBuilding } from "../../../interface";
import { getBackendUrl } from "@/components/setup";

export default async function getBuilding(
  id: mongoose.Types.ObjectId
): Promise<InterBuilding> {
  const res = await fetch(
    `${getBackendUrl()}/randomthing/getPlace/params/${id}`,
    {
      cache: "no-store",
    }
  );
  return await res.json();
}
