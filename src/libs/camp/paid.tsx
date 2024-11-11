import { getBackendUrl } from "@/components/setup";
import mongoose from "mongoose";
import { Id } from "../../../interface";

export default async function paid(id:Id,token:string){
    const res = await fetch(`${getBackendUrl()}/camp/paid/params/${id}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
    console.log(await res.json()) 
}