import { getBackendUrl } from "@/components/setup";
import mongoose from "mongoose";

export default async function changePart(
  input: {
    userIds: mongoose.Types.ObjectId[];
    partId: mongoose.Types.ObjectId;
  },
  token: string
) {
  const res = await fetch(`${getBackendUrl()}/camp/changePart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: JSON.stringify(input),
  });
}
