import getAllBuilding from "@/libs/randomthing/getAllBuilding";
import { AllPlaceData, InterBuilding, InterPlace } from "../../interface";
import getPlaces from "@/libs/randomthing/getPlaces";
import mongoose from "mongoose";
async function getAllPlace() {
  const out = new Map<string, InterPlace[]>();
  const buildings = await getAllBuilding();
  var i = 0;
  while (i < buildings.length) {
    const places = await getPlaces(buildings[i]._id);
    out.set(buildings[i++].name, places);
  }
  //console.log(out);
  return out;
}
export const placeReady = await getAllPlace();
async function getAllBuildings() {
  const out = new Map<mongoose.Types.ObjectId, InterBuilding>();
  const buildings = await getAllBuilding();
  var i = 0;
  while (i < buildings.length) {
    out.set(buildings[i]._id, buildings[i]);
    i++;
  }
  //console.log(out);
  return out;
}
export const AllBuildingsReady = await getAllBuildings();
export async function getAllPlaceData(): Promise<AllPlaceData> {
  return {
    allBuildings: await getAllBuildings(),
    allPlace: await getAllPlace(),
  };
}
