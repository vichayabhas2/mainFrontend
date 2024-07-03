import { backendUrl, userPath } from "@/components/setup";

export default async function signId(
  token: string
): Promise<{ success: boolean }> {
  const response = await fetch(`${backendUrl}/${userPath}/signId`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  return await response.json();
}
