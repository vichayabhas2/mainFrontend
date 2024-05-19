import { backendUrl } from "@/components/setup";
import { InterCampFront, InterPartFront } from "../../../intreface";

export default async function getPart(
  id: string,
  token: string
): Promise<InterPartFront> {
  const response = await fetch(`${backendUrl}/camp/part/params/${id}`, {
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
