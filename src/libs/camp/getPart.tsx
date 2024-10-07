import { getBackendUrl } from "@/components/setup";
import { InterPartFront } from "../../../interface";
import mongoose from "mongoose";

export default async function getPart(
  id: mongoose.Types.ObjectId,
): Promise<InterPartFront> {
  const response = await fetch(`${getBackendUrl()}/camp/part/params/${id}`, {
    method: "GET",cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
