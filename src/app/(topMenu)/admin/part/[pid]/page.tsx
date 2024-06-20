import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import UpdateBaanClient from "@/components/UpdateBaanClient";
import UpdatePartClient from "@/components/UpdatePartClient";
import { getAllBuildings, getAllPlace } from "@/components/placeSetUp";
import getBaan from "@/libs/camp/getBaan";
import getCamp from "@/libs/camp/getCamp";
import getPart from "@/libs/camp/getPart";
import getPlace from "@/libs/randomthing/getPlace";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function Baan({ params }: { params: { pid: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const part = await getPart(
    new mongoose.Types.ObjectId(params.pid),
    session.user.token
  );
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
