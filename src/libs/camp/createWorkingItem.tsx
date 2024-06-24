import { backendUrl } from "@/components/setup";
import { CreateWorkingItem } from "../../../interface";

export default async function createWorkingItem(input:CreateWorkingItem,token:string){
    const response = await fetch(`${backendUrl}/camp/createWorkingItem/`, {
        method: "POST",cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });
      return await response.json();
}