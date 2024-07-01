import { backendUrl, userPath } from "@/components/setup";
import { HelthIsueBody } from "../../../interface";

export default async function updateHelth(input: HelthIsueBody, token: string) {
  const response = await fetch(`${backendUrl}/${userPath}/updateHelth`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(
      input
    ),
    cache: "no-store",
  });
  return await response.json();
}
