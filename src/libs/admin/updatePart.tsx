import { backendUrl } from "@/components/setup";
import mongoose from "mongoose";

export default async function updatePart(partId:mongoose.Types.ObjectId,placeId:mongoose.Types.ObjectId,token:string){
    const response = await fetch(`${backendUrl}/admin/updatePart`, {
        method: "PUT",cache: "no-store",
        headers: {
          "Content-Type": "application/json",
    
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(
          {
            partId,
            placeId
          }
    
          //{email,gender,haveBottle,lastname,name,nickname,password,shertSize,tel}
        ),
      });
      return await response.json();
}