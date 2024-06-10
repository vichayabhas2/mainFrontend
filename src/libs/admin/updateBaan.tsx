import { backendUrl } from "@/components/setup";
import { UpdateBaan } from "../../../interface";

export default async function updateBaan(input:UpdateBaan,token:string){
    const response = await fetch(`${backendUrl}/updateBaan`, {
        method: "PUT",cache: "no-store",
        headers: {
          "Content-Type": "application/json",
    
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(
          input
    
          //{email,gender,haveBottle,lastname,name,nickname,password,shertSize,tel}
        ),
      });
      return await response.json();
}