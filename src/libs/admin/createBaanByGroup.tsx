import mongoose from "mongoose";
import { backendUrl } from "@/components/setup";

export default async function createBaanByGroup(campId:mongoose.Types.ObjectId,token:string){
    await fetch(`${backendUrl}/admin/createBaanByGroup/params/${campId}`,{
        method: "POST",cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },

    })
}