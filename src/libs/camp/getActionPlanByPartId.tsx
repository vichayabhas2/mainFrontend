import mongoose from "mongoose";
import { InterActionPlan, showActionPlan } from "../../../interface";
import { backendUrl } from "@/components/setup";

export default async function getActionPlanByPartId(partId:mongoose.Types.ObjectId,token:string):Promise<showActionPlan[]>{
    const response = await fetch(`${backendUrl}/camp/getActionPlanByPartId/params/${partId}`, {
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