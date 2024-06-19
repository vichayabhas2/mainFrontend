import { backendUrl } from "@/components/setup";
import { InterActionPlan, showActionPlan } from "../../../interface";

export default async function getActionPlans(
  token: string
): Promise<showActionPlan[]> {
  const response = await fetch(`${backendUrl}/camp/getActionPlans`, {
    method: "GET",
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Fail");
  }
  return await response.json();
}
