import getPart from "@/libs/camp/getPart";
import getPlace from "@/libs/randomthing/getPlace";
import mongoose from "mongoose";
import UpdatePartClient from "./UpdatePartClient";
import { getAllPlaceData } from "./placeSetUp";

export default async function UpdatePartServer({
  token,
  partId,
}: {
  partId: mongoose.Types.ObjectId;
  token: string;
}) {
  const part = await getPart(partId);
  const place = part.placeId ? await getPlace(part.placeId) : null;
  const allPlaceData = await getAllPlaceData();

  //const camp = await getCamp(part.campId);
  return (
    <UpdatePartClient
      place={place}
      partId={part._id}
      allPlaceData={allPlaceData}
    />
  );
}
