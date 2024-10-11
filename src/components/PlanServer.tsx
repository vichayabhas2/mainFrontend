import getAllPlanData from "@/libs/camp/getAllPlanData";
import mongoose from "mongoose";
import { getAllPlaceData } from "./placeSetUp";
import PlanClient from "./PlanClient";

export default async function PlanServer({
  token,
  campId,
}: {
  token: string;
  campId: mongoose.Types.ObjectId;
}) {
  const data = await getAllPlanData(campId);
  const allPlaceData = await getAllPlaceData();
  return <PlanClient token={token} allPlaceData={allPlaceData} data={data} />;
}
