import { backendUrl } from "@/components/setup";
import mongoose from "mongoose";

export default async function staffRegisterCamp(partId:mongoose.Types.ObjectId,token:string){
    const res=await fetch(`${backendUrl}/camp/nongRegisterCamp/${partId}`,{
        method:'POST',
        cache: "no-store",
        headers:{
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`
        }

    })
}