import mongoose from "mongoose";
import { ChatReady, GetChat } from "../../../interface";
import { backendUrl } from "@/components/setup";

export default async function getChat(
  id: mongoose.Types.ObjectId,
  mode: GetChat,
  token: string
): Promise<ChatReady> {
  const response = await fetch(
    `${backendUrl}/randomthing/${mode}/params/${id}`,
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
