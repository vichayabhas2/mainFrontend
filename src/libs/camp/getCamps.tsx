import { backendUrl } from "@/components/setup";
import { InterCampFront } from "../../../intreface";

export default async function getCamps(): Promise<InterCampFront[]> {
  const response = await fetch(`${backendUrl}/camp/getCamps`);
  if (!response.ok) {
    throw new Error("Fail");
  }
  console.log(await response.json())

  return await response.json();
}
