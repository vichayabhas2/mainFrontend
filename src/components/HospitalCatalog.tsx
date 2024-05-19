import { InterCampFront } from "../../intreface";
import Card from "./Card";
import Link from "next/link";



export default async function HospitalCatalog({
  hospitalsJson,
  mapName,
  onRating
}: {
  hospitalsJson: Promise<InterCampFront[]>;
  mapName:Promise<Map<string,string>>,
  onRating:Function
}) {
  const mapred=await mapName


  const hospitalsJsonReady = await hospitalsJson;
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
        {hospitalsJsonReady.map((camp:InterCampFront) => (
          <div className={`w-full h-auto my-${5}`}>
            {/* <Link href={`/hospital/${hospitalItem.id}`}> */}
            <Card
              hospitalName={mapred.get(camp.id) as string}
              link={`/camp/${camp.id}`}
              imgSrc={camp.logoUrl}
              id={camp.id}
              onRating={onRating}
            />{" "}
            {/* </Link> */}
          </div>
        ))}
      </div>
    </>
  );
}
