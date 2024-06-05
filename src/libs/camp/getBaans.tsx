import { backendUrl } from "@/components/setup";
import mongoose from "mongoose";
import { InterBaanFront } from "../../../interface";

export default async function getBaans(campId:mongoose.Types.ObjectId):Promise<InterBaanFront[]>{
    const res=await fetch(`${backendUrl}/camp/getBaans/params/${campId}`)
    return res.json()
}
