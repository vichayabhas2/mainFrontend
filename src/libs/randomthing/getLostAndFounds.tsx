import { getBackendUrl } from "@/components/setup";
import { InterLostAndFound, ShowLostAndFound } from "../../../interface";

export default async function getLostAndFounds(
  token: string
): Promise<ShowLostAndFound[]> {
  const response = await fetch(
    `${getBackendUrl()}/randomThing/getLostAndFounds`,
    {
      method: "GET",
      cache: "no-store",
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
