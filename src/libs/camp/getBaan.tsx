import { getBackendUrl } from "@/components/setup";
import { Id, InterBaanFront, InterCampFront } from "../../../interface";
import mongoose from "mongoose";

export default async function getBaan(
  id: Id
): Promise<InterBaanFront> {
  const response = await fetch(`${getBackendUrl()}/camp/Baan/params/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
