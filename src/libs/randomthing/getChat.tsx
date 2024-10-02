import mongoose from "mongoose";
import { ChatReady, GetChat } from "../../../interface";
import { getBackendUrl } from "@/components/setup";

export default async function getChat(
  id: mongoose.Types.ObjectId,
  mode: GetChat,
  token: string
): Promise<ChatReady> {
  const response = await fetch(
    `${getBackendUrl()}/randomthing/${mode}/params/${id}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );
  return await response.json();
}
