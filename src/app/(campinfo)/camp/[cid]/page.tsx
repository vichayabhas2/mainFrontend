import PushToCamps from "@/components/PushToCamps";
import BaanMembers from "@/components/BaanMembers";
import LocationDateReserve from "@/components/LocationDateReserve";
import NongRegisterPage from "@/components/NongRegisterPage";
import getBaan from "@/libs/camp/getBaan";
import getCamp from "@/libs/camp/getCamp";
import getNongCamp from "@/libs/camp/getNongCamp";
import getPart from "@/libs/camp/getPart";
import getShertManageByCampId from "@/libs/user/getShertManageByCampId";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import mongoose from "mongoose";
import { hasKey } from "@/components/setup";
import getPeeCamp from "@/libs/camp/getPeeCamp";
import NongPendingPage from "@/components/NongPendingPage";
import getUserFromCamp from "@/libs/camp/getUserFromCamp";
import ImagesFromUrl from "@/components/ImagesFromUrl";
import { MyMap } from "../../../../../interface";
import PartClient from "@/components/PartClient";
import getPetoCamp from "@/libs/camp/getPetoCamp";
import { getAllPlace, getAllBuildings } from "@/components/placeSetUp";
import NongSureClient from "@/components/NongSureClient";
export default async function HospitalDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const campId = params.cid;
  const session = await getServerSession(authOptions);
  if (session) {
    const allPlace = await getAllPlace();
    const allBuilding = await getAllBuildings();
    const campDetail = await getCamp(new mongoose.Types.ObjectId(campId));
    const token = session.user.token;

    const user = await getUserProfile(token);
    //console.log(user);
    if (!user) {
      //alert("ghggg");
      return <PushToCamps />;
    }
    var campRole: "nong" | "pee" | "peto" | null = null;
    const curentRole = user.role;
    const userId: mongoose.Types.ObjectId = user._id;
    const partMap: MyMap[] = [];
    var i = 0;
    while (i < campDetail.partIds.length) {
      const part = await getPart(campDetail.partIds[i++], token);

      partMap.push({ key: part._id, value: part.partName });
    }
    if (campDetail.nongIds.includes(userId)) {
      campRole = "nong";
      const shertManage = await getShertManageByCampId(campDetail._id, token);
      const nongCamp = await getNongCamp(shertManage.campModelId, token);
      const baan = await getBaan(nongCamp.baanId);
      const pees = await getUserFromCamp("getPeesFromBaanId", baan._id);
      const nongs = await getUserFromCamp("getNongsFromBaanId", baan._id);
      return (
        <>
          <ImagesFromUrl urls={campDetail.pictureUrls} />
          <BaanMembers baan={baan} campRole="nong" pees={pees} nongs={nongs} />
        </>
      );
    } else if (campDetail.peeIds.includes(userId)) {
      campRole = "pee";
      const shertManage = await getShertManageByCampId(campDetail._id, token);
      const peeCamp = await getPeeCamp(shertManage.campModelId, token);
      const baan = await getBaan(peeCamp.baanId);
      const part = await getPart(peeCamp.partId, token);
      const pees = await getUserFromCamp("getPeesFromBaanId", baan._id);
      const nongs = await getUserFromCamp("getNongsFromBaanId", baan._id);
      const PeeParts = await getUserFromCamp("getPeesFromPartId", part._id);
      const peto = await getUserFromCamp("getPetosFromPartId", peeCamp.partId);
      return (
        <>
          <ImagesFromUrl urls={campDetail.pictureUrls} />
          <BaanMembers
            baan={baan}
            campRole={user.mode}
            pees={pees}
            nongs={nongs}
          />
          <PartClient
            pees={PeeParts}
            petos={peto}
            part={part}
            user={user}
            allPlace={allPlace}
            allBuildings={allBuilding}
          />
        </>
      );
    } else if (campDetail.petoIds.includes(userId)) {
      campRole = "peto";
      const shertManage = await getShertManageByCampId(campDetail._id, token);
      const petoCamp = await getPetoCamp(shertManage.campModelId, token);

      const part = await getPart(petoCamp.partId, token);
      const PeeParts = await getUserFromCamp("getPeesFromPartId", part._id);
      const peto = await getUserFromCamp("getPetosFromPartId", petoCamp.partId);
      return (
        <>
          <ImagesFromUrl urls={campDetail.pictureUrls} />

          <PartClient
            pees={PeeParts}
            petos={peto}
            part={part}
            user={user}
            allPlace={allPlace}
            allBuildings={allBuilding}
          />
        </>
      );
    } else if (hasKey(campDetail.nongPendingIds, user._id)) {
      return (
        <>
          <ImagesFromUrl urls={campDetail.pictureUrls} />
          <NongPendingPage camp={campDetail} user={user} token={token} />
        </>
      );
    } else if (campDetail.nongPaidIds.includes(user._id)) {
      return <div>คุณได้จ่ายตังแล้ว</div>;
    } else if (campDetail.nongSureIds.includes(user._id)) {
      return <div>คุณได้เข้าค่ายแน่นอน</div>;
    } else if (hasKey(campDetail.nongPassIds, user._id)) {
      return (
        <NongSureClient campDetail={campDetail} user={user} token={token} />
      );
    } else if (hasKey(campDetail.peePassIds, user._id)) {
      if (!campDetail.peeLock) {
        return (
          <LocationDateReserve partMap={partMap} token={token} user={user} />
        );
      }
    } else if (hasKey(campDetail.nongInterviewIds, user._id)) {
      return <div>น้องผ่านรอบเอกสารแล้ว</div>;
    } else {
      switch (campDetail.memberStructre) {
        case "nong->highSchool,pee->1year,peto->2upYear": {
          if (campDetail.open && user.role == "nong") {
            //console.log(user.role);
            return (
              <>
                <ImagesFromUrl urls={campDetail.pictureUrls} />
                <NongRegisterPage camp={campDetail} token={token} user={user} />
              </>
            );
          } else if (!campDetail.peeLock && user.role != "nong") {
            return (
              <>
                <ImagesFromUrl urls={campDetail.pictureUrls} />
                <LocationDateReserve
                  partMap={partMap}
                  token={token}
                  user={user}
                />
              </>
            );
          } else {
            alert("this camp is close");
            return <PushToCamps />;
          }
        }
        case "nong->1year,pee->2upYear": {
          if (
            campDetail.open &&
            user.fridayActEn &&
            !(user.role == "peto" || user.role == "admin")
          ) {
            //console.log(user.role);
            return (
              <>
                <ImagesFromUrl urls={campDetail.pictureUrls} />
                <NongRegisterPage camp={campDetail} token={token} user={user} />
              </>
            );
          } else if (
            !campDetail.peeLock &&
            (user.role == "peto" || user.role == "admin")
          ) {
            return (
              <>
                <ImagesFromUrl urls={campDetail.pictureUrls} />
                <LocationDateReserve
                  partMap={partMap}
                  token={token}
                  user={user}
                />
              </>
            );
          } else {
            alert("this camp is close");
            return <PushToCamps />;
          }
        }
        case "nong->highSchool,pee->2upYear": {
          if (campDetail.open && user.role == "nong") {
            //console.log(user.role);
            return (
              <>
                <ImagesFromUrl urls={campDetail.pictureUrls} />
                <NongRegisterPage camp={campDetail} token={token} user={user} />
              </>
            );
          } else if (
            !campDetail.peeLock &&
            (user.role == "peto" || user.role == "admin")
          ) {
            return (
              <>
                <ImagesFromUrl urls={campDetail.pictureUrls} />
                <LocationDateReserve
                  partMap={partMap}
                  token={token}
                  user={user}
                />
              </>
            );
          } else {
            alert("this camp is close");
            return <PushToCamps />;
          }
        }
        case "nong->highSchool,pee->allYear": {
          if (campDetail.open && user.role == "nong") {
            //console.log(user.role);
            return (
              <>
                <ImagesFromUrl urls={campDetail.pictureUrls} />
                <NongRegisterPage camp={campDetail} token={token} user={user} />
              </>
            );
          } else if (!campDetail.peeLock && user.role != "nong") {
            return (
              <>
                <ImagesFromUrl urls={campDetail.pictureUrls} />
                <LocationDateReserve
                  partMap={partMap}
                  token={token}
                  user={user}
                />
              </>
            );
          } else {
            alert("this camp is close");
            return <PushToCamps />;
          }
        }
      }
    } //ล่อไว้ก่อน
  } else {
    return <PushToCamps />;
  }
}
/*
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
  const userId: string = user._id
  const partMap: Map<string, string> = new Map();
  campDetail.partIds.forEach(async (partId: string) => {
    const part = await getPart(partId, token);
    const partName = await getPartName(part.nameId, token);
    partMap.set(partName.name, part._id);
  });
  const token: string = session.user.token as string;
  if (campDetail.nongIds.includes(userId)) {
    campRole = "nong";
    const shertManage = await getShertManageByCampId(campDetail._id, token);
    const nongCamp = await getNongCamp(shertManage.campModelId, token);
    const baan = await getBaan(nongCamp.baanId);
    return <BaanMembers baan={baan} />;
  } else if (campDetail.peeIds.includes(userId)) {
    campRole = "pee";
  } else if (campDetail.petoIds.includes(userId)) {
    campRole = "peto";
  } else if (myMapToMapString(campDetail.nongPendingIds).has(user._id)) {
  } else if (campDetail.nongPaidIds.includes(user._id)) {
  } else if (myMapToMapString(campDetail.nongPassIds).has(user._id)) {
  } else if (myMapToMapString(campDetail.peePassIds).has(user._id)) {
  } else if (myMapToMapString(campDetail.nongInterviewIds).has(user._id)) {
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
