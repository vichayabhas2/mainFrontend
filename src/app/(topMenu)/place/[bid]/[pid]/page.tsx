import getPlaces from "@/libs/randomthing/getPlaces";
import mongoose from "mongoose";

export default async function PlacePage({
  params,
}: {
  params: { bid: string; pid: string };
}) {
  const place = await getPlaces(new mongoose.Types.ObjectId(params.bid));
}
