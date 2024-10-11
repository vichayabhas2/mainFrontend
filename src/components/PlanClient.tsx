"use client";

import { useState } from "react";
import { AllPlaceData, GetAllPlanData, InterPlace } from "../../interface";
import AllInOneLock from "./AllInOneLock";
import PlaceSelect from "./PlaceSelect";
import FinishButton from "./FinishButton";
import planUpdateCamp from "@/libs/camp/planUpdateCamp";
import { getId } from "./setup";

export default function PlanClient({
  data,
  token,
  allPlaceData,
}: {
  data: GetAllPlanData;
  token: string;
  allPlaceData: AllPlaceData;
}) {
  const [boys, setBoys] = useState<(InterPlace | null)[]>(
    data.baanDatas.map((baan) => baan.boy)
  );
  const [girls, setGirls] = useState<(InterPlace | null)[]>(
    data.baanDatas.map((baan) => baan.girl)
  );
  const [normals, setNormals] = useState<(InterPlace | null)[]>(
    data.baanDatas.map((baan) => baan.normal)
  );
  const [partPlaces, setPartPlaces] = useState<(InterPlace | null)[]>(
    data.partDatas.map((part) => part.place)
  );
  return (
    <div
    style={{
      color:"white",
      backgroundColor:"gray",
      width:"80%",
      marginLeft:"10%",
      padding:"20px",
      borderRadius:"30px"
    }}
    >
      <table>
        <tr>
          <th>{data.groupName}ทั้งหมด</th>
          <th>ห้อง{data.groupName}ปกติ</th>
          {data.isOverNightCamp ? (
            <>
              <th>ห้องนอนน้องผู้ชาย</th>
              <th>ห้องนอนน้องผู้หญิง</th>
            </>
          ) : null}
        </tr>
        {data.baanDatas.map((baan, i) => (
          <tr>
            <td>{baan.name}</td>
            <td>
              <PlaceSelect
                allPlaceData={allPlaceData}
                buildingText="ตึก"
                place={normals[i]}
                placeText="ชั้นและตึก"
                onClick={(out) => {
                  normals[i] = out;
                  setNormals(normals);
                }}
              />
            </td>
            {data.isOverNightCamp ? (
              <>
                <td>
                  <PlaceSelect
                    allPlaceData={allPlaceData}
                    buildingText="ตึก"
                    place={boys[i]}
                    placeText="ชั้นและตึก"
                    onClick={(out) => {
                      boys[i] = out;
                      setBoys(boys);
                    }}
                  />
                </td>
                <td>
                  <PlaceSelect
                    allPlaceData={allPlaceData}
                    buildingText="ตึก"
                    place={girls[i]}
                    placeText="ชั้นและตึก"
                    onClick={(out) => {
                      girls[i] = out;
                      setGirls(girls);
                    }}
                  />
                </td>
              </>
            ) : null}
          </tr>
        ))}
      </table>
      <table>
        <tr>
          <th>ฝ่ายทั้งหมด</th>
          <th>ห้องฝ่าย</th>
        </tr>
        {data.partDatas.map((part, i) => (
          <tr>
            <td>{part.name}</td>
            <td>
              <PlaceSelect
                allPlaceData={allPlaceData}
                buildingText="ตึก"
                place={partPlaces[i]}
                placeText="ชั้นและตึก"
                onClick={(out) => {
                  partPlaces[i] = out;
                  setPartPlaces(partPlaces);
                }}
              />
            </td>
          </tr>
        ))}
      </table>
      <FinishButton
        text="update สถานที่"
        onClick={() =>
          planUpdateCamp(
            {
              baanDatas: data.baanDatas.map((baan, i) => ({
                _id: baan._id,
                boyId: getId(boys[i]),
                girlId: getId(girls[i]),
                normalId: getId(normals[i]),
              })),
              partDatas: data.partDatas.map((part, i) => ({
                _id: part._id,
                placeId: getId(partPlaces[i]),
              })),
              _id: data._id,
            },
            token
          )
        }
      />
    </div>
  );
}
