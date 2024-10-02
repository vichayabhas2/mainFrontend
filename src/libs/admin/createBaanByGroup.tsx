import mongoose from "mongoose";
import { getBackendUrl } from "@/components/setup";

export default async function createBaanByGroup(
  campId: mongoose.Types.ObjectId,
  token: string
) {
  await fetch(`${getBackendUrl()}/admin/createBaanByGroup/params/${campId}`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}
