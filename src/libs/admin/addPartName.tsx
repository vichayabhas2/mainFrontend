import { backendUrl } from "@/components/setup";

export default async function addPartName(name:string,token:string){
    const res=await fetch(`${backendUrl}/admin/addPartName/params/${name}`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`
        }

    })
    alert (res.status)
}