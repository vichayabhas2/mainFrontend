import { getBackendUrl } from "@/components/setup";
import mongoose from "mongoose";

export default async function staffRegisterCamp(
  partId: mongoose.Types.ObjectId,
  token: string
) {
  console.log(partId);
  const res = await fetch(
    `${getBackendUrl()}/camp/staffRegisterCamp/params/${partId}`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }
  );
  return await res.json();
}
