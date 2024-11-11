import { getBackendUrl, userPath } from "@/components/setup";
import mongoose from "mongoose";
import { Id, InterTimeOffset } from "../../../interface";

export default async function getTimeOffset(
  id: Id
): Promise<InterTimeOffset> {
  const response = await fetch(
    `${getBackendUrl()}/${userPath}/getTimeOffset/params/${id}`,
    { cache: "no-store" }
  );
  return await response.json();
}
