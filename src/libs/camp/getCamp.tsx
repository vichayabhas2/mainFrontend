import { backendUrl } from "@/components/setup";
import { InterCampFront } from "../../../intreface";
import mongoose from "mongoose";

export default async function getCamp(id: mongoose.Types.ObjectId): Promise<InterCampFront> {
  //console.log(id)
  //console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhh')
  //console.log(`${backendUrl}/camp/getCamp/params/${id.toString()}`)
  const response = await fetch(`${backendUrl}/camp/getCamp/params/${id.toString()}`,{ cache: 'no-store' });
  if (!response.ok) {
    throw new Error("Fail");
  }


  return await response.json();
}
