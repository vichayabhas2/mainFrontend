import { backendUrl } from "@/components/setup";
import { InterShertManage } from "../../../intreface";
export default async function shertManagebyCampId(
  id: string,
  token: string
): Promise<InterShertManage> {
  const response = await fetch(
    `${backendUrl}/camp/shertManagebyCampId/params/${id}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Fail");
  }
  return await response.json();
}
