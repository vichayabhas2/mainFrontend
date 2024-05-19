import { backendUrl } from "@/components/setup";
import { InterPeeCamp } from "../../../intreface";

export default async function getPeeCamp(
  id: string,
  token: string
): Promise<InterPeeCamp> {
  const response = await fetch(`${backendUrl}/camp/peeCamp/params/${id}`, {
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
