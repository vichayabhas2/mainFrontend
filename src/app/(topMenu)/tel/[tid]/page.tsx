import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import checkTel from "@/libs/user/checkTel";
import { getServerSession } from "next-auth";

export default async function HospitalDetailPage({
  params,
}: {
  params: { tid: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <></>;
  }

  const tels = await checkTel(params.tid, session.user.token);
  //console.log(tels)

  return (
    <div className="p-8">
      {tels.relation.map((v) => (
        <div>{v}</div>
      ))}
    </div>
  );
}
