import { backendUrl } from "@/components/setup";
import { InterBuilding } from "../../../interface";

export default async function getAllBuilding():Promise<InterBuilding[]>{
    const res=await fetch(`${backendUrl}/randomthing/getAllBuilding`)
    return await res.json()
}