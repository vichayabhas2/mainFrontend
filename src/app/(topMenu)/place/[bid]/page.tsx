import BackToHome from "@/components/BackToHome";
import PlaceClient from "@/components/PlaceClient";
import getPlaces from "@/libs/randomthing/getPlaces";
import mongoose from "mongoose";
import { useSession } from "next-auth/react";

export default async function PlacePage({
  params,
}: {
  params: { bid: string };
}) {
  const places = await getPlaces(new mongoose.Types.ObjectId(params.bid));
  const {data:session}=useSession()
  if(!session){
    return<BackToHome/>
  }
  return<PlaceClient places={places} token={session.user.token}/>
  
}
