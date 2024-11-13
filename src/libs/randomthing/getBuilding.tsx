import mongoose from "mongoose";
import { Id, InterBuilding } from "../../../interface";
import { getBackendUrl } from "@/components/setup";

export default async function getBuilding(
  id: Id
): Promise<InterBuilding> {
  const res = await fetch(
    `${getBackendUrl()}/randomthing/getPlace/params/${id}`,
    {
      cache: "no-store",
    }
  );
  return await res.json();
}
