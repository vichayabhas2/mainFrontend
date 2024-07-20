import mongoose from "mongoose";
import { MyMap } from "../../../interface";
import { backendUrl } from "@/components/setup";

export default async function getAllRemainPartName(
  id: mongoose.Types.ObjectId,
  token: string
): Promise<MyMap[]> {
  const response = await fetch(
    `${backendUrl}/admin/getAllRemainPartName/params/${id}`,
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
