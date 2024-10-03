import styles from "./topmenu.module.css";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/user/getUserProfile";
import getSystemInfo from "@/libs/randomthing/getSystemInfo";
import getShertManageByCampId from "@/libs/user/getCampMemberCardByCampId";
import mongoose from "mongoose";
import PushToCamps from "./PushToCamps";
import Logo from "./Logo";

export default async function TopMenuCamp({
  campId,
}: {
  campId: mongoose.Types.ObjectId;
}) {
  const session = await getServerSession(authOptions);
  const { systemMode } = await getSystemInfo();
  if (session) {
    const user = await getUserProfile(session.user.token);
    const shirtManage = await getShertManageByCampId(
      campId,
      session.user.token
    );
    if (user.mode == "nong") {
      if (shirtManage.role == "nong") {
        return (
          //น้องจริง
          <div className={styles.menucontainer}>
            <Logo/>
            <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
              <TopMenuItem title="Lost & Found" pageRef="lostAndFound" />
              <TopMenuItem title="verify" pageRef="/verify" />
              <TopMenuItem title="ปัญหาสุขภาพ" pageRef="/helthIshue" />
              <TopMenuItem title="checkTel" pageRef="/tel" />
              <TopMenuItem title="Update Profile" pageRef="/updateProfile" />
              <TopMenuItem title="Sign Out" pageRef="/api/auth/signout" />
              <TopMenuItem title="Home" pageRef="/" />
            </div>
          </div>
        );
      } else {
        // พี่ และ admin mode น้อง
        return (
          <div className={styles.menucontainer}>
            <Logo/>
            <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
              <TopMenuItem title="Lost & Found" pageRef="lostAndFound" />
              <TopMenuItem title="ปัญหาสุขภาพ" pageRef="/helthIshue" />
              <TopMenuItem title="checkTel" pageRef="/tel" />
              <TopMenuItem title="โซนพี่" pageRef="/peeOnly" />
              <TopMenuItem title="Update Profile" pageRef="/updateProfile" />
              <TopMenuItem title="Sign Out" pageRef="/api/auth/signout" />
              <TopMenuItem title="Home" pageRef="/" />
            </div>
          </div>
        );
      }
    } else {
      return (
        // พี่ mode พี่
        <div className={styles.menucontainer}>
          <Logo/>
          <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
            <TopMenuItem title="Lost & Found" pageRef="lostAndFound" />
            <TopMenuItem title="เมนูพี่" pageRef="/menuPee" />
            <TopMenuItem title="ปัญหาสุขภาพ" pageRef="/helthIshue" />
            <TopMenuItem title="checkTel" pageRef="/tel" />
            <TopMenuItem title="Update Profile" pageRef="/updateProfile" />
            <TopMenuItem title="Sign Out" pageRef="/api/auth/signout" />
            <TopMenuItem title="Home" pageRef="/" />
          </div>
        </div>
      );
    }
  } else {
    return <PushToCamps />;
  }
  //return <TopMenuItem title="Sign Out" pageRef="/api/auth/signout" />
} /*
{role === "admin" && user.mode === "pee" ? (
          <TopMenuItem title="Admin Action" pageRef="" />
        ) : null}
        <TopMenuItem title="Reservations" pageRef="/booking/" />
        {session ? (
          <TopMenuItem title="Sign Out" pageRef="/api/auth/signout" />
        ) : (
          
        )}*/
