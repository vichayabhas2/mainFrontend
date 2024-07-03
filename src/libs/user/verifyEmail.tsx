//'use server'
import { backendUrl, userPath } from "@/components/setup";

export default async function verifyEmail(password: string, token: string) {
  console.log(`${backendUrl}/${userPath}/verifyEmail/`);
  const response = await fetch(
    `${backendUrl}/${userPath}/verifyEmail/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
      body: JSON.stringify({ password:password }),
    }
  );
  alert(`${backendUrl}/${userPath}/verifyEmail/`);
  return await response.json();
}

