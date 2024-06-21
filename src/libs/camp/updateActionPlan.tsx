import { backendUrl } from "@/components/setup";
import mongoose from "mongoose";

export default async function updateActionPlan(
  input: {
    action: string;
    placeIds: mongoose.Types.ObjectId[];
    start: Date;
    end: Date;
    headId: mongoose.Types.ObjectId;
    body: string;
  },
  id: mongoose.Types.ObjectId,
  token: string
) {
  const response = await fetch(
    `${backendUrl}/camp/updateActionPlan/params/${id}`,
    {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(
        input
      ),
    }
  );
  return await response.json();
}
