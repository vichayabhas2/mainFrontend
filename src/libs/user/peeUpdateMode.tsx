import { backendUrl, userPath } from "@/components/setup";
import { InterUser } from "../../../intreface";
export default async function peeUpdateMode(
  token: string,
  mode: "peep" | "nong",
  fillter: string[]
) {
  const response = await fetch(`${backendUrl}/${userPath}/updateMode`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",

      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(
      { mode, fillter }

      //{email,gender,haveBottle,lastname,name,nickname,password,shertSize,tel}
    ),
  });
  return await response.json();
}
