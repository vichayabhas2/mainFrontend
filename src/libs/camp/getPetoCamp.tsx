import { backendUrl } from "@/components/setup";
import { InterPetoCamp } from "../../../intreface";
import mongoose from "mongoose";

export default async function getpetoCamp(
  id: mongoose.Types.ObjectId,
  token: string
): Promise<InterPetoCamp> {
  const response = await fetch(`${backendUrl}/camp/petoCamp/params/${id}`, {
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
