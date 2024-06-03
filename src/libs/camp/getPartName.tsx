import { backendUrl } from "@/components/setup";
import { InterPartNameContainer } from "../../../intreface";
import mongoose from "mongoose";

export default async function getPartName(
  id: mongoose.Types.ObjectId,
  token: string
): Promise<InterPartNameContainer> {
  const response = await fetch(`${backendUrl}/camp/partName/params/${id}`, {
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
