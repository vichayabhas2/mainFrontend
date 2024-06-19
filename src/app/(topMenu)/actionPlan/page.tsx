import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ActionPlandClient from "@/components/ActionPlanClient";
import BackToHome from "@/components/BackToHome";
import getActionPlans from "@/libs/camp/getActionPlans";
import { getServerSession } from "next-auth";

export default async function HospitalDetailPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const actionPlans = await getActionPlans(session.user.token);
  return <ActionPlandClient actionPlands={actionPlans} />;
}
