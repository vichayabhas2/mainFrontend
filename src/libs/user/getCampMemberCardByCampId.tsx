import { getBackendUrl, userPath } from "@/components/setup";
import { Id, InterCampMemberCard } from "../../../interface";
import mongoose from "mongoose";
export default async function getCampMemberCardByCampId(
  id: Id,
  token: string
): Promise<InterCampMemberCard> {
  const response = await fetch(
    `${getBackendUrl()}/${userPath}/getCampMemberCardByCampId/params/${id}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }
  return await response.json();
}
