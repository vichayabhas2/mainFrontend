import getPlace from "@/libs/randomthing/getPlace";
import getPlaces from "@/libs/randomthing/getPlaces";
import mongoose from "mongoose";

export default async function PlacePage({
  params,
}: {
  params: { bid: string; pid: string };
}) {
  const place = await getPlace(new mongoose.Types.ObjectId(params.pid));
  //const building=await getBuild
  return (
    <div>
      <table>
        <tr>
          <td>กิจกรรม</td>
          <td>ห้องเรียน</td>
          <td>ห้องนอน</td>
          <td>id</td>
        </tr>
        <tr>
          <td>{place.actCap}</td>
          <td>{place.studyCap}</td>
          <td>{place.sleepCap} </td>
          <td>{place._id.toString()}</td>
        </tr>
      </table>
    </div>
  );
}
