import PushToCamps from "@/components/PushToCamps";

import BaanMembers from "@/components/BaanMembers";
import LocationDateReserve from "@/components/LocationDateReserve";
import NongRegisterPage from "@/components/NongRegisterPage";
import { myMapToMapString } from "@/components/setup";
import getBaan from "@/libs/camp/getBaan";
import getCamp from "@/libs/camp/getCamp";
import getNongCamp from "@/libs/camp/getNongCamp";
import getPart from "@/libs/camp/getPart";
import getPartName from "@/libs/camp/getPartName";
import getShertManageByCampId from "@/libs/user/getShertManageByCampId";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";

export default async function HospitalDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const campId = params.cid;
  const session = await getServerSession(authOptions);
  if (session) {
    const campDetail = await getCamp(campId);
    const token = session.user.token;

    const user = await getUserProfile(token);
    console.log(user);
    if (!user) {
      //alert("ghggg");
      return <PushToCamps />;
    }
    var campRole: "nong" | "pee" | "peto" | null = null;
    const curentRole = user.role;
    const userId: string = user.id;
    const partMap: Map<string, string> = new Map();
    campDetail.partIds.forEach(async (partId: string) => {
      const part = await getPart(partId, token);
      const partName = await getPartName(part.nameId, token);
      partMap.set(partName.name, part.id);
    });

    if (campDetail.nongIds.includes(userId)) {
      campRole = "nong";
      const shertManage = await getShertManageByCampId(campDetail.id, token);
      const nongCamp = await getNongCamp(shertManage.campModelId, token);
      const baan = await getBaan(nongCamp.baanId);
      return <BaanMembers baan={baan} />;
    } else if (campDetail.peeIds.includes(userId)) {
      campRole = "pee";
    } else if (campDetail.petoIds.includes(userId)) {
      campRole = "peto";
    } else if (myMapToMapString(campDetail.nongPendingIds).has(user.id)) {
    } else if (campDetail.nongPaidIds.includes(user.id)) {
    } else if (myMapToMapString(campDetail.nongPassIds).has(user.id)) {
    } else if (myMapToMapString(campDetail.peePassIds).has(user.id)) {
    } else if (myMapToMapString(campDetail.nongInterviewIds).has(user.id)) {
    } else {
      switch (campDetail.memberStructre) {
        case "nong->highSchool,pee->1year,peto->2upYear": {
          if (campDetail.open && user.role == "nong") {
            console.log(user.role);
            return <NongRegisterPage camp={campDetail} token={token} />;
          } else if (!campDetail.peeLock && user.role != "nong") {
            return <LocationDateReserve partMap={partMap} token={token} />;
          } else {
            alert("this camp is close");
            return <PushToCamps />;
          }
        }
        case "nong->1year,pee->2upYear": {
          if (campDetail.open && user.role == "pee") {
            console.log(user.role);
            return <NongRegisterPage camp={campDetail} token={token} />;
          } else if (
            !campDetail.peeLock &&
            (user.role == "peto" || user.role == "admin")
          ) {
            return <LocationDateReserve partMap={partMap} token={token} />;
          } else {
            alert("this camp is close");
            return <PushToCamps />;
          }
        }
        case "nong->highSchool,pee->2upYear": {
          if (campDetail.open && user.role == "nong") {
            console.log(user.role);
            return <NongRegisterPage camp={campDetail} token={token} />;
          } else if (
            !campDetail.peeLock &&
            (user.role == "peto" || user.role == "admin")
          ) {
            return <LocationDateReserve partMap={partMap} token={token} />;
          } else {
            alert("this camp is close");
            return <PushToCamps />;
          }
        }
        case "nong->highSchool,pee->allYear": {
          if (campDetail.open && user.role == "nong") {
            console.log(user.role);
            return <NongRegisterPage camp={campDetail} token={token} />;
          } else if (!campDetail.peeLock && user.role != "nong") {
            return <LocationDateReserve partMap={partMap} token={token} />;
          } else {
            alert("this camp is close");
            return <PushToCamps />;
          }
        }
      }
    }

    return (
      <main className="text-center p-5">
        <div>
          <Image
            src={campDetail.logoUrl}
            alt="htfugyy"
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-lg w-[30%]"
          />
          <div className="text-md mx-5">{}</div>
          <div className="text-md mx-5">{}</div>
          <div className="text-md mx-5">{}</div>
        </div>
      </main>
    );
  } else {
    return <PushToCamps />;
  }
} /*
const campDetail = await getCamp(params.cid);
const session=await getSession()

  console.log(session?.user)
  const user = await getUserProfile(session?.user.token as string);
  if (!user||!session) {
    //alert("ghggg");
    return <PushToCamps />;
  }
  var campRole: "nong" | "pee" | "peto" | null = null;
  const curentRole = session.user.role;
  const userId: string = user.id
  const partMap: Map<string, string> = new Map();
  campDetail.partIds.forEach(async (partId: string) => {
    const part = await getPart(partId, token);
    const partName = await getPartName(part.nameId, token);
    partMap.set(partName.name, part.id);
  });
  const token: string = session.user.token as string;
  if (campDetail.nongIds.includes(userId)) {
    campRole = "nong";
    const shertManage = await getShertManageByCampId(campDetail.id, token);
    const nongCamp = await getNongCamp(shertManage.campModelId, token);
    const baan = await getBaan(nongCamp.baanId);
    return <BaanMembers baan={baan} />;
  } else if (campDetail.peeIds.includes(userId)) {
    campRole = "pee";
  } else if (campDetail.petoIds.includes(userId)) {
    campRole = "peto";
  } else if (myMapToMapString(campDetail.nongPendingIds).has(user.id)) {
  } else if (campDetail.nongPaidIds.includes(user.id)) {
  } else if (myMapToMapString(campDetail.nongPassIds).has(user.id)) {
  } else if (myMapToMapString(campDetail.peePassIds).has(user.id)) {
  } else if (myMapToMapString(campDetail.nongInterviewIds).has(user.id)) {
  } else if (campDetail.open && user.role === "nong") {
    return (
      <main>
        <Link href={campDetail.registerSheetLink}>ใบรับสมัคร</Link>
        <NongRegisterPage camp={campDetail} token={token} />
      </main>
    );
  } else if (!campDetail.peeLock && user.role !== "nong") {
    return <LocationDateReserve partMap={partMap} token={token} />;
  } else {
    alert("this camp is close");

    return <PushToCamps />;
  }
  return (
    <main className="text-center p-5">
      <div>
        <Image
          src={campDetail.logoUrl}
          alt="htfugyy"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg w-[30%]"
        />
        <div className="text-md mx-5">{}</div>
        <div className="text-md mx-5">{}</div>
        <div className="text-md mx-5">{}</div>
      </div>
    </main>
  );*/
