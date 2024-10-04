import { getBackendUrl } from "@/components/setup";
import { InterPetoCamp } from "../../../interface";
import mongoose from "mongoose";

export default async function getPetoCamp(
  id: mongoose.Types.ObjectId,
  token: string
): Promise<InterPetoCamp> {
  const response = await fetch(`${getBackendUrl()}/camp/petoCamp/params/${id}`, {
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
