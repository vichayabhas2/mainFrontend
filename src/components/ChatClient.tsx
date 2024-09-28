"use client";
import { ChatReady } from "../../interface";
import { useState } from "react";
import GetTimeHtml from "./GetTimeHtml";
import { TextField } from "@mui/material";
import createNongBaanChat from "@/libs/randomthing/createNongBaanChat";
import createPartChat from "@/libs/randomthing/createPartChat";
import createNongChat from "@/libs/randomthing/createNongChat";
import createPeeBaanChat from "@/libs/randomthing/createPeeBaanChat";
import StringToHtml from "./StringToHtml";

export default function ChatClient({
  data,
  token,
}: {
  data: ChatReady;
  token: string;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const sendType = data.sendType;
  return (
    <div>
      <table>
        <tr>
          <th>ห้อง</th>
          <th>ชื่อเล่น</th>
          <th>บ้าน</th>
          {data.mode == "pee" ? <th>ฝ่าย</th> : <th>พี่หรือน้อง</th>}
          <th>วันเวลา</th>
          <th>ประเภท</th>
          <th>ข้อความ</th>
        </tr>
        {data.chats.map((chat) => (
          <tr>
            <td>{chat.roomName}</td>
            <td>{chat.nickname}</td>
            <td>{chat.baanName}</td>
            {data.mode == "pee" ? (
              <td>{chat.partName}</td>
            ) : chat.role == "nong" ? (
              <td>น้องค่าย</td>
            ) : (
              <td>พี่{data.groupName}</td>
            )}
            <td>
              <GetTimeHtml input={chat.date} offset={data.timeOffset} />
            </td>
            <td>{chat.typeChat}</td>
            <td>
              <StringToHtml input={chat.message} />
            </td>
          </tr>
        ))}
      </table>
      {sendType ? (
        <form className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
          <div className="flex flex-row items-center">
            <TextField
              name="Name"
              id="Name"
              className="w-3/5 bg-slate-100 rounded-2xl shadow-inner"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-end">
            <button
              className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
              onClick={() => {
                if (message) {
                  try {
                    switch (sendType.roomType) {
                      case "คุยกันในบ้าน": {
                        createNongBaanChat(
                          { baanId: sendType.id, message },
                          token
                        );
                        break;
                      }
                      case "คุยกันในฝ่าย": {
                        createPartChat({ partId: sendType.id, message }, token);
                        break;
                      }
                      case "น้องคุยส่วนตัวกับพี่": {
                        createNongChat(
                          { shertmanageId: sendType.id, message },
                          token
                        );
                        break;
                      }
                      case "พี่คุยกันในบ้าน": {
                        createPeeBaanChat(
                          { baanId: sendType.id, message },
                          token
                        );
                        break;
                      }
                      case "พี่บ้านคุยกัน": {
                        createPartChat({ partId: sendType.id, message }, token);
                        break;
                      }
                    }
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  alert("Please type in all the details!");
                }
              }}
            >
              send message
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
