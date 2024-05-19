import { backendUrl } from "@/components/setup";
import { InterUser } from "../../../intreface";

export default async function getUserFromCamp(mode:'getNongsFromBaanId' | 'getPeesFromBaanId' | 'getPeesFromPartId' | 'getPetosFromPartId',id:string):Promise<InterUser[]>{
    const res=await fetch(`${backendUrl}/camp/${mode}/params/${id}`)
    return await res.json()
}