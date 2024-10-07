"use client";

import { useState } from "react";
import { CampWelfarePack } from "../../interface";
import { MenuItem, Select } from "@mui/material";

export default function WelfareClient({
  welfare,
}: {
  welfare: CampWelfarePack;
}) {
  const welfareModes = [
    "ดูเฉพาะขนาดเสื้อ",
    "ดูทั้งหมด",
    "ซ่อนปัญหาสุขภาพพี่บ้านในฝ่าย",
    "ขั้นสูง",
  ] as const;
  type WelfareMode = (typeof welfareModes)[number];
  const [welfareMode, setWelfareMode] = useState<WelfareMode>("ดูทั้งหมด");
  const showPart =
    welfare.isHavePeto || welfareMode != "ซ่อนปัญหาสุขภาพพี่บ้านในฝ่าย";
  return (
    <>
      <Select value={welfareMode}>
        {welfareModes.map((e) => (
          <MenuItem
            onClick={() => {
              setWelfareMode(e);
            }}
            value={e}
          >
            {e}
          </MenuItem>
        ))}
      </Select>
      <table
        style={{
          width: "80%",
          marginLeft: "10%",
        }}
      >
        <tr>
          <th>กลุ่ม</th>
          <th>น้อง S</th>
          <th>น้อง M</th>
          <th>น้อง L</th>
          <th>น้อง XL</th>
          <th>น้อง XXL</th>
          <th>น้อง 3XL</th>
          <th>พี่{welfare.groupName} S</th>
          <th>พี่{welfare.groupName} M</th>
          <th>พี่{welfare.groupName} L</th>
          <th>พี่{welfare.groupName} XL</th>
          <th>พี่{welfare.groupName} XXL</th>
          <th>พี่{welfare.groupName} 3XL</th>
          {welfare.isHavePeto ? (
            <>
              <th>ปีโต S</th>
              <th>ปีโต M</th>
              <th>ปีโต L</th>
              <th>ปีโต XL</th>
              <th>ปีโต XXL</th>
              <th>ปีโต 3XL</th>
            </>
          ) : null}
        </tr>
        <tr>
          <td>{welfare.name}</td>
          <td>{welfare.nongSize.sizeS}</td>
          <td>{welfare.nongSize.sizeM}</td>
          <td>{welfare.nongSize.sizeL}</td>
          <td>{welfare.nongSize.sizeXL}</td>
          <td>{welfare.nongSize.sizeXXL}</td>
          <td>{welfare.nongSize.size3XL}</td>
          <td>{welfare.peeSize.sizeS}</td>
          <td>{welfare.peeSize.sizeM}</td>
          <td>{welfare.peeSize.sizeL}</td>
          <td>{welfare.peeSize.sizeXL}</td>
          <td>{welfare.peeSize.sizeXXL}</td>
          <td>{welfare.peeSize.size3XL}</td>
          {welfare.isHavePeto ? (
            <>
              <td>{welfare.petoSize.sizeS}</td>
              <td>{welfare.petoSize.sizeM}</td>
              <td>{welfare.petoSize.sizeL}</td>
              <td>{welfare.petoSize.sizeXL}</td>
              <td>{welfare.petoSize.sizeXXL}</td>
              <td>{welfare.petoSize.size3XL}</td>
            </>
          ) : null}
        </tr>
        {welfare.baanWelfares.map((data) => (
          <tr>
            <td>{data.name}</td>
            <td>{data.nongSize.sizeS}</td>
            <td>{data.nongSize.sizeM}</td>
            <td>{data.nongSize.sizeL}</td>
            <td>{data.nongSize.sizeXL}</td>
            <td>{data.nongSize.sizeXXL}</td>
            <td>{data.nongSize.size3XL}</td>
            <td>{data.peeSize.sizeS}</td>
            <td>{data.peeSize.sizeM}</td>
            <td>{data.peeSize.sizeL}</td>
            <td>{data.peeSize.sizeXL}</td>
            <td>{data.peeSize.sizeXXL}</td>
            <td>{data.peeSize.size3XL}</td>
            {welfare.isHavePeto ? (
              <>
                <td>{data.petoSize.sizeS}</td>
                <td>{data.petoSize.sizeM}</td>
                <td>{data.petoSize.sizeL}</td>
                <td>{data.petoSize.sizeXL}</td>
                <td>{data.petoSize.sizeXXL}</td>
                <td>{data.petoSize.size3XL}</td>
              </>
            ) : null}
          </tr>
        ))}
        {welfare.partWelfares.map((data) => (
          <tr>
            <td>{data.name}</td>
            <td>{data.nongSize.sizeS}</td>
            <td>{data.nongSize.sizeM}</td>
            <td>{data.nongSize.sizeL}</td>
            <td>{data.nongSize.sizeXL}</td>
            <td>{data.nongSize.sizeXXL}</td>
            <td>{data.nongSize.size3XL}</td>
            <td>{data.peeSize.sizeS}</td>
            <td>{data.peeSize.sizeM}</td>
            <td>{data.peeSize.sizeL}</td>
            <td>{data.peeSize.sizeXL}</td>
            <td>{data.peeSize.sizeXXL}</td>
            <td>{data.peeSize.size3XL}</td>
            {welfare.isHavePeto ? (
              <>
                <td>{data.petoSize.sizeS}</td>
                <td>{data.petoSize.sizeM}</td>
                <td>{data.petoSize.sizeL}</td>
                <td>{data.petoSize.sizeXL}</td>
                <td>{data.petoSize.sizeXXL}</td>
                <td>{data.petoSize.size3XL}</td>
              </>
            ) : null}
          </tr>
        ))}
      </table>
      {welfareMode == "ดูเฉพาะขนาดเสื้อ" ? null : (
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        <table>
          <tr>
            <th>ชื่อเล่น</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            <th>จาก</th>
            <th>บทบาท</th>
            <th>แพ้อาหารอะไรบ้าง</th>
            <th>เน้นย้ำเรื่องอาหารอะไรบ้าง</th>
            <th>กินเผ็ดได้หรือไม่</th>
            {welfareMode == "ขั้นสูง" ? <th>ใส่แพมเพิสหรือไม่</th> : null}
          </tr>

          {welfare.baanWelfares.map((baan) => (
            <>
              {baan.nongHealths.map((nong) => (
                <tr>
                  <td>{nong.user.nickname}</td>
                  <td>{nong.user.name}</td>
                  <td>{nong.user.lastname}</td>
                  <td>{baan.name}</td>
                  <td>น้องค่าย</td>
                  <td>{nong.heathIssue.food}</td>
                  <td>{nong.heathIssue.foodConcern}</td>
                  <td>{nong.heathIssue.spicy ? "ไม่ได้" : "ได้"}</td>
                  {welfareMode == "ขั้นสูง" ? (
                    <td>{nong.heathIssue.isWearing ? "ใส่" : "ไม่ใส่"}</td>
                  ) : null}
                </tr>
              ))}
              {baan.peeHealths.map((pee) => (
                <tr>
                  <td>{pee.user.nickname}</td>
                  <td>{pee.user.name}</td>
                  <td>{pee.user.lastname}</td>
                  <td>{baan.name}</td>
                  <td>พี่{welfare.groupName}</td>
                  <td>{pee.heathIssue.food}</td>
                  <td>{pee.heathIssue.foodConcern}</td>
                  <td>{pee.heathIssue.spicy ? "ไม่ได้" : "ได้"}</td>
                  {welfareMode == "ขั้นสูง" ? (
                    <td>{pee.heathIssue.isWearing ? "ใส่" : "ไม่ใส่"}</td>
                  ) : null}
                </tr>
              ))}
            </>
          ))}
          {showPart
            ? welfare.partWelfares.map((part) => (
                <>{welfare.isHavePeto?
                  part.petoHealths.map((peto) => (
                    <tr>
                      <td>{peto.user.nickname}</td>
                      <td>{peto.user.name}</td>
                      <td>{peto.user.lastname}</td>
                      <td>{peto.user.name}</td>
                      <td>ปีโต</td>
                      <td>{peto.heathIssue.food}</td>
                      <td>{peto.heathIssue.foodConcern}</td>
                      <td>{peto.heathIssue.spicy ? "ไม่ได้" : "ได้"}</td>
                      {welfareMode == "ขั้นสูง" ? (
                        <td>{peto.heathIssue.isWearing ? "ใส่" : "ไม่ใส่"}</td>
                      ) : null}
                    </tr>
                  )):null}
                  {welfareMode!='ซ่อนปัญหาสุขภาพพี่บ้านในฝ่าย'?
                  part.peeHealths.map((pee) => (
                    <tr>
                      <td>{pee.user.nickname}</td>
                      <td>{pee.user.name}</td>
                      <td>{pee.user.lastname}</td>
                      <td>{part.name}</td>
                      <td>พี่{welfare.groupName}</td>
                      <td>{pee.heathIssue.food}</td>
                      <td>{pee.heathIssue.foodConcern}</td>
                      <td>{pee.heathIssue.spicy ? "ไม่ได้" : "ได้"}</td>
                      {welfareMode == "ขั้นสูง" ? (
                        <td>{pee.heathIssue.isWearing ? "ใส่" : "ไม่ใส่"}</td>
                      ) : null}
                    </tr>
                  )):null}
                </>
              ))
            : null}
        </table>
      )}
    </>
  );
}