import { backendUrl } from "@/components/setup";
import mongoose from "mongoose";

export default async function deleteActionPlan(id:mongoose.Types.ObjectId,token:string){
    const response = await fetch(`${backendUrl}/camp/deleteActionPlan/params/${id}`, {
        method: "DELETE",
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