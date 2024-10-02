import { getBackendUrl } from "@/components/setup";
import mongoose from "mongoose";

export default async function addPart(
  nameId: mongoose.Types.ObjectId,
  campId: mongoose.Types.ObjectId,
  token: string
) {
  const res = await fetch(`${getBackendUrl()}/admin/addPart`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      campId,
      nameId,
    }),
  });
}
