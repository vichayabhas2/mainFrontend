import getAllWelfare from "@/libs/camp/getAllWelfare";
import mongoose from "mongoose";
import WelfareClient from "./WelfareClient";

export default async function WelfareServer({
  campId,
  token,
}: {
  campId: mongoose.Types.ObjectId;
  token: string;
}) {
  const welfare = await getAllWelfare(campId);
  return <WelfareClient welfare={welfare} />;
}
