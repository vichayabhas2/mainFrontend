import styles from "./topmenu.module.css";
import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Link } from "@mui/material";
import getUserProfile from "@/libs/user/getUserProfile";
import DateConv from "./Dateconv";
import getTimeOffset from "@/libs/user/getTimeOffset";
import dayjs from "dayjs";

export default async function TopMenu() {
  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const session = await getServerSession(authOptions);
  if (session) {
    const user = await getUserProfile(session.user.token);
    const timeOffset = await getTimeOffset(user.displayOffsetId);
    const dateObj = dayjs(Date.now())
      .add(-timeOffset.day, "days")
      .add(-timeOffset.hour, "hours")
      .add(-timeOffset.minute, "minutes")
      .toDate();
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = monthArray[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    if (user.mode == "nong") {
      if (user.role == "nong") {
        return (
          //น้องจริง
          <div className={styles.menucontainer}>
            <DateConv
              day={day}
              minutes={minutes}
              month={month}
              year={year}
              hours={hours}
            />
            <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
              <TopMenuItem title="ดูข้อมูลคนอื่น" pageRef="/userProfile" />
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
            <DateConv
              day={day}
              minutes={minutes}
              month={month}
              year={year}
              hours={hours}
            />
            <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
              <TopMenuItem title="ดูข้อมูลคนอื่น" pageRef="/userProfile" />
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
      if (user.role == "admin") {
        // admin mode พี่
        return (
          <div className={styles.menucontainer}>
            <DateConv
              day={day}
              minutes={minutes}
              month={month}
              year={year}
              hours={hours}
            />
            <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
              <TopMenuItem title="ดูข้อมูลคนอื่น" pageRef="/userProfile" />
              {user.authPartIds.length ? (
                <TopMenuItem title="ฝ่ายที่ได้รับอนุญาต" pageRef="/authPart" />
              ) : null}
              <TopMenuItem title="tracking sheet" pageRef="/trackingSheet" />
              <TopMenuItem title="action plan" pageRef="/actionPlan" />
              <TopMenuItem title="checkTel" pageRef="/tel" />
              <TopMenuItem title="สถานที่" pageRef="/place" />
              <TopMenuItem title="admin" pageRef="/admin" />
              <TopMenuItem title="Update Mode" pageRef="/updateMode" />
              <TopMenuItem title="Update Profile" pageRef="/updateProfile" />
              <TopMenuItem title="Sign Out" pageRef="/api/auth/signout" />
              <TopMenuItem title="Home" pageRef="/" />
            </div>
          </div>
        );
      } else {
        return (
          // พี่ mode พี่
          <div className={styles.menucontainer}>
            <DateConv
              day={day}
              minutes={minutes}
              month={month}
              year={year}
              hours={hours}
            />
            <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
              <TopMenuItem title="ดูข้อมูลคนอื่น" pageRef="/userProfile" />
              {user.authPartIds.length ? (
                <TopMenuItem title="ฝ่ายที่ได้รับอนุญาต" pageRef="/authPart" />
              ) : null}
              <TopMenuItem title="tracking sheet" pageRef="/trackingSheet" />
              <TopMenuItem title="action plan" pageRef="/actionPlan" />
              <TopMenuItem title="checkTel" pageRef="/tel" />
              <TopMenuItem title="สถานที่" pageRef="/place" />
              <TopMenuItem title="Update Mode" pageRef="/updateMode" />
              <TopMenuItem title="Update Profile" pageRef="/updateProfile" />
              <TopMenuItem title="Sign Out" pageRef="/api/auth/signout" />
              <TopMenuItem title="Home" pageRef="/" />
            </div>
          </div>
        );
      }
    }
  } else {
    const dateObj = new Date(Date.now());
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = monthArray[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    return (
      // not login
      <div className={styles.menucontainer}>
        <DateConv
          day={day}
          minutes={minutes}
          month={month}
          year={year}
          hours={hours}
        />
        <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
          <TopMenuItem title="Register" pageRef="/signup" />
          <TopMenuItem title="Home" pageRef="/" />
        </div>
      </div>
    );
  }
} /*
{role === "admin" && user.mode === "pee" ? (
          <TopMenuItem title="Admin Action" pageRef="" />
        ) : null}
        <TopMenuItem title="Reservations" pageRef="/booking/" />
        {session ? (
          <TopMenuItem title="Sign Out" pageRef="/api/auth/signout" />
        ) : (
          
        )}*/
