"use client";

import { useRouter } from "next/navigation";
import { InterCampFront, InterPartFront, MyMap } from "../../interface";
import { InterBaanFront } from "../../interface";
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
import SelectTemplate from "./SelectTemplate";
import mongoose from "mongoose";
import addPart from "@/libs/admin/addPart";
import createBaanByGroup from "@/libs/admin/createBaanByGroup";
import saveDeleteCamp from "@/libs/admin/saveDeleteCamp";
//import initBaan from "./initBaan";

export default function UpdateCampClient({
  baans,
  camp,
  parts,
  remainPartName,
}: {
  baans: InterBaanFront[];
  camp: InterCampFront;
  parts: InterPartFront[];
  remainPartName: MyMap[];
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
  const [peeLock, setPeeLock] = useState<boolean>(!camp.peeLock);
  const [lockChangePickup, setLockChangePickup] = useState<boolean>(
    camp.lockChangePickup
  );
  const [allDone, setAllDone] = useState<boolean>(camp.allDone);
  const [dateStart, setDateStart] = useState<Dayjs | null>(
    dayjs(camp.dateStart)
  );
  const [dateEnd, setDateEnd] = useState<Dayjs | null>(dayjs(camp.dateEnd));
  const [groupName, setGroupName] = useState<string>(camp.groupName);
  const [peeDataLock, setPeeDataLock] = useState<boolean>(camp.peeDataLock);
  const [petoDataLock, setPetoDataLock] = useState<boolean>(camp.petoDataLock);
  const [haveCloth, setHaveCloth] = useState<boolean>(camp.haveCloth);

  const { data: session } = useSession();
  if (!session) {
    return <BackToHome />;
  }
  //alert(camp.registerSheetLink)
  /** */
  return (
    <div className="w-[100%] flex flex-col items-center pt-20 space-y-10">
      <div>บ้าน</div>
      {baans.map((baan) => {
        return (
          <div
            onClick={() => {
              router.push(`/admin/baan/${baan._id}`);
            }}
          >
            {baan.name}
          </div>
        );
      })}
      <div>ฝ่าย</div>
      {parts.map((part) => {
        return (
          <div
            onClick={() => {
              router.push(`/admin/part/${part._id}`);
            }}
          >
            {part.partName}
          </div>
        );
      })}

      <div className="text-4xl font-bold"
       style={{
        color:"#961A1D"
      }}
      >Update Camp</div>
      <form className="w-[30%] items-center p-10 rounded-3xl "
       style={{
        backgroundColor:"#961A1D",
        width:"70%",
        marginTop:"20px"
      }}
      >
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">ชื่อบ้านใหม่</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-white rounded-2xl "
            sx={{
              backgroundColor: '#f5f5f5',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: ' 1rem',
                  borderColor: 'transparent', 
                },
                '&:hover fieldset': {
                  borderColor: '#5479FF',      
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5479FF',      
                }
              }
            }}
            onChange={(e) => setNewBaanName(e.target.value)}
            defaultValue={null}
          />
        </div>
        <FinishButton
          text="สร้างบ้านจากกรุ๊ป"
          onClick={() => {
            createBaanByGroup(camp._id, session.user.token);
          }}
        />
        <FinishButton
          text="สร้างบ้าน"
          onClick={() => {
            if (newBaanName) {
              alert(newBaanName);
              addBaan(newBaanName, camp._id, session.user.token);
            }
          }}
        />
        <SelectTemplate
          mapIn={remainPartName}
          select={(e: mongoose.Types.ObjectId) => {
            addPart(e, camp._id, session.user.token);
          }}
          buttonText="สร้างฝ่าย"
        />
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            link ใบสมัคร ถ้าไม่ต้องการให้ใส่ id ตามหลังให้ใส่ ~ ตามหลัง link
            ด้วย
          </label>
          <TextField
            name="Tel"
            id="Tel"
            type="url"
            className="w-3/5 bg-white rounded-2xl "
            sx={{
              backgroundColor: '#f5f5f5',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: ' 1rem',
                  borderColor: 'transparent', 
                },
                '&:hover fieldset': {
                  borderColor: '#5479FF',      
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5479FF',      
                }
              }
            }}
            onChange={(e) => setRegisterSheetLink(e.target.value)}
            defaultValue={camp.registerSheetLink}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            link frontend รอง
          </label>
          <TextField
            name="Email"
            id="Email"
            type="url"
            className="w-3/5 bg-white rounded-2xl "
            sx={{
              backgroundColor: '#f5f5f5',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: ' 1rem',
                  borderColor: 'transparent', 
                },
                '&:hover fieldset': {
                  borderColor: '#5479FF',      
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5479FF',      
                }
              }
            }}
            onChange={(e) => setLink(e.target.value)}
            defaultValue={camp.link}
          />
        </div>

        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">link รูปภาพ</label>
          <TextField
            name="Tel"
            id="Tel"
            type="url"
            className="w-3/5 bg-white rounded-2xl "
            sx={{
              backgroundColor: '#f5f5f5',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: ' 1rem',
                  borderColor: 'transparent', 
                },
                '&:hover fieldset': {
                  borderColor: '#5479FF',      
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5479FF',      
                }
              }
            }}
            onChange={(e) => setPictureUrls(e.target.value.split(","))}
            defaultValue={camp.pictureUrls.toLocaleString()}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">link logo</label>
          <TextField
            name="Tel"
            id="Tel"
            type="url"
            className="w-3/5 bg-white rounded-2xl "
            sx={{
              backgroundColor: '#f5f5f5',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: ' 1rem',
                  borderColor: 'transparent', 
                },
                '&:hover fieldset': {
                  borderColor: '#5479FF',      
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5479FF',      
                }
              }
            }}
            onChange={(e) => setLogoUrl(e.target.value)}
            defaultValue={camp.logoUrl}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            คำเรียกชื่อกลุ่ม
          </label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-white rounded-2xl "
            sx={{
              backgroundColor: '#f5f5f5',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: ' 1rem',
                  borderColor: 'transparent', 
                },
                '&:hover fieldset': {
                  borderColor: '#5479FF',      
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#5479FF',      
                }
              }
            }}
            onChange={(e) => setGroupName(e.target.value)}
            defaultValue={groupName}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            ล็อกข้อมูลน้องหรือไม่
          </label>
          <Checkbox
           sx={{
            "&.Mui-checked": {
              color: "#FFFFFF", // Custom color when checked
            },
          }}
            onChange={(e, state) => {
              setDataLock(state);
            }}
            defaultChecked={dataLock}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            ล็อกข้อมูลพี่บ้านหรือไม่
          </label>
          <Checkbox
           sx={{
            "&.Mui-checked": {
              color: "#FFFFFF", // Custom color when checked
            },
          }}
            onChange={(e, state) => {
              setPeeDataLock(state);
            }}
            defaultChecked={peeDataLock}
          />
        </div>
        {camp.memberStructure === "nong->highSchool,pee->1year,peto->2upYear" ? (
          <div className="flex flex-row items-center my-5">
            <label className="w-2/5 text-2xl text-white">
              ล็อกข้อมูลปีโตหรือไม่
            </label>
            <Checkbox
             sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
              onChange={(e, state) => {
                setPetoDataLock(state);
              }}
              defaultChecked={petoDataLock}
            />
          </div>
        ) : null}

        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            เปิดให้น้องค่ายลงทะเบียนหรือไม่
          </label>
          <Checkbox
           sx={{
            "&.Mui-checked": {
              color: "#FFFFFF", // Custom color when checked
            },
          }}
            onChange={(e, state) => {
              setOpen(state);
            }}
            defaultChecked={open}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            เปิดให้น้องค่ายลงทะเบียนหรือไม่
          </label>
          <Checkbox
           sx={{
            "&.Mui-checked": {
              color: "#FFFFFF", // Custom color when checked
            },
          }}
            onChange={(e, state) => {
              setPeeLock(state);
            }}
            defaultChecked={peeLock}
          />
        </div>

        <div className="flex flex-row justify-end"></div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            ล็อกข้อมูลการรับเสื้อของพี่บ้านหรือไม่
          </label>
          <Checkbox
           sx={{
            "&.Mui-checked": {
              color: "#FFFFFF", // Custom color when checked
            },
          }}
            onChange={(e, state) => {
              setLockChangePickup(state);
            }}
            defaultChecked={lockChangePickup}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            ค่ายเสร็จหรือยัง
          </label>
          <Checkbox
           sx={{
            "&.Mui-checked": {
              color: "#FFFFFF", // Custom color when checked
            },
          }}
            onChange={(e, state) => {
              setAllDone(state);
            }}
            defaultChecked={allDone}
          />
        </div>
        <div className=" rounded-lg ">
          <div
          style={{
            color:"white"
          }}
          >วันเริ่มค่าย</div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
               className="bg-white m-10 rounded-2xl"
               sx={{
                 backgroundColor: '#f5f5f5',
                 '& .MuiOutlinedInput-root': {
                   '& fieldset': {
                     borderRadius: ' 1rem',
                     borderColor: 'transparent', 
                   },
                   '&:hover fieldset': {
                     borderColor: '#5479FF',      
                   },
                   '&.Mui-focused fieldset': {
                     borderColor: '#5479FF',      
                   }
                 }
               }}
              value={dateStart}
              onChange={(newValue) => {
                setDateStart(newValue);
                console.log(newValue);
              }}
              disablePast
            />
          </LocalizationProvider>
        </div>
        <div className=" rounded-lg ">
          <div
            style={{
              color:"white"
            }}
          >วันจบค่าย</div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              className="bg-white m-10 rounded-2xl"
              sx={{
                backgroundColor: '#f5f5f5',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderRadius: ' 1rem',
                    borderColor: 'transparent', 
                  },
                  '&:hover fieldset': {
                    borderColor: '#5479FF',      
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#5479FF',      
                  }
                }
              }}
              value={dateEnd}
              onChange={(newValue) => {
                setDateEnd(newValue);
                console.log(newValue);
              }}
              disablePast
            />
          </LocalizationProvider>
        </div>
        <div className="flex flex-row justify-end">
          <button
            className="bg-white p-3 font-bold rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            style={{
              color:"#961A1D"
            }}
            onClick={() => {
              if (dateStart && dateEnd && dateStart.isBefore(dateEnd)) {
                try {
                  updateCamp(
                    {
                      link,
                      lockChangePickup,
                      logoUrl,
                      peeLock: !peeLock,
                      dataLock,
                      dateEnd: dateEnd.toDate(),
                      dateStart: dateStart.toDate(),
                      pictureUrls,
                      open,
                      allDone,
                      registerSheetLink,
                      groupName,
                      peeDataLock,
                      petoDataLock,
                      haveCloth,
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
          <FinishButton
            text="delete"
            onClick={() => saveDeleteCamp(camp._id, session.user.token)}
          />
        </div>
      </form>
    </div>
  );
}
