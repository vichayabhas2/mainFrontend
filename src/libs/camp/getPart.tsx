import { getBackendUrl } from "@/components/setup";
import { Id, InterPartFront } from "../../../interface";
import mongoose from "mongoose";

export default async function getPart(
  id: Id,
): Promise<InterPartFront> {
  const response = await fetch(`${getBackendUrl()}/camp/part/params/${id}`, {
    method: "GET",cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
