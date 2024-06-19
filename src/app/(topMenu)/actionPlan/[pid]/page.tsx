import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import getPart from "@/libs/camp/getPart";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function HospitalDetailPage({
  params,
}: {
  params: { pid: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const part =await getPart(new mongoose.Types.ObjectId(params.pid),session.user.token)
  return <></>;
}
