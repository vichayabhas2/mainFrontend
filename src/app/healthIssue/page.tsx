import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/user/getUserProfile";
import BackToHome from "@/components/BackToHome";
import { HeathIssueBody } from "../../../interface";
import getHeathIssue from "@/libs/user/getHeathIssue";
import HeathIssueClient from "@/components/HeathIssueClient";

export default async function name() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const user = await getUserProfile(session.user.token);
  var heathIssue: HeathIssueBody;
  if (user.heathIssueId) {
    heathIssue = await getHeathIssue(user.heathIssueId);
  } else {
    heathIssue = {
      food: "",
      medicine: "",
      chronicDisease: "",
      extra: "",
      isWearing: false,
      spicy: false,
      foodConcern: "",
      foodLimit: "ไม่มีข้อจำกัดด้านความเชื่อ",
    };
  }
  console.log(heathIssue);
  return (
    <HeathIssueClient heathIssue={heathIssue} token={session.user.token} />
  );
}
