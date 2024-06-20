import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ActionPlandClient from "@/components/ActionPlanClient";
import BackToHome from "@/components/BackToHome";
import getActionPlanByPartId from "@/libs/camp/getActionPlanByPartId";
import getUserProfile from "@/libs/user/getUserProfile";
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
  const user = await getUserProfile(session.user.token);
  if (user.role === "nong") {
    return <BackToHome />;
  }
  const actionPlans=await getActionPlanByPartId(new mongoose.Types.ObjectId(params.pid),session.user.token)
  return <>
  <ActionPlandClient actionPlands={actionPlans}/>
  </>;
}
