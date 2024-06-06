import { backendUrl } from "@/components/setup";
import mongoose from "mongoose";
import { InterBaanFront } from "../../../interface";

export default async function getBaans(campId:mongoose.Types.ObjectId):Promise<InterBaanFront[]>{
    const res=await fetch(`${backendUrl}/camp/getBaans/params/${campId}`)
    console.log(`${backendUrl}/camp/getBaans/params/${campId}`)
console.log(res.status)
const buf= await res.json()
console.log(buf)
    return buf
}
