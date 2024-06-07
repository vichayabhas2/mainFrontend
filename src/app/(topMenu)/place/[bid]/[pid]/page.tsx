import getPlaces from "@/libs/randomthing/getPlaces";
import mongoose from "mongoose";

export default async function PlacePage({
  params,
}: {
  params: { bid: string };
}) {
  const places = await getPlaces(new mongoose.Types.ObjectId(params.bid));
}
