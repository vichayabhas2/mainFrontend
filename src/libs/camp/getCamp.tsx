import { backendUrl } from "@/components/setup";
import { InterCampFront } from "../../../intreface";

export default async function getCamp(id: string): Promise<InterCampFront> {
  const response = await fetch(`${backendUrl}/camp/getCamp/params/${id}`);
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
