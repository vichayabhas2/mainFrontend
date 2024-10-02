"use client";

import mongoose from "mongoose";
import { ShowMember } from "../../interface";
import FinishButton from "./FinishButton";
import { useRouter } from "next/navigation";

export default function ChatChoiseClient({
  nongs,
  campId,
}: {
  nongs: ShowMember[];
  campId: mongoose.Types.ObjectId;
}) {
    const router=useRouter()
  return (
    <table>
      <tr>
        <th>ชือเล่น</th>
        <th>ชื่อจริง</th>
        <th>นามสกุล</th>
        <th>เพศ</th>
        <th>chat</th>
      </tr>
      {nongs.map((user: ShowMember) => {
        console.log(user);
        return (
          <tr>
            <td>{user.nickname}</td>
            <td>{user.name}</td>
            <td>{user.lastname}</td>
            <td>{user.gender}</td>
            <td><FinishButton text="chat" onClick={()=>router.push(`/camp/${campId}/allNongChat/${user.campMemberCardId}`)}/></td>
          </tr>
        );
      })}
    </table>
  );
}
