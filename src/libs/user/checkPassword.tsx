import { backendUrl, userPath } from "@/components/setup";

export default async function checkPassword(
  password: string,
  token: string,
  check: (isMatch: boolean) => void
) {
  const response = await fetch(`${backendUrl}/${userPath}/checkPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      password,
    }),
    cache: "no-store",
  });
  check(response.ok);
}