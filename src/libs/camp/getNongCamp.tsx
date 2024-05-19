import { backendUrl } from "@/components/setup";
import { InterCampFront, InterNongCampBack } from "../../../intreface";

export default async function getNongCamp(
  id: string,
  token: string
): Promise<InterNongCampBack> {
  const response = await fetch(`${backendUrl}/camp/nongCamp/params/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Fail");
  }

  return await response.json();
}
