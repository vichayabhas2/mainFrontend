import { getBackendUrl, userPath } from "@/components/setup";
import mongoose from "mongoose";
import { Id, InterCampMemberCard } from "../../../interface";

export default async function getCampMemberCard(
  id: Id
): Promise<InterCampMemberCard> {
  const response = await fetch(
    `${getBackendUrl()}/${userPath}/getCampMemberCard/params/${id}`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
