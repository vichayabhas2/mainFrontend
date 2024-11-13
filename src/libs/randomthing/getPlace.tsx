import { getBackendUrl } from "@/components/setup";
import { Id, InterBuilding, InterPlace } from "../../../interface";
import mongoose from "mongoose";

export default async function getPlace(
  id: Id
): Promise<InterPlace> {
  const res = await fetch(
    `${getBackendUrl()}/randomthing/getPlace/params/${id}`,
    {
      cache: "no-store",
    }
  );
  return await res.json();
}
