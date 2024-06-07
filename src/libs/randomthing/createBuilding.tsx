import { backendUrl } from "@/components/setup";

export default async function createBuilding(name:string,token:string){
    const response=await fetch(`${backendUrl}/randomthing/createBuilding/params/${name}`,{
        method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
}