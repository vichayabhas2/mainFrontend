import { backendUrl } from "@/components/setup";
import { InterCampFront, InterNameContainer } from "../../../intreface";

export default  function getCampName(
  campsa: InterCampFront[]
): Map<string, string> {
  const out: Map<string, string> = new Map();
  const camps = campsa;

  camps.forEach( (camp: InterCampFront) => {
    //const nameContainer = await getName(camp.nameId);
    out.set(camp.id, `${camp.campName} ${camp.round}`);
  });
  return out;
}
/*async function getName(id: string): Promise<InterNameContainer> {
  const res = await fetch(`${backendUrl}/camp/getCampName/params/${id}`);
  return await res.json();
} //${nameContainer.name}*/
