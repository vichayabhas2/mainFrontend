import { backendUrl } from "@/components/setup";
import { CreateBaanChat } from "../../../interface";

export default async function createPeeBaanChat(input:CreateBaanChat,token:string){
    const res=await fetch(`${backendUrl}/randomthing/createPeeBaanChat`,{
        method:'POST',cache: "no-store",
        headers:{
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`
        },
        body:JSON.stringify(input)
    })
}