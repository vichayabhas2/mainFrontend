import { backendUrl } from "@/components/setup";
import { InterNameContainer } from "../../../intreface";

export default async function getCampNames():Promise<InterNameContainer[]>{
    const response=await fetch(`${backendUrl}/admin/getCampNames`)
    return await response.json()
}