import { backendUrl, userPath } from "@/components/setup";
import { InterShertManage } from "../../../intreface";

export default async function checkTel(
  tel:string,
  token: string
): Promise<{relation:string[]}> {
  const response = await fetch(
    `${backendUrl}/${userPath}/checkTel/params/${tel}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },cache: "no-store",
    }
  );
  console.log(`${backendUrl}/${userPath}/checkTel/params/${tel}`)
  if (!response.ok) {
    throw new Error("Fail");
  }
  return await response.json();
}
