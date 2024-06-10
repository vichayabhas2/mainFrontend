import { backendUrl } from "@/components/setup";
import mongoose from "mongoose";

export default async function nongRegisterCamp(campId:mongoose.Types.ObjectId,link:string,token:string){
    const res=await fetch(`${backendUrl}/camp/nongRegisterCamp`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`
        },
        cache: "no-store",
        body:JSON.stringify({
            campId,link
        })
    })
}