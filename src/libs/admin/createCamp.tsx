import { backendUrl } from "@/components/setup";
import { CreateCamp, InterCampFront } from "../../../intreface";

export default async function createCamp(
  input: CreateCamp,
  token: string
): Promise<InterCampFront> {
  const response = await fetch(`${backendUrl}/admin/createCamp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  return await response.json();
}
