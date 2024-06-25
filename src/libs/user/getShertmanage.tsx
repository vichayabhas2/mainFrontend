import { backendUrl, userPath } from "@/components/setup";
import mongoose from "mongoose";
import { InterShertManage } from "../../../interface";

export default async function getShertmanage(id:mongoose.Types.ObjectId):Promise<InterShertManage>
{
    const response = await fetch(
        `${backendUrl}/${userPath}/getShertmanage/params/${id}`,
        {
            cache: "no-store",
        }
    );
    if (!response.ok) {
        throw new Error("Fail");
    }
    
    return await response.json()
}