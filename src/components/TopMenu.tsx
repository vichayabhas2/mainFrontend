import styles from "./topmenu.module.css";
import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Link } from "@mui/material";
import getUserProfile from "@/libs/user/getUserProfile";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  if (session) {
    const user = await getUserProfile(session.user.token);
    if (user.mode == "nong") {
      if (user.role == "nong") {
        return (
          //น้องจริง
          <div className={styles.menucontainer}>
            <Link href={`http://localhost:3000`}>
              {/*<Image
        src={"/img/logo.jpg"}
        className={styles.logoimg}
        alt="logo"
        width={0}
        height={0}
        sizes="100vh"
  />*/}
            </Link>
            <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
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
            <Link href={`http://localhost:3000`}>
              {/*<Image 
          src={"/img/logo.jpg"}
          className={styles.logoimg}
          alt="logo"
          width={0}
          height={0}
          sizes="100vh"
    />*/}
            </Link>
            <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
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
            <Link href={`http://localhost:3000`}>
              {/*<Image
          src={"/img/logo.jpg"}
          className={styles.logoimg}
          alt="logo"
          width={0}
          height={0}
          sizes="100vh"
    />*/}
            </Link>
            <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
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
            <Link href={`http://localhost:3000`}>
              {/*<Image
          src={"/img/logo.jpg"}
          className={styles.logoimg}
          alt="logo"
          width={0}
          height={0}
          sizes="100vh"
    />*/}
            </Link>
            <div className="flex flex-row absolute right-10 top-0 h-full py-2 text-center">
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
    return (
      // not login
      <div className={styles.menucontainer}>
        <Link href={`http://localhost:3000`}>
          {/*<Image
        src={"/img/logo.jpg"}
        className={styles.logoimg}
        alt="logo"
        width={0}
        height={0}
        sizes="100vh"
  />*/}
        </Link>
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
