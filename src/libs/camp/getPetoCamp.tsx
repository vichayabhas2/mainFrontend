import { backendUrl } from "@/components/setup";
import { InterPetoCamp } from "../../../intreface";

export default async function getpetoCamp(
  id: string,
  token: string
): Promise<InterPetoCamp> {
  const response = await fetch(`${backendUrl}/camp/petoCamp/params/${id}`, {
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
