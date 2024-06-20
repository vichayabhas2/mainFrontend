import BaanMembers from "@/components/BaanMembers";
import UpdateBaanClient from "@/components/UpdateBaanClient";
import { getAllBuildings, getAllPlace } from "@/components/placeSetUp";
import getBaan from "@/libs/camp/getBaan";
import getCamp from "@/libs/camp/getCamp";
import getUserFromCamp from "@/libs/camp/getUserFromCamp";
import getPlace from "@/libs/randomthing/getPlace";
import mongoose from "mongoose";

export default async function Baan({ params }: { params: { bid: string } }) {
  const baan = await getBaan(new mongoose.Types.ObjectId(params.bid));
  const boy = baan.boySleepPlaceId
    ? await getPlace(baan.boySleepPlaceId)
    : null;
  const girl = baan.girlSleepPlaceId
    ? await getPlace(baan.girlSleepPlaceId)
    : null;
  const normal = baan.nomalPlaceId ? await getPlace(baan.nomalPlaceId) : null;
  const allPlace = await getAllPlace();
  const allBuilding = await getAllBuildings();
  const camp = await getCamp(baan.campId);
  const pees = await getUserFromCamp("getPeesFromBaanId", baan._id);
  const nongs = await getUserFromCamp("getNongsFromBaanId", baan._id);
  return (
    <>
      <BaanMembers baan={baan} campRole={"pee"} nongs={nongs} pees={pees} />
      <UpdateBaanClient
        baan={baan}
        boy={boy}
        girl={girl}
        normal={normal}
        allPlace={allPlace}
        allBuildings={allBuilding}
        camp={camp}
      />
    </>
  );
}
