import getBaan from "@/libs/camp/getBaan";
import getCamp from "@/libs/camp/getCamp";
import getUserFromCamp from "@/libs/camp/getUserFromCamp";
import getPlace from "@/libs/randomthing/getPlace";
import mongoose from "mongoose";
import BaanMembers from "./BaanMembers";
import UpdateBaanClient from "./UpdateBaanClient";
import { getAllPlace, getAllBuildings } from "./placeSetUp";

export default async function UpdateBaanServer({
  baanId,
}: {
  baanId: mongoose.Types.ObjectId;
}) {
  const baan = await getBaan(baanId);
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
      <UpdateBaanClient
        baan={baan}
        boy={boy}
        girl={girl}
        normal={normal}
        allPlace={allPlace}
        allBuildings={allBuilding}
        camp={camp}
      />
      <BaanMembers baan={baan} campRole={"pee"} nongs={nongs} pees={pees} />
    </>
  );
}
