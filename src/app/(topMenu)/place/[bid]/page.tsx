import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import PlaceClient from "@/components/PlaceClient";
import getPlaces from "@/libs/randomthing/getPlaces";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export default async function PlacePage({
  params,
}: {
  params: { bid: string };
}) {
  const places = await getPlaces(new mongoose.Types.ObjectId(params.bid));
  //console.log(places)
  const session=await getServerSession(authOptions)
  if (!session) {
    return <BackToHome />;
  }
  return (
    <PlaceClient
      places={places}
      token={session.user.token}
      buildingId={params.bid}
    />
  );
}
