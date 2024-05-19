import { backendUrl } from "@/components/setup";
import { InterBaanFront, InterCampFront } from "../../../intreface";

export default async function getBaan(id: string): Promise<InterBaanFront> {
  const response = await fetch(`${backendUrl}/camp/Baan/params/${id}`);
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
