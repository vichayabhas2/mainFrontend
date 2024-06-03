"use client";
import { useRouter } from "next/navigation";
import { InterCampFront } from "../../intreface";
import Card from "./Card";
import Link from "next/link";
import mongoose from "mongoose";

export default function HospitalCatalog({
  hospitalsJson,
  mapName,
  univercity,
}: {
  hospitalsJson: InterCampFront[];
  mapName: Map<mongoose.Types.ObjectId, string>;
  univercity: boolean;
}) {
  const mapred = mapName;
  const router = useRouter();
  const hospitalsJsonReady = hospitalsJson;
  return (
    <>
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "space-around",
        }}
      >
        {hospitalsJsonReady.map((camp: InterCampFront) => {
          if (
            camp.memberStructre == "nong->1year,pee->2upYear" &&
            !univercity
          ) {
            return null;
          }
          console.log(camp)
          return (
            <div className={`w-full h-auto my-${5}`}>
              {/* <Link href={`/hospital/${hospitalItem._id}`}> */}
              <Card
                hospitalName={camp.campName}
                link={`/camp/${camp._id.toString()}`}
                imgSrc={camp.logoUrl}
                id={camp._id}
                onRating={() => {
                  router.push(`/camp/${camp._id.toString()}`);
                }}
              />{" "}
              {/* </Link> */}
            </div>
          );
        })}
      </div>
    </>
  );
}
