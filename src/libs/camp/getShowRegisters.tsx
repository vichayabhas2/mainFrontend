import { backendUrl } from "@/components/setup";
import mongoose from "mongoose";
import { ShowRegister } from "../../../interface";

export default async function getShowRegisters(
  id: mongoose.Types.ObjectId,
  token: string
): Promise<ShowRegister[]> {
  const response = await fetch(
    `${backendUrl}/camp/getShowRegisters/params/${id}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
