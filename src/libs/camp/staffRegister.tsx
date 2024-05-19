import { backendUrl } from "@/components/setup";

export default async function staffRegisterCamp(partId:string,token:string){
    const res=await fetch(`${backendUrl}/camp/nongRegisterCamp/${partId}`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`
        }

    })
}