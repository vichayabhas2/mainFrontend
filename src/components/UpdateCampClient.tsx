"use client";

import { useRouter } from "next/navigation";
import { InterCampFront } from "../../interface";
import { InterBaanFront } from "../../intreface";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { TextField, Checkbox } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import updateCamp from "@/libs/admin/updateCamp";
import BackToHome from "./BackToHome";
import dayjs, { Dayjs } from "dayjs";
import FinishButton from "./FinishButton";
import addBaan from "@/libs/admin/addBaan";
//import initBaan from "./initBaan";

export default function UpdateCampClient({
  baans,
  camp,
}: {
  baans: InterBaanFront[];
  camp: InterCampFront;
}) {
  // alert(baans.length)
  const router = useRouter();
  const [newBaanName, setNewBaanName] = useState<string | null>(null);
  const [registerSheetLink, setRegisterSheetLink] = useState<string | null>(
    camp.registerSheetLink
  );
  const [link, setLink] = useState<string | null>(camp.link);
  const [pictureUrls, setPictureUrls] = useState<string[]>(camp.pictureUrls);
  const [logoUrl, setLogoUrl] = useState<string | null>(camp.logoUrl);
  const [dataLock, setDataLock] = useState<boolean>(camp.dataLock);
  const [open, setOpen] = useState<boolean>(camp.open);
  const [peeLock, setPeeLock] = useState<boolean>(camp.peeLock);
  const [lockChangePickup, setLockChangePickup] = useState<boolean>(
    camp.lockChangePickup
  );
  const [allDone, setAllDone] = useState<boolean>(camp.allDone);
  const [dateStart, setDateStart] = useState<Dayjs | null>(
    dayjs(camp.dateStart)
  );
  const [dateEnd, setDateEnd] = useState<Dayjs | null>(dayjs(camp.dateEnd));

  const { data: session } = useSession();
  if (!session) {
    return <BackToHome />;
  }
  /** */
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      {baans.map((baan) => {
        return (
          <div
            onClick={() => {
              //initBaan(baan._id)
              router.push(`/admin/baan/${baan._id}`);
            }}
          >
            {baan.name}
          </div>
        );
      })}

      <div className="text-4xl font-medium">Update Camp</div>
      <form className="w-[30%] items-center bg-slate-600 p-10 rounded-3xl shadow-[25px_25px_40px_-10px_rgba(0,0,0,0.7)]">
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">ชื่อบ้านใหม่</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setNewBaanName(e.target.value)}
            defaultValue={null}
          />
        </div>
        <FinishButton
          text="สร้างบ้าน"
          onClick={() => {
            if (newBaanName) {
              alert(newBaanName);
              addBaan(newBaanName, camp._id, session.user.token);
            }
          }}
        />
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            link ใบสมัคร ถ้าไม่ต้องการให้ใส่ id ตามหลังให้ใส่ ~ ตามหลัง link
            ด้วย
          </label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setRegisterSheetLink(e.target.value)}
            defaultValue={camp.registerSheetLink}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            link frontend รอง
          </label>
          <TextField
            name="Email"
            id="Email"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setLink(e.target.value)}
            defaultValue={camp.link}
          />
        </div>

        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">link รูปภาพ</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setPictureUrls(e.target.value.split(","))}
            defaultValue={camp.pictureUrls.toLocaleString()}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">link logo</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-slate-100 rounded-2xl border-gray-200"
            onChange={(e) => setLogoUrl(e.target.value)}
            defaultValue={camp.logoUrl}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            ล็อกข้อมูลหรือไม่
          </label>
          <Checkbox
            onChange={(e, state) => {
              setDataLock(state);
            }}
            defaultChecked={dataLock}
          />
        </div>
        <div className="flex flex-row justify-end"></div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            เปิดให้น้องค่ายลงทะเบียนหรือไม่
          </label>
          <Checkbox
            onChange={(e, state) => {
              setOpen(state);
            }}
            defaultChecked={open}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            มีกระติกน้ำหรือไม่
          </label>
          <Checkbox
            onChange={(e, state) => {
              setPeeLock(state);
            }}
            defaultChecked={peeLock}
          />
        </div>

        <div className="flex flex-row justify-end"></div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            ชอบนอนในค่ายหรือไม่
          </label>
          <Checkbox
            onChange={(e, state) => {
              setLockChangePickup(state);
            }}
            defaultChecked={lockChangePickup}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-slate-200">
            มีกระติกน้ำหรือไม่
          </label>
          <Checkbox
            onChange={(e, state) => {
              setAllDone(state);
            }}
            defaultChecked={allDone}
          />
        </div>
        <div className=" rounded-lg ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              className="bg-white m-10"
              value={dateStart}
              onChange={(newValue) => {
                setDateStart(newValue);
                console.log(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
        <div className=" rounded-lg ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              className="bg-white m-10"
              value={dateEnd}
              onChange={(newValue) => {
                setDateEnd(newValue);
                console.log(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="flex flex-row justify-end">
          <button
            className="bg-pink-300 p-3 rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            onClick={() => {
              if (dateStart && dateEnd) {
                try {
                  updateCamp(
                    {
                      link,
                      lockChangePickup,
                      logoUrl,
                      peeLock,
                      dataLock,
                      dateEnd: dateEnd.toDate(),
                      dateStart: dateStart.toDate(),
                      pictureUrls,
                      open,
                      allDone,
                      registerSheetLink,
                    },
                    camp._id,
                    session.user.token
                  );
                } catch (error) {
                  console.log(error);
                }
              } else {
                alert("Please type in all the details!");
              }
            }}
          >
            update all
          </button>
        </div>
      </form>
    </div>
  );
}
