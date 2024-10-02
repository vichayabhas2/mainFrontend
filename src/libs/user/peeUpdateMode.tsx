import { getBackendUrl, userPath } from "@/components/setup";
import mongoose from "mongoose";
export default async function peeUpdateMode(
  token: string,
  mode: "pee" | "nong",
  filterIds: mongoose.Types.ObjectId[],
  linkHash:string
) {
  const response = await fetch(`${getBackendUrl()}/${userPath}/updateMode`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",

      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(
      { mode, filterIds,linkHash }
    ),
    cache:'no-store'
  });
  return await response.json();
}
