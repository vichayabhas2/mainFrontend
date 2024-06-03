import { backendUrl } from "@/components/setup";
import { InterUser } from "../../../intreface";
import mongoose from "mongoose";

export default async function getUserFromCamp(mode:'getNongsFromBaanId' | 'getPeesFromBaanId' | 'getPeesFromPartId' | 'getPetosFromPartId',id:mongoose.Types.ObjectId):Promise<InterUser[]>{
    const res=await fetch(`${backendUrl}/camp/${mode}/params/${id}`)
    return await res.json()
}