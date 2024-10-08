import { getBackendUrl } from "@/components/setup";
import mongoose from "mongoose";
import { ShowPlace } from "../../../interface";

export default async function getShowPlace(
  id: mongoose.Types.ObjectId
): Promise<ShowPlace> {
  const res = await fetch(
    `${getBackendUrl()}/randomthing/getShowPlace/params/${id}`,
    {
      cache: "no-store",
    }
  );
  return await res.json();
}
