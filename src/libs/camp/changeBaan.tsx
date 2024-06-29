import { backendUrl } from "@/components/setup";
import mongoose from "mongoose";

export default async function changeBaan(
  input: {
    userIds: mongoose.Types.ObjectId[];
    baanId: mongoose.Types.ObjectId;
  },
  token: string
) {
  const res = await fetch(`${backendUrl}/camp/changeBaan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: JSON.stringify(input),
  });
}
