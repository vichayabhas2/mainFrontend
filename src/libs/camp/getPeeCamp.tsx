import { backendUrl } from "@/components/setup";
import { InterPeeCamp } from "../../../intreface";
import mongoose from "mongoose";

export default async function getPeeCamp(
  id: mongoose.Types.ObjectId,
  token: string
): Promise<InterPeeCamp> {
  const response = await fetch(`${backendUrl}/camp/peeCamp/params/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
