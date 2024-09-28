import { backendUrl } from "@/components/setup";
import { CreateNongChat } from "../../../interface";

export default async function createNongChat(input:CreateNongChat,token:string){
    const res=await fetch(`${backendUrl}/randomthing/createNongChat`,{
        method:'POST',cache: "no-store",
        headers:{
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`
        },
        body:JSON.stringify(input)
    })
}