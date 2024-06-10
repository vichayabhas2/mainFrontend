import { backendUrl } from "@/components/setup";
import { InterBuilding, InterPlace } from "../../../interface";
import mongoose from "mongoose";

export default async function getPlace(id:mongoose.Types.ObjectId|null):Promise<InterPlace|null>{
    if(!id){
        return null
    }
    const res=await fetch(`${backendUrl}/randomthing/getPlace/params${id}`,{ cache: 'no-store' })
    return await res.json()
}