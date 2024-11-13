import { getBackendUrl } from "@/components/setup";
import mongoose from "mongoose";
import { Id, InterActionPlan, showActionPlan } from "../../../interface";

export default async function getActionPlan(
  id: Id,
  token: string
): Promise<showActionPlan> {
  const response = await fetch(
    `${getBackendUrl()}/camp/getActionPlan/params/${id}`,
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
