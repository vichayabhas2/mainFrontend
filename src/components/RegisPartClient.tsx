"use client";

import { useRouter } from "next/navigation";
import {
  InterCampFront,
  Mode,
  MyMap,
  RegisBaan,
  RegisPart,
  RoleCamp,
  ShowMember,
  ShowRegister,
} from "../../interface";
import Link from "next/link";
import { useState } from "react";
import mongoose from "mongoose";
import { Checkbox } from "@mui/material";
import { getValue, swop } from "./setup";
import SelectTemplate from "./SelectTemplate";
import FinishButton from "./FinishButton";
import admission from "@/libs/camp/admission";
import addMemberToBaan from "@/libs/camp/addMamberToBaan";
import changeBaan from "@/libs/camp/changeBaan";
import changePart from "@/libs/camp/changePart";

export default function RegisterPartClient({
  regisBaans,
  regisParts,
  peeRegisters,
  camp,
  token,
  isBoard,
  partMap,
}: {
  regisParts: RegisPart[];
  regisBaans: RegisBaan[];
  peeRegisters: ShowRegister[];
  camp: InterCampFront;
  token: string;
  isBoard: boolean;
  partMap: MyMap[];
}) {
  const router = useRouter();
  const [nongPendingIds, set1] = useState<mongoose.Types.ObjectId[]>([]);
  const [nongInterviewIds, set2] = useState<mongoose.Types.ObjectId[]>([]);
  const [nongPaidIds, set4] = useState<mongoose.Types.ObjectId[]>([]);
  const [nongSureIds, set5] = useState<mongoose.Types.ObjectId[]>([]);
  const [peePassIds, set6] = useState<mongoose.Types.ObjectId[]>([]);
  const [members, set7] = useState<mongoose.Types.ObjectId[]>([]);
  const [userIds, set8] = useState<mongoose.Types.ObjectId[]>([]);
  const mapIn: MyMap[] = regisBaans.map((regisBaan) => ({
    key: regisBaan.baan._id,
    value: regisBaan.baan.name,
  }));
  const regis = partMap.filter(
    (e) =>
      e.key.toString() !== camp.partBoardId.toString() &&
      e.key.toString() !== camp.partRegisterId.toString()
  );
  return (
    <div
      style={{
        marginLeft: "5%",
      }}
    >
      <div
        style={{
          color: "#961A1D",
          fontWeight: "bold",
          marginTop: "30px",
        }}
      >
        น้องที่สมัครเข้ามา
      </div>
      <table className="table-auto border border-x-black border-separate">
        <th className=" border border-x-black">รหัส</th>
        <th className=" border border-x-black">link</th>
        <th className=" border border-x-black">select</th>
        {camp.nongPendingIds.map((v, i) => (
          <tr>
            <td
              className=" border border-x-black"
              onClick={() => {
                router.push(`/userProfile/${v.key}`);
              }}
            >
              {getValue(camp.nongMapIdGtoL, v.key)}
            </td>
            <td className=" border border-x-black">
              <Link href={v.value || ""}>link</Link>
            </td>
            <td className=" border border-x-black">
              <Checkbox
                onChange={(e, c) => {
                  if (c) {
                    set1(swop(null, v.key, nongPendingIds));
                  } else {
                    set1(swop(v.key, null, nongPendingIds));
                  }
                }}
              />
            </td>
          </tr>
        ))}
      </table>
      {camp.registerModel === "all" ? (
        <>
          <div
            style={{
              backgroundColor: "#961A1D",
              display: "inline-block",
              padding: "10px",
              borderRadius: "15px",
              marginTop: "5px",
            }}
          >
            <FinishButton
              text="ผ่านรอบเอกสาร"
              onClick={() => {
                admission(
                  { members: nongPendingIds, campId: camp._id },
                  "interview",
                  token
                );
                set1([]);
              }}
            />
            <FinishButton
              text="ตกรอบเอกสาร"
              onClick={() => {
                admission(
                  { members: nongPendingIds, campId: camp._id },
                  "kick/nong",
                  token
                );
                set1([]);
              }}
            />
          </div>
          <div
            style={{
              color: "#961A1D",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            ผ่านการสัมภาส
          </div>
          <table className="table-auto border border-x-blackborder-separate">
            <th className=" border border-x-black">รหัส</th>
            <th className=" border border-x-black">link</th>
            <th className=" border border-x-black">select</th>
            {camp.nongInterviewIds.map((v) => (
              <tr>
                <td
                  className=" border border-x-black"
                  onClick={() => {
                    router.push(`/userProfile/${v.key}`);
                  }}
                >
                  {getValue(camp.nongMapIdGtoL, v.key)}
                </td>
                <td className=" border border-x-black">
                  <Link href={v.value}>link</Link>
                </td>
                <td className=" border border-x-black">
                  <Checkbox
                    onChange={(e, c) => {
                      if (c) {
                        set2(swop(null, v.key, nongInterviewIds));
                      } else {
                        set2(swop(v.key, null, nongInterviewIds));
                      }
                    }}
                  />
                </td>
              </tr>
            ))}
          </table>
          <div
            style={{
              backgroundColor: "#961A1D",
              display: "inline-block",
              padding: "10px",
              borderRadius: "15px",
              marginTop: "5px",
            }}
          >
            <FinishButton
              text="ผ่านการสัมภาส"
              onClick={() => {
                admission(
                  { members: nongInterviewIds, campId: camp._id },
                  "pass",
                  token
                );
                set2([]);
              }}
            />
            <FinishButton
              text="ตกรอบสัมภาส"
              onClick={() => {
                admission(
                  { members: nongInterviewIds, campId: camp._id },
                  "kick/nong",
                  token
                );
                set1([]);
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              backgroundColor: "#961A1D",
              display: "inline-block",
              padding: "10px",
              borderRadius: "15px",
              marginTop: "5px",
            }}
          >
            <FinishButton
              text="ผ่านการคัดเลือก"
              onClick={() => {
                admission(
                  { members: nongPendingIds, campId: camp._id },
                  "pass",
                  token
                );
                set2([]);
              }}
            />
            <FinishButton
              text="ไม่ผ่านการคัดเลือก"
              onClick={() => {
                admission(
                  { members: nongPendingIds, campId: camp._id },
                  "kick/nong",
                  token
                );
                set1([]);
              }}
            />
          </div>
        </>
      )}
      <div
        style={{
          color: "#961A1D",
          fontWeight: "bold",
          marginTop: "30px",
        }}
      >
        {camp.registerModel === "all" ? (
          <>น้องที่ผ่านการสัมภาส</>
        ) : (
          <>น้องที่ผ่านการคัดเลือก</>
        )}
      </div>
      <table className="table-auto border border-x-black border-separate">
        <th className=" border border-x-black">รหัส</th>
        <th className=" border border-x-black">link</th>
        {camp.nongPassIds.map((v) => (
          <tr>
            <td
              className=" border border-x-black"
              onClick={() => {
                router.push(`/userProfile/${v.key}`);
              }}
            >
              {getValue(camp.nongMapIdGtoL, v.key)}
            </td>
            <td className=" border border-x-black">
              <Link href={v.value}>link</Link>
            </td>
          </tr>
        ))}
      </table>
      {camp.registerModel !== "noPaid" ? (
        <>
          <div
            style={{
              color: "#961A1D",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            น้องที่จ่ายเงินแล้ว
          </div>
          <table className="table-auto border border-x-black border-separate">
            <th className=" border border-x-black">รหัส</th>
            <th className=" border border-x-black">link</th>
            <th className=" border border-x-black">select</th>
            {camp.nongPassIds
              .filter((e) => camp.nongPaidIds.includes(e.key))
              .map((v) => (
                <tr>
                  <td
                    className=" border border-x-black"
                    onClick={() => {
                      router.push(`/userProfile/${v.key}`);
                    }}
                  >
                    {v.key.toString()}
                  </td>
                  <td className=" border border-x-black">
                    <Link href={v.value}>link</Link>
                  </td>
                  <td className=" border border-x-black">
                    <Checkbox
                      onChange={(e, c) => {
                        if (c) {
                          set4(swop(null, v.key, nongPaidIds));
                        } else {
                          set4(swop(v.key, null, nongPaidIds));
                        }
                      }}
                    />
                  </td>
                </tr>
              ))}
          </table>
          <div
            style={{
              backgroundColor: "#961A1D",
              display: "inline-block",
              padding: "10px",
              borderRadius: "15px",
              marginTop: "5px",
            }}
          >
            <FinishButton
              text="ยืนยันการจ่ายเงิน"
              onClick={() => {
                admission(
                  { members: nongPaidIds, campId: camp._id },
                  "sure",
                  token
                );
                set4([]);
              }}
            />
            <FinishButton
              text="ไม่ยืนยันการจ่ายเงิน"
              onClick={() => {
                admission(
                  { members: nongPaidIds, campId: camp._id },
                  "kick/nong",
                  token
                );
                set1([]);
              }}
            />
          </div>
        </>
      ) : null}
      <div
        style={{
          color: "#961A1D",
          fontWeight: "bold",
          marginTop: "30px",
        }}
      >
        น้องที่มั่นใจว่าเข้าค่ายแน่นอน
      </div>
      <table>
        <th className=" border border-x-black">รหัส</th>

        <th className=" border border-x-black">select</th>
        {camp.nongSureIds.map((v) => (
          <tr>
            <td
              className=" border border-x-black"
              onClick={() => {
                router.push(`/userProfile/${v.toString()}`);
              }}
            >
              {getValue(camp.nongMapIdGtoL, v)}
            </td>

            <td className=" border border-x-black">
              <Checkbox
                onChange={(e, c) => {
                  if (c) {
                    set5(swop(null, v, nongSureIds));
                  } else {
                    set5(swop(v, null, nongSureIds));
                  }
                }}
              />
            </td>
          </tr>
        ))}
      </table>
      <div
        style={{
          color: "#961A1D",
          fontWeight: "bold",
          marginTop: "30px",
        }}
      >
        พี่ที่สมัครเข้ามา
      </div>
      <table className="table-auto border border-x-black border-separate">
        <th className=" border border-x-black">รหัส</th>
        <th className=" border border-x-black">link</th>
        <th className=" border border-x-black">select</th>
        {peeRegisters.map((v) => (
          <tr>
            <td
              className=" border border-x-black"
              onClick={() => {
                router.push(`/userProfile/${v.userId}`);
              }}
            >
              {v.fullName}
            </td>
            <td className=" border border-x-black">{v.partName}</td>
            <td className=" border border-x-black">
              <Checkbox
                onChange={(e, c) => {
                  if (c) {
                    set6(swop(null, v.userId, peePassIds));
                  } else {
                    set6(swop(v.userId, null, peePassIds));
                  }
                }}
              />
            </td>
          </tr>
        ))}
      </table>
      <SelectTemplate
        mapIn={mapIn}
        select={(baanId) => {
          addMemberToBaan(
            { baanId, members: nongSureIds },
            "nong",
            token,
            "add"
          );
          addMemberToBaan({ baanId, members: peePassIds }, "pee", token, "add");
          changeBaan({ userIds: members, baanId }, token);
          set5([]);
          set6([]);
          set7([]);
        }}
        buttonText={"จัดบ้าน"}
      />
      {regisBaans.map((regisBaan) => (
        <>
          <div>
            <div
              style={{
                color: "#961A1D",
                fontWeight: "bold",
                marginTop: "30px",
              }}
            >
              รายชื่อน้องบ้าน{regisBaan.baan.fullName}
            </div>
            <table className="table-auto border border-x-black border-separate">
              <tr>
                <th className=" border border-x-black">ชือเล่น</th>
                <th className=" border border-x-black">ชื่อจริง</th>
                <th className=" border border-x-black">นามสกุล</th>
                <th className=" border border-x-black">เพศ</th>
                <th className=" border border-x-black">ค้างคืนหรือไม่</th>
                <th className=" border border-x-black">id</th>
                <th className=" border border-x-black">รหัสประจำตัวนิสิต</th>
                <th className=" border border-x-black">เบอร์โทรศัพท์</th>
                <th className=" border border-x-black">email</th>
                <th className=" border border-x-black">มีกระติกน้ำหรือไม่</th>
                <th className=" border border-x-black">ขนาดเสื้อ</th>
                <th className=" border border-x-black">กรุปของนิสิต</th>
                <th className=" border border-x-black">ปัญหาสุขภาพ</th>
                <th className=" border border-x-black">select</th>
              </tr>
              {regisBaan.nongs.map((user: ShowMember) => (
                <tr>
                  <td className=" border border-x-black">{user.nickname}</td>
                  <td className=" border border-x-black">{user.name}</td>
                  <td className=" border border-x-black">{user.lastname}</td>
                  <td className=" border border-x-black">{user.gender}</td>
                  <td className=" border border-x-black">
                    {user.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>}
                  </td>
                  <td
                    className=" border border-x-black"
                    onClick={() => {
                      alert(user._id);
                    }}
                  >
                    {user.id}
                  </td>
                  <td className=" border border-x-black">{user.studentId}</td>
                  <td className=" border border-x-black">{user.tel}</td>
                  <td className=" border border-x-black">{user.email}</td>
                  <td className=" border border-x-black">
                    {user.haveBottle.toString()}
                  </td>
                  <td className=" border border-x-black">{user.shirtSize}</td>
                  <td className=" border border-x-black">{user.group}</td>
                  {user.healthIssueId ? (
                    <td
                      className=" border border-x-black"
                      onClick={() => {
                        router.push(
                          `/healthIssue/${user.healthIssueId?.toString()}`
                        );
                      }}
                    >
                      {user.healthIssueId.toString()}
                    </td>
                  ) : (
                    <td className=" border border-x-black">-</td>
                  )}
                  <td>
                    <Checkbox
                      onChange={(e, c) => {
                        if (c) {
                          set6(swop(null, user._id, members));
                        } else {
                          set6(swop(user._id, null, members));
                        }
                      }}
                    />
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <div>
            <div
              style={{
                color: "#961A1D",
                fontWeight: "bold",
                marginTop: "30px",
              }}
            >
              รายชื่อพี่บ้าน{regisBaan.baan.fullName}
            </div>
            <table className="table-auto border border-x-black border-separate">
              <tr>
                <th className=" border border-x-black">ชือเล่น</th>
                <th className=" border border-x-black">ชื่อจริง</th>
                <th className=" border border-x-black">นามสกุล</th>
                <th className=" border border-x-black">เพศ</th>
                <th className=" border border-x-black">ค้างคืนหรือไม่</th>
                <th className=" border border-x-black">id</th>
                <th className=" border border-x-black">รหัสประจำตัวนิสิต</th>
                <th className=" border border-x-black">เบอร์โทรศัพท์</th>
                <th className=" border border-x-black">email</th>
                <th className=" border border-x-black">มีกระติกน้ำหรือไม่</th>
                <th className=" border border-x-black">ขนาดเสื้อ</th>
                <th className=" border border-x-black">กรุ๊ปของนิสิต</th>
                <th className=" border border-x-black">ปัญหาสุขภาพ</th>
                <th className=" border border-x-black">select</th>
              </tr>
              {regisBaan.pees.map((user: ShowMember) => (
                <tr>
                  <td className=" border border-x-black">{user.nickname}</td>
                  <td className=" border border-x-black">{user.name}</td>
                  <td className=" border border-x-black">{user.lastname}</td>
                  <td className=" border border-x-black">{user.gender}</td>
                  <td className=" border border-x-black">
                    {user.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>}
                  </td>
                  <td
                    className=" border border-x-black"
                    onClick={() => {
                      alert(user._id);
                    }}
                  >
                    {user.id}
                  </td>
                  <td className=" border border-x-black">{user.studentId}</td>
                  <td className=" border border-x-black">{user.tel}</td>
                  <td className=" border border-x-black">{user.email}</td>
                  <td className=" border border-x-black">
                    {user.haveBottle.toString()}
                  </td>
                  <td className=" border border-x-black">{user.shirtSize}</td>
                  <td className=" border border-x-black">{user.group}</td>
                  {user.healthIssueId ? (
                    <td
                      className=" border border-x-black"
                      onClick={() => {
                        router.push(
                          `/healthIssue/${user.healthIssueId?.toString()}`
                        );
                      }}
                    >
                      {user.healthIssueId.toString()}
                    </td>
                  ) : (
                    <td className=" border border-x-black">-</td>
                  )}
                  <td className=" border border-x-black">
                    <Checkbox
                      onChange={(e, c) => {
                        if (c) {
                          set6(swop(null, user._id, members));
                        } else {
                          set6(swop(user._id, null, members));
                        }
                      }}
                    />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </>
      ))}
      {regisParts.map((regisPart) => {
        const have =
          isBoard ||
          (regisPart.part._id.toString() !== camp.partBoardId.toString() &&
            regisPart.part._id.toString() != camp.partRegisterId.toString());
        return (
          <>
            <div>
              <div
                style={{
                  color: "#961A1D",
                  fontWeight: "bold",
                  marginTop: "30px",
                }}
              >
                รายชื่อปีโตฝ่าย{regisPart.part.partName}
              </div>
              <table className="table-auto border border-x-black border-separate">
                <tr>
                  <th className=" border border-x-black">ชือเล่น</th>
                  <th className=" border border-x-black">ชื่อจริง</th>
                  <th className=" border border-x-black">นามสกุล</th>
                  <th className=" border border-x-black">เพศ</th>
                  <th className=" border border-x-black">ค้างคืนหรือไม่</th>
                  <th className=" border border-x-black">id</th>
                  <th className=" border border-x-black">รหัสประจำตัวนิสิต</th>
                  <th className=" border border-x-black">เบอร์โทรศัพท์</th>
                  <th className=" border border-x-black">email</th>
                  <th className=" border border-x-black">มีกระติกน้ำหรือไม่</th>
                  <th className=" border border-x-black">ขนาดเสื้อ</th>
                  <th className=" border border-x-black">กรุปของนิสิต</th>
                  <th className=" border border-x-black">ปัญหาสุขภาพ</th>
                  <th className=" border border-x-black">select</th>
                </tr>
                {regisPart.petos.map((user: ShowMember) => (
                  <tr>
                    <td className=" border border-x-black">{user.nickname}</td>
                    <td className=" border border-x-black">{user.name}</td>
                    <td className=" border border-x-black">{user.lastname}</td>
                    <td className=" border border-x-black">{user.gender}</td>
                    <td className=" border border-x-black">
                      {user.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>}
                    </td>
                    <td
                      className=" border border-x-black"
                      onClick={() => {
                        alert(user._id);
                      }}
                    >
                      {user.id}
                    </td>
                    <td className=" border border-x-black">{user.studentId}</td>
                    <td className=" border border-x-black">{user.tel}</td>
                    <td className=" border border-x-black">{user.email}</td>
                    <td className=" border border-x-black">
                      {user.haveBottle.toString()}
                    </td>
                    <td className=" border border-x-black">{user.shirtSize}</td>
                    <td className=" border border-x-black">{user.group}</td>
                    {user.healthIssueId ? (
                      <td
                        className=" border border-x-black"
                        onClick={() => {
                          router.push(
                            `/healthIssue/${user.healthIssueId?.toString()}`
                          );
                        }}
                      >
                        {user.healthIssueId.toString()}
                      </td>
                    ) : (
                      <td className=" border border-x-black">-</td>
                    )}
                    {have ? (
                      <Checkbox
                        onChange={(e, c) => {
                          if (c) {
                            set8(swop(null, user._id, userIds));
                          } else {
                            set8(swop(user._id, null, userIds));
                          }
                        }}
                      />
                    ) : null}
                  </tr>
                ))}
              </table>
            </div>
            <div>
              <div
                style={{
                  color: "#961A1D",
                  fontWeight: "bold",
                  marginTop: "30px",
                }}
              >
                รายชื่อพี่บ้าน{regisPart.part.partName}
              </div>
              <table className="table-auto border border-x-black border-separate">
                <tr>
                  <th className=" border border-x-black">ชือเล่น</th>
                  <th className=" border border-x-black">ชื่อจริง</th>
                  <th className=" border border-x-black">นามสกุล</th>
                  <th className=" border border-x-black">เพศ</th>
                  <th className=" border border-x-black">ค้างคืนหรือไม่</th>
                  <th className=" border border-x-black">id</th>
                  <th className=" border border-x-black">รหัสประจำตัวนิสิต</th>
                  <th className=" border border-x-black">เบอร์โทรศัพท์</th>
                  <th className=" border border-x-black">email</th>
                  <th className=" border border-x-black">มีกระติกน้ำหรือไม่</th>
                  <th className=" border border-x-black">ขนาดเสื้อ</th>
                  <th className=" border border-x-black">กรุปของนิสิต</th>
                  <th className=" border border-x-black">ปัญหาสุขภาพ</th>
                  <th className=" border border-x-black">select</th>
                </tr>
                {regisPart.pees.map((user: ShowMember) => (
                  <tr>
                    <td className=" border border-x-black">{user.nickname}</td>
                    <td className=" border border-x-black">{user.name}</td>
                    <td className=" border border-x-black">{user.lastname}</td>
                    <td className=" border border-x-black">{user.gender}</td>
                    <td className=" border border-x-black">
                      {user.sleep ? <>ค้างคืน</> : <>ไม่ค้างคืน</>}
                    </td>
                    <td
                      className=" border border-x-black"
                      onClick={() => {
                        alert(user._id);
                      }}
                    >
                      {user.id}
                    </td>
                    <td className=" border border-x-black">{user.studentId}</td>
                    <td className=" border border-x-black">{user.tel}</td>
                    <td className=" border border-x-black">{user.email}</td>
                    <td className=" border border-x-black">
                      {user.haveBottle.toString()}
                    </td>
                    <td className=" border border-x-black">{user.shirtSize}</td>
                    <td className=" border border-x-black">{user.group}</td>
                    {user.healthIssueId ? (
                      <td
                        className=" border border-x-black"
                        onClick={() => {
                          router.push(
                            `/healthIssue/${user.healthIssueId?.toString()}`
                          );
                        }}
                      >
                        {user.healthIssueId.toString()}
                      </td>
                    ) : (
                      <td className=" border border-x-black">-</td>
                    )}
                    {have ? (
                      <Checkbox
                        onChange={(e, c) => {
                          if (c) {
                            set8(swop(null, user._id, userIds));
                          } else {
                            set8(swop(user._id, null, userIds));
                          }
                        }}
                      />
                    ) : null}
                  </tr>
                ))}
              </table>
            </div>
          </>
        );
      })}
      {isBoard ? (
        <SelectTemplate
          mapIn={partMap}
          select={(partId) => {
            changePart({ userIds, partId }, token);
          }}
          buttonText={"ย้ายฝ่าย"}
        />
      ) : (
        <SelectTemplate
          mapIn={regis}
          select={(partId) => {
            changePart({ userIds, partId }, token);
          }}
          buttonText={"ย้ายฝ่าย"}
        />
      )}
    </div>
  );
}
