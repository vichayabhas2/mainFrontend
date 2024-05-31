"use client";
import { useRouter } from "next/navigation";
import { InterCampFront } from "../../intreface";
import Card from "./Card";
import Link from "next/link";

export default function HospitalCatalog({
  hospitalsJson,
  mapName,

}: {
  hospitalsJson: InterCampFront[];
  mapName: Map<string, string>;

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
        {hospitalsJsonReady.map((camp: InterCampFront) => (
          <div className={`w-full h-auto my-${5}`}>
            {/* <Link href={`/hospital/${hospitalItem.id}`}> */}
            <Card
              hospitalName={camp.campName}
              link={`/camp/${camp.id}`}
              imgSrc={camp.logoUrl}
              id={camp.id}
              onRating={() => {
                router.push(`/camp/${camp.id}`);
              }}
            />{" "}
            {/* </Link> */}
          </div>
        ))}
      </div>
    </>
  );
}
