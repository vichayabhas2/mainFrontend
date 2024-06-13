import { backendUrl, userPath } from "@/components/setup";
import { InterUser } from "../../../intreface";
export default async function getUserProfile(
  token: string
): Promise<InterUser> {
  const response = await fetch(`${backendUrl}/${userPath}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache:'no-store'
  });
  return await response.json();
}
