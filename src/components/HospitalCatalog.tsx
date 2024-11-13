"use client";
import { useRouter } from "next/navigation";
import { InterCampFront } from "../../interface";
import Card from "./Card";
import Link from "next/link";
import mongoose from "mongoose";

export default function HospitalCatalog({
  hospitalsJson,
  url,

  university,
}: {
  hospitalsJson: InterCampFront[];
  url: string;

  university: boolean;
}) {
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
            (camp.memberStructure == "nong->1year,pee->2upYear" ||
              camp.memberStructure == "allYearMix") &&
            !university
          ) {
            return null;
          }
          //console.log(camp);
          return (
            <div className={`w-[70%] h-auto my-${5}`}>
              {/* <Link href={`/hospital/${hospitalItem._id}`}> */}
              <Card
                hospitalName={camp.campName}
                link={`/${url}/${camp._id.toString()}`}
                imgSrc={camp.logoUrl}
                id={camp._id}
                onRating={() => {
                  router.push(`/${url}/${camp._id.toString()}`);
                }}
                camp={camp}
              />{" "}
              {/* </Link> */}
            </div>
          );
        })}
      </div>
    </>
  );
}
