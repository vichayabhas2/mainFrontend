'use client';
import styles from "./topmenu.module.css";
import TopMenuItem from "./TopMenuItem";
import mongoose from "mongoose";
import { Mode, RoleCamp } from "../../interface";
import Logo from "./Logo";
import DateConv from "./Dateconv";
import dayjs from "dayjs";

export default function TopMenuCamp({
  campId,
  role,
  mode,
}: {
  campId: mongoose.Types.ObjectId;
  role: RoleCamp;
  mode: Mode;
}) {
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
  const dateObj = new Date(Date.now());
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = monthArray[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  switch (role) {
    case "nong":
      return (
        <div className={styles.menucontainer}>
          <Logo/>
          <DateConv
              day={day}
              minutes={minutes}
              month={month}
              year={year}
              hours={hours}
            />
          <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
            <TopMenuItem
              title="คุยส่วนตัวกับพี่"
              pageRef={`/camp/${campId}/allNongChat`}
            />
            <TopMenuItem
              title="คุยกันในบ้าน"
              pageRef={`/camp/${campId}/baan/nongChat`}
            />
            <TopMenuItem
              title="อ่านแชตทั้งหมด"
              pageRef={`/camp/${campId}/baan/nongChat`}
            />
          </div>
        </div>
      );
    case "pee": {
      switch (mode) {
        case "nong":
          return (
            <div className={styles.menucontainer}>
              <Logo/>
              <DateConv
              day={day}
              minutes={minutes}
              month={month}
              year={year}
              hours={hours}
            />
              <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
                <TopMenuItem
                  title="คุยส่วนตัวกับน้อง"
                  pageRef={`/camp/${campId}/allNongChat`}
                />
                <TopMenuItem
                  title="คุยกันในบ้าน"
                  pageRef={`/camp/${campId}/baan/nongChat`}
                />
                <TopMenuItem
                  title="อ่านแชตทั้งหมด"
                  pageRef={`/camp/${campId}/baan/nongChat`}
                />
              </div>
            </div>
          );
        case "pee":
          return (
            <div className={styles.menucontainer}>
              <Logo/>
              <DateConv
              day={day}
              minutes={minutes}
              month={month}
              year={year}
              hours={hours}
            />
              <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
                <TopMenuItem
                  title="คุยส่วนตัวกับน้อง"
                  pageRef={`/camp/${campId}/allNongChat`}
                />
                <TopMenuItem
                  title="คุยกันในบ้าน+น้อง"
                  pageRef={`/camp/${campId}/baan/nongChat`}
                />
                <TopMenuItem
                  title="คุยกันในบ้าน+พี่บ้าน"
                  pageRef={`/camp/${campId}/baan/nongChat`}
                />
                <TopMenuItem
                  title="อ่านแชตทั้งหมด"
                  pageRef={`/camp/${campId}/baan/nongChat`}
                />
              </div>
            </div>
          );
      }
    }
    case "peto": {
      switch (mode) {
        case "nong":
          return (
            <div className={styles.menucontainer}>
              <Logo/>
              <DateConv
              day={day}
              minutes={minutes}
              month={month}
              year={year}
              hours={hours}
            />
              <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
                <TopMenuItem
                  title="อ่านแชตทั้งหมด"
                  pageRef={`/camp/${campId}/baan/nongChat`}
                />
              </div>
            </div>
          );
        case "pee":
          return (
            <div className={styles.menucontainer}>
              <Logo/>
              <DateConv
              day={day}
              minutes={minutes}
              month={month}
              year={year}
              hours={hours}
            />
              <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
                <TopMenuItem
                  title="อ่านแชตทั้งหมด"
                  pageRef={`/camp/${campId}/baan/nongChat`}
                />
              </div>
            </div>
          );
      }
    }
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
