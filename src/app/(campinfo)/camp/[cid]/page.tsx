import PushToCamps from "@/components/PushToCamps";
import BaanMembers from "@/components/BaanMembers";
import LocationDateReserve from "@/components/LocationDateReserve";
import NongRegisterPage from "@/components/NongRegisterPage";
import getBaan from "@/libs/camp/getBaan";
import getCamp from "@/libs/camp/getCamp";
import getNongCamp from "@/libs/camp/getNongCamp";
import getPart from "@/libs/camp/getPart";
import getCampMemberCardByCampId from "@/libs/user/getCampMemberCardByCampId";
import getUserProfile from "@/libs/user/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import { hasKey } from "@/components/setup";
import getPeeCamp from "@/libs/camp/getPeeCamp";
import NongPendingPage from "@/components/NongPendingPage";
import getUserFromCamp from "@/libs/camp/getUserFromCamp";
import ImagesFromUrl from "@/components/ImagesFromUrl";
import { MyMap } from "../../../../../interface";
import PartClient from "@/components/PartClient";
import getPetoCamp from "@/libs/camp/getPetoCamp";
import NongSureClient from "@/components/NongSureClient";
import getTimeOffset from "@/libs/user/getTimeOffset";
import getShowPlace from "@/libs/randomthing/getShowPlace";
import { getAllPlaceData } from "@/components/placeSetUp";
import TopMenuCamp from "@/components/TopMenuCamp";
import WelfareServer from "@/components/WelfareServer";
import chatStyle from "@/components/chat.module.css";
export default async function HospitalDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const campId = params.cid;
  const session = await getServerSession(authOptions);
  if (session) {
    const allPlaceData = await getAllPlaceData();
    const campDetail = await getCamp(new mongoose.Types.ObjectId(campId));
    const token = session.user.token;

    const user = await getUserProfile(token);
    //console.log(user);
    if (!user) {
      //alert("ghggg");
      return <PushToCamps />;
    }
    var campRole: "nong" | "pee" | "peto" | null = null;
    const userId: mongoose.Types.ObjectId = user._id;
    const timeOffset = await getTimeOffset(user.selectOffsetId);
    const partMap: MyMap[] = [];
    var i = 0;
    while (i < campDetail.partIds.length) {
      const part = await getPart(campDetail.partIds[i++], token);

      partMap.push({ key: part._id, value: part.partName });
    }
    if (campDetail.nongIds.includes(userId)) {
      campRole = "nong";
      const campMemberCard = await getCampMemberCardByCampId(
        campDetail._id,
        token
      );
      const nongCamp = await getNongCamp(campMemberCard.campModelId, token);
      const baan = await getBaan(nongCamp.baanId);
      const pees = await getUserFromCamp("getPeesFromBaanId", baan._id);
      const nongs = await getUserFromCamp("getNongsFromBaanId", baan._id);
      console.log(nongs);
      const boy = baan.boySleepPlaceId
        ? await getShowPlace(baan.boySleepPlaceId)
        : null;
      const girl = baan.girlSleepPlaceId
        ? await getShowPlace(baan.girlSleepPlaceId)
        : null;
      const normal = baan.normalPlaceId
        ? await getShowPlace(baan.normalPlaceId)
        : null;
      return (
        <>
          <TopMenuCamp role="nong" mode={user.mode} campId={campDetail._id} />
          <div style={{height:"80px"}}></div>
          <ImagesFromUrl urls={campDetail.pictureUrls} />
          <div
          style={{
            overflow:"hidden",
            borderRadius:"25px",
            padding:"20px",
            backgroundColor:"#961A1D",
            width:"80%",
            marginLeft:"10%"
          }}
          >
          <table style={{
            width:"80%",
            marginLeft:"10%",
          }}>
            <tr style={{
              border:"solid",
              borderColor:"white"
            }}>
              <td style={{
                textAlign:"left"
              }} className={chatStyle.cell1}>สถานที่</td>
              <td className={chatStyle.cell2}>ห้อง</td>
              <td className={chatStyle.cell1}>ชั้น</td>
              <td className={chatStyle.cell2}>ตึก</td>
            </tr>
            <tr style={{
              border:"solid",
              borderColor:"white"
            }}>
              <td style={{
                textAlign:"left"
              }} className={chatStyle.cell1}>
                ห้อง{campDetail.groupName}
                {baan.name}
              </td>
              <td className={chatStyle.cell2}>{normal?.room.toString()}</td>
              <td className={chatStyle.cell1}>{normal?.floor.toString()}</td>
              <td className={chatStyle.cell2}>{normal?.buildingName.toString()}</td>
            </tr>
            <tr style={{
              border:"solid",
              borderColor:"white"
            }}>
              <td style={{
                textAlign:"left"
              }} className={chatStyle.cell1}>
                ห้องนอน{campDetail.groupName}
                {baan.name}น้องผู้ชาย
              </td>
              <td className={chatStyle.cell2}>{boy?.room.toString()}</td>
              <td className={chatStyle.cell1}>{boy?.floor.toString()}</td>
              <td className={chatStyle.cell2}>{boy?.buildingName.toString()}</td>
            </tr>
            <tr style={{
              border:"solid",
              borderColor:"white"
            }}>
              <td style={{
                textAlign:"left"
              }} className={chatStyle.cell1}>
                ห้องนอน{campDetail.groupName}
                {baan.name}น้องผู้หญิง
              </td>
              <td className={chatStyle.cell2}>{girl?.room.toString()}</td>
              <td className={chatStyle.cell1}>{girl?.floor.toString()}</td>
              <td className={chatStyle.cell2}>{girl?.buildingName.toString()}</td>
            </tr>
          </table>
          </div>
          <BaanMembers
            baan={baan}
            campRole="nong"
            pees={pees}
            nongs={nongs}
            camp={campDetail}
          />
        </>
      );
    } else if (campDetail.peeIds.includes(userId)) {
      campRole = "pee";
      const campMemberCard = await getCampMemberCardByCampId(
        campDetail._id,
        token
      );
      const peeCamp = await getPeeCamp(campMemberCard.campModelId, token);
      const baan = await getBaan(peeCamp.baanId);
      const part = await getPart(peeCamp.partId, token);
      const pees = await getUserFromCamp("getPeesFromBaanId", baan._id);
      const nongs = await getUserFromCamp("getNongsFromBaanId", baan._id);
      const PeeParts = await getUserFromCamp("getPeesFromPartId", part._id);
      const peto = await getUserFromCamp("getPetosFromPartId", peeCamp.partId);
      const boy = baan.boySleepPlaceId
        ? await getShowPlace(baan.boySleepPlaceId)
        : null;
      const girl = baan.girlSleepPlaceId
        ? await getShowPlace(baan.girlSleepPlaceId)
        : null;
      const normal = baan.normalPlaceId
        ? await getShowPlace(baan.normalPlaceId)
        : null;
      const partPlace = part.placeId ? await getShowPlace(part.placeId) : null;
      return (
        <>
          <TopMenuCamp role="pee" mode={user.mode} campId={campDetail._id} />
          <div style={{height:"80px"}}></div>
          <ImagesFromUrl urls={campDetail.pictureUrls} />
          <div
          style={{
            overflow:"hidden",
            borderRadius:"25px",
            padding:"20px",
            backgroundColor:"#961A1D",
            width:"80%",
            marginLeft:"10%"
          }}
          >
          <table style={{
            width:"100%",
          }}>
            <tr style={{
              border:"solid",
              borderColor:"white"
  
            }}>
              <td style={{
                textAlign:"left"
              }} className={chatStyle.cell1} >สถานที่</td>
              <td className={chatStyle.cell2}>ห้อง</td>
              <td className={chatStyle.cell1}>ชั้น</td>
              <td className={chatStyle.cell2}>ตึก</td>
            </tr>
            <tr style={{
              border:"solid",
              borderColor:"white"
            }}>
              <td style={{
                textAlign:"left"
              }} className={chatStyle.cell1}>
                ห้อง{campDetail.groupName}
                {baan.name}
              </td>
              <td className={chatStyle.cell2}>{normal?.room.toString()}</td>
              <td className={chatStyle.cell1}>{normal?.floor.toString()}</td>
              <td className={chatStyle.cell2}>{normal?.buildingName.toString()}</td>
            </tr>
            <tr style={{
              border:"solid",
              borderColor:"white"
            }}>
              <td style={{
                textAlign:"left"
              }} className={chatStyle.cell1}>
                ห้องนอนน้องผู้ชาย{campDetail.groupName}
                {baan.name}
              </td>
              <td className={chatStyle.cell2}>{boy?.room.toString()}</td>
              <td className={chatStyle.cell1}>{boy?.floor.toString()}</td>
              <td className={chatStyle.cell2}>{boy?.buildingName.toString()}</td>
            </tr>
            <tr style={{
              border:"solid",
              borderColor:"white"
            }}>
              <td style={{
                textAlign:"left"
              }} className={chatStyle.cell1}>
                ห้องนอนน้องผู้หญิง{campDetail.groupName}
                {baan.name}
              </td>
              <td className={chatStyle.cell2}>{girl?.room.toString()}</td>
              <td className={chatStyle.cell1}>{girl?.floor.toString()}</td>
              <td className={chatStyle.cell2}>{girl?.buildingName.toString()}</td>
            </tr>
          </table>
          </div>
          <BaanMembers
            baan={baan}
            campRole={user.mode}
            pees={pees}
            nongs={nongs}
            camp={campDetail}
          />
          <PartClient
            pees={PeeParts}
            petos={peto}
            part={part}
            user={user}
            allPlaceData={allPlaceData}
            timeOffset={timeOffset}
            camp={campDetail}
          />
        </>
      );
    } else if (campDetail.petoIds.includes(userId)) {
      campRole = "peto";
      const campMemberCard = await getCampMemberCardByCampId(
        campDetail._id,
        token
      );
      const petoCamp = await getPetoCamp(campMemberCard.campModelId, token);

      const part = await getPart(petoCamp.partId, token);
      const PeeParts = await getUserFromCamp("getPeesFromPartId", part._id);
      const peto = await getUserFromCamp("getPetosFromPartId", petoCamp.partId);
      const partPlace = part.placeId ? await getShowPlace(part.placeId) : null;
      return (
        <>
          <TopMenuCamp role="peto" mode={user.mode} campId={campDetail._id} />
          <div style={{height:"80px"}}></div>
          <ImagesFromUrl urls={campDetail.pictureUrls} />
          <PartClient
            pees={PeeParts}
            petos={peto}
            part={part}
            user={user}
            allPlaceData={allPlaceData}
            timeOffset={timeOffset}
            camp={campDetail}
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
      return (
        <>
          <ImagesFromUrl urls={campDetail.pictureUrls} />
          <div>คุณได้จ่ายตังแล้ว</div>
        </>
      );
    } else if (campDetail.nongSureIds.includes(user._id)) {
      return (
        <>
          <ImagesFromUrl urls={campDetail.pictureUrls} />
          <div>คุณได้เข้าค่ายแน่นอน</div>
        </>
      );
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
      switch (campDetail.memberStructure) {
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
    }
  } else {
    return <PushToCamps />;
  }
}
