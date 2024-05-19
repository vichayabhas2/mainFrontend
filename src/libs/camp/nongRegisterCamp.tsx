import { backendUrl } from "@/components/setup";

export default async function nongRegisterCamp(campId:string,link:string,token:string){
    const res=await fetch(`${backendUrl}/camp/nongRegisterCamp`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
            campId,link
        })
    })
}