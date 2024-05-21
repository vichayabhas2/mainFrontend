import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/user/getUserProfile";
import UpdateModeRaw from "@/components/UpdateModeRaw";
import BackToHome from "@/components/BackToHome";

export default async function updateModePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }

  const user = await getUserProfile(session.user.token as string);
  if (user.mode == "nong" || user.role == "nong") {
    return <BackToHome />;
  }

  return <UpdateModeRaw session={session} user={user} />;
}
