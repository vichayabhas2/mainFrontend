import { backendUrl } from "@/components/setup";
import { InterPartNameContainer } from "../../../intreface";

export default async function getPartName(
  id: string,
  token: string
): Promise<InterPartNameContainer> {
  const response = await fetch(`${backendUrl}/camp/partName/params/${id}`, {
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
