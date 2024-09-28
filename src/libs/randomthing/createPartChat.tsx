import { backendUrl } from "@/components/setup";
import { CreatePeeChat } from "../../../interface";

export default async function createPartChat(input:CreatePeeChat,token:string){
    const res=await fetch(`${backendUrl}/randomthing/createPartChat`,{
        method:'POST',cache: "no-store",
        headers:{
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`
        },
        body:JSON.stringify(input)
    })
}