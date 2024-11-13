import getAllWelfare from "@/libs/camp/getAllWelfare";
import mongoose from "mongoose";
import WelfareClient from "./WelfareClient";
import { Id } from "../../interface";

export default async function WelfareServer({
  campId,
  token,
}: {
  campId: Id;
  token: string;
}) {
  const welfare = await getAllWelfare(campId);
  return <WelfareClient welfare={welfare} />;
}
