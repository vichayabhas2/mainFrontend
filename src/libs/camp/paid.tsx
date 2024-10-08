import { getBackendUrl } from "@/components/setup";
import mongoose from "mongoose";

export default async function paid(id:mongoose.Types.ObjectId,token:string){
    const res = await fetch(`${getBackendUrl()}/camp/paid/params/${id}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
    console.log(await res.json()) 
}