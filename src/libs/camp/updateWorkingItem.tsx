import { getBackendUrl } from "@/components/setup";
import mongoose from "mongoose";

export default async function updateWorkingItem(
  input: {
    name: string;
    link: string | null;
    status: "not start" | "in process" | "done";
  },
  id: mongoose.Types.ObjectId,
  token: string
) {
  const response = await fetch(
    `${getBackendUrl()}/camp/updateWorkingItem/params/${id}`,
    {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    }
  );
  return await response.json();
}
