import { backendUrl } from "@/components/setup";
import mongoose from "mongoose";

export default async function admission(
  input: {
    members: mongoose.Types.ObjectId[];
    campId: mongoose.Types.ObjectId;
  },
  mode: "interview" | "pass" | "sure" | "kick/pee"|'kick/nong',
  token: string
) {
  const res = await fetch(`${backendUrl}/camp/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
    body: JSON.stringify(input),
  });
}
