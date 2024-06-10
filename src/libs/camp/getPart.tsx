import { backendUrl } from "@/components/setup";
import { InterCampFront, InterPartFront } from "../../../intreface";
import mongoose from "mongoose";

export default async function getPart(
  id: mongoose.Types.ObjectId,
  token: string
): Promise<InterPartFront> {
  const response = await fetch(`${backendUrl}/camp/part/params/${id}`, {
    method: "GET",cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
