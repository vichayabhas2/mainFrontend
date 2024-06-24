import mongoose from "mongoose";
import { InterWorkingItem } from "../../../interface";
import { backendUrl } from "@/components/setup";

export default async function getWorkingItemByPartId(partId:mongoose.Types.ObjectId,token:string):Promise<InterWorkingItem[]>{
    const response = await fetch(`${backendUrl}/camp/getWorkingItemByPartId/params/${partId}`, {
        method: "GET",
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Fail");
      }
      return await response.json();
}