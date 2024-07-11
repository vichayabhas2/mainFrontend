import { backendUrl } from "@/components/setup";
import { AddLostAndFound } from "../../../interface";

export default async function addLostAndFound(input:AddLostAndFound,token:string){
    const res=await fetch(`${backendUrl}/randomthing/addLostAndFound`,{
        method:'POST',cache: "no-store",
        headers:{
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`
        },
        body:JSON.stringify(input)
    })
}