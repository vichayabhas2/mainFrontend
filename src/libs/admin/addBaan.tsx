import { backendUrl } from "@/components/setup";
import mongoose from "mongoose";

export default async function addBaan(name:string,campId:mongoose.Types.ObjectId,token:string){
    const res=await fetch(`${backendUrl}/admin/addBaan`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
            campId,name
        })
    })
    alert (res.status)
    console.log('ghggggggggggggggggggggggfghbhhhhhhhhh')

}