import { getBackendUrl } from "@/components/setup";
import { InterBuilding, InterPlace } from "../../../interface";
import mongoose from "mongoose";

export default async function getPlaces(
  id: mongoose.Types.ObjectId
): Promise<InterPlace[]> {
  const res = await fetch(
    `${getBackendUrl()}/randomthing/getPlaces/params/${id}`,
    {
      cache: "no-store",
    }
  );
  //console.log(`${backendUrl}/randomthing/getPlaces/params/${id}`)
  return await res.json();
}
