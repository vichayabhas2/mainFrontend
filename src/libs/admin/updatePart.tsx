import { getBackendUrl } from "@/components/setup";
import mongoose from "mongoose";

export default async function updatePart(
  partId: mongoose.Types.ObjectId,
  placeId: mongoose.Types.ObjectId,
  token: string
) {
  const response = await fetch(`${getBackendUrl()}/admin/updatePart`, {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",

      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      partId,
      placeId,
    }),
  });
  return await response.json();
}
