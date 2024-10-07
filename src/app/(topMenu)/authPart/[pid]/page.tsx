import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BackToHome from "@/components/BackToHome";
import PasswordLock from "@/components/PasswordLock";
import RegisterPartServer from "@/components/RegisterPartServer";
import UpdateBaanServer from "@/components/UpdateBaanServer";
import UpdateCampServer from "@/components/UpdateCampServer";
import WelfareServer from "@/components/WelfareServer";
import getCamp from "@/libs/camp/getCamp";
import getPart from "@/libs/camp/getPart";
import getPeeCamp from "@/libs/camp/getPeeCamp";
import getCampMemberCardByCampId from "@/libs/user/getCampMemberCardByCampId";
import getUserProfile from "@/libs/user/getUserProfile";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export default async function Baan({ params }: { params: { pid: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <BackToHome />;
  }
  const token = session.user.token;
  const partId = new mongoose.Types.ObjectId(params.pid);
  const user = await getUserProfile(session.user.token);

  const part = await getPart(partId);
  const camp = await getCamp(part.campId);
  const campMemberCard = await getCampMemberCardByCampId(part.campId, token);

  if (
    !user.authPartIds.includes(camp.partBoardId) &&
    !user.authPartIds.includes(camp.partCoopId) &&
    !user.authPartIds.includes(camp.partRegisterId) &&
    !user.authPartIds.includes(camp.partWelfareId)
  ) {
    return <BackToHome />;
  }
  switch (partId.toString()) {
    case camp.partCoopId.toString(): {
      switch (campMemberCard.role) {
        case "nong": {
          return <BackToHome />;
        }
        case "pee": {
          const peeCamp = await getPeeCamp(campMemberCard.campModelId, token);
          return (
            <PasswordLock token={token} bypass={user.mode == "pee"}>
              <UpdateBaanServer baanId={peeCamp.baanId} />
            </PasswordLock>
          );
        }
        case "peto": {
          return (
            <PasswordLock token={token} bypass={user.mode == "pee"}>
              {camp.baanIds.map((baanId) => (
                <UpdateBaanServer baanId={baanId} />
              ))}
            </PasswordLock>
          );
        }
      }
    }
    case camp.partBoardId.toString(): {
      return (
        <>
          <UpdateCampServer campId={camp._id} token={token} />
          <RegisterPartServer campId={camp._id} token={token} isBoard={true} />
          <WelfareServer campId={camp._id} token={token}/>
        </>
      );
    }
    case camp.partRegisterId.toString(): {
      return (
        <RegisterPartServer campId={camp._id} token={token} isBoard={false} />
      );
    }
    case camp.partWelfareId.toString(): {
      return <WelfareServer campId={camp._id} token={token} />;
    }
  }
}
