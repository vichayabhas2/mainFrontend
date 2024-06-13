import { backendUrl } from "@/components/setup";
import { InterBuilding } from "../../../interface";

export default async function getAllBuilding():Promise<InterBuilding[]>{
    const res=await fetch(`${backendUrl}/randomthing/getAllBuilding`,{ cache: 'no-store' })
    const buf=await res.json()
    return buf
}