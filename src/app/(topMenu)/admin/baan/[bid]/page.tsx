import UpdateBaanClient from "@/components/UpdateBaanClient";
import { getAllBuildings, getAllPlace } from "@/components/placeSetUp";
import getBaan from "@/libs/camp/getBaan";
import getCamp from "@/libs/camp/getCamp";
import getPlace from "@/libs/randomthing/getPlace";
import mongoose from "mongoose";

export default async function Baan({ params }: { params: { bid: string } }) {
  const baan = await getBaan(new mongoose.Types.ObjectId(params.bid));
  const boy = await getPlace(baan.boySleepPlaceId);
  const girl = await getPlace(baan.girlSleepPlaceId);
  const normal = await getPlace(baan.nomalPlaceId);
  const allPlace = await getAllPlace();
  const allBuilding = await getAllBuildings();
  const camp = await getCamp(baan.campId);
  return (
    <UpdateBaanClient
      baan={baan}
      boy={boy}
      girl={girl}
      normal={normal}
      allPlace={allPlace}
      allBuildings={allBuilding}
      camp={camp}
    />
  );
}
