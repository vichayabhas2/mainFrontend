import { getBackendUrl } from "@/components/setup";
import { InterPeeCamp } from "../../../interface";
import mongoose from "mongoose";

export default async function getPeeCamp(
  id: mongoose.Types.ObjectId,
  token: string
): Promise<InterPeeCamp> {
  const response = await fetch(`${getBackendUrl()}/camp/peeCamp/params/${id}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
