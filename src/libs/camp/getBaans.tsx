import { getBackendUrl } from "@/components/setup";
import mongoose from "mongoose";
import { InterBaanFront } from "../../../interface";

export default async function getBaans(
  campId: mongoose.Types.ObjectId
): Promise<InterBaanFront[]> {
  const res = await fetch(`${getBackendUrl()}/camp/getBaans/params/${campId}`, {
    cache: "no-store",
  });
  const buf = await res.json();
  return buf;
}
