import { backendUrl } from "@/components/setup";
import { InterCampFront } from "../../../intreface";

export default async function getCamps(): Promise<InterCampFront[]> {
  const response = await fetch(`${backendUrl}/camp/getCamps`,{ cache: 'no-store' });
 // console.log(`${backendUrl}/camp/getCamps`)

  if (!response.ok) {
    throw new Error("Fail");
  }
  const buf=await response.json()
 //console.log(buf)

  return buf
}
