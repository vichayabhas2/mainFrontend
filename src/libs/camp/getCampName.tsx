import { backendUrl } from "@/components/setup";
import { InterCampFront, InterNameContainer } from "../../../intreface";

export default async function getCampName(
  campsa: Promise<InterCampFront[]>
): Promise<Map<string, string>> {
  const out: Map<string, string> = new Map();
  const camps = await campsa;

  camps.forEach(async (camp: InterCampFront) => {
    const nameContainer = await getName(camp.nameId);
    out.set(camp.id, `${nameContainer.name} ${camp.round}`);
  });
  return out;
}
async function getName(id: string): Promise<InterNameContainer> {
  const res = await fetch(`${backendUrl}/camp/getCampName/params/${id}`);
  return await res.json();
}
