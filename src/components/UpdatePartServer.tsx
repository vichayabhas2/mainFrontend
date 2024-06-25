import getPart from "@/libs/camp/getPart";
import getPlace from "@/libs/randomthing/getPlace";
import mongoose from "mongoose";
import UpdatePartClient from "./UpdatePartClient";
import { getAllPlace, getAllBuildings } from "./placeSetUp";

export default async function UpdatePartServer({
    token,
  partId,
}: {
  partId: mongoose.Types.ObjectId;
  token:string
}) {
  const part = await getPart(partId, token);
  const place = part.placeId ? await getPlace(part.placeId) : null;
  const allPlace = await getAllPlace();
  const allBuilding = await getAllBuildings();

  //const camp = await getCamp(part.campId);
  return (
    <UpdatePartClient
      place={place}
      allPlace={allPlace}
      allBuildings={allBuilding}
      partId={part._id}
    />
  );
}
