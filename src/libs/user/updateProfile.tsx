import { backendUrl, userPath } from "@/components/setup";

export async function updateProfile(email: string, tel: string, token: string) {
  const response = await fetch(`${backendUrl}/${userPath}/updateProfile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",

      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(
      { email, tel }

      //{email,gender,haveBottle,lastname,name,nickname,password,shertSize,tel}
    ),
    cache:'no-store'
  });
  return await response.json();
}
