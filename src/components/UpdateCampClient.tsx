"use client";

import { useRouter } from "next/navigation";
import {
  Choice,
  GetAllQuestion,
  Id,
  InterCampFront,
  InterPartFront,
  MyMap,
} from "../../interface";
import { InterBaanFront } from "../../interface";
import { Dispatch, SetStateAction, useState } from "react";
import { useSession } from "next-auth/react";
import { TextField, Checkbox, Select, MenuItem } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import updateCamp from "@/libs/admin/updateCamp";
import BackToHome from "./BackToHome";
import dayjs, { Dayjs } from "dayjs";
import FinishButton from "./FinishButton";
import addBaan from "@/libs/admin/addBaan";
import SelectTemplate from "./SelectTemplate";
import addPart from "@/libs/admin/addPart";
import createBaanByGroup from "@/libs/admin/createBaanByGroup";
import saveDeleteCamp from "@/libs/admin/saveDeleteCamp";
import TypingImageSource from "./TypingImageSource";
import { notEmpty } from "./setup";
import editQuestion from "@/libs/camp/editQuestion";

export default function UpdateCampClient({
  baans,
  camp,
  parts,
  remainPartName,
  questions,
}: {
  baans: InterBaanFront[];
  camp: InterCampFront;
  parts: InterPartFront[];
  remainPartName: MyMap[];
  questions: GetAllQuestion;
}) {
  const router = useRouter();
  const [newBaanName, setNewBaanName] = useState<string | null>(null);
  const [registerSheetLink, setRegisterSheetLink] = useState<string | null>(
    camp.registerSheetLink
  );
  const [link, setLink] = useState<string | null>(camp.link);
  const [pictureUrls, setPictureUrls] = useState<(string | null)[]>(
    camp.pictureUrls
  );
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
  const [showCorrectAnswerAndScore, setShowCorrectAnswerAndScore] = useState(
    camp.showCorrectAnswerAndScore
  );
  const choiceIds: [Id | null, Dispatch<SetStateAction<Id | null>>][] =
    questions.choices.map((choice) => useState<Id | null>(choice._id));
  const choiceQuestions: [string, Dispatch<SetStateAction<string>>][] =
    questions.choices.map((choice) => useState<string>(choice.question));
  const as: [string, Dispatch<SetStateAction<string>>][] =
    questions.choices.map((choice) => useState<string>(choice.a));
  const bs: [string, Dispatch<SetStateAction<string>>][] =
    questions.choices.map((choice) => useState<string>(choice.b));
  const cs: [string, Dispatch<SetStateAction<string>>][] =
    questions.choices.map((choice) => useState<string>(choice.c));
  const ds: [string, Dispatch<SetStateAction<string>>][] =
    questions.choices.map((choice) => useState<string>(choice.d));
  const es: [string, Dispatch<SetStateAction<string>>][] =
    questions.choices.map((choice) => useState<string>(choice.e));
  const scoreAs: [number, Dispatch<SetStateAction<number>>][] =
    questions.choices.map((choice) => useState<number>(choice.scoreA));
  const scoreBs: [number, Dispatch<SetStateAction<number>>][] =
    questions.choices.map((choice) => useState<number>(choice.scoreB));
  const scoreCs: [number, Dispatch<SetStateAction<number>>][] =
    questions.choices.map((choice) => useState<number>(choice.scoreC));
  const scoreDs: [number, Dispatch<SetStateAction<number>>][] =
    questions.choices.map((choice) => useState<number>(choice.scoreD));
  const scoreEs: [number, Dispatch<SetStateAction<number>>][] =
    questions.choices.map((choice) => useState<number>(choice.scoreE));
  const corrects: [Choice | "-", Dispatch<SetStateAction<Choice | "-">>][] =
    questions.choices.map((choice) => useState<Choice | "-">(choice.correct));
  const choiceOrder: [number, Dispatch<SetStateAction<number>>][] =
    questions.choices.map((choice) => useState<number>(choice.order));
  const textQuestions: [string, Dispatch<SetStateAction<string>>][] =
    questions.texts.map((text) => useState<string>(text.question));
  const textIds: [Id | null, Dispatch<SetStateAction<Id | null>>][] =
    questions.texts.map((text) => useState<Id | null>(text._id));
  const scores: [number, Dispatch<SetStateAction<number>>][] =
    questions.texts.map((text) => useState<number>(text.score));
  const textOrder: [number, Dispatch<SetStateAction<number>>][] =
    questions.texts.map((text) => useState<number>(text.score));
  function safeToDeleteTextQuestion() {
    if (textIds[textIds.length - 1][0]) {
      return;
    }
    textQuestions.pop();
    textIds.pop();
    scores.pop();
    textOrder.pop();
  }
  function safeToDeleteChoiceQuestion() {
    if (choiceIds[choiceIds.length - 1][0]) {
      return;
    }
    choiceIds.push(useState<Id | null>(null));
    choiceQuestions.pop();
    as.pop();
    bs.pop();
    cs.pop();
    ds.pop();
    es.pop();
    scoreAs.pop();
    scoreBs.pop();
    scoreCs.pop();
    scoreDs.pop();
    scoreEs.pop();
    corrects.pop();
    choiceOrder.pop();
  }
  function addTextQuestion() {
    textQuestions.push(useState("-"));
    textIds.push(useState<Id | null>(null));
    scores.push(useState<number>(0));
    textOrder.push(useState<number>(0));
  }
  function addChoiceQuestion() {
    choiceIds.push(useState<Id | null>(null));
    choiceQuestions.push(useState<string>("-"));
    as.push(useState<string>("-"));
    bs.push(useState<string>("-"));
    cs.push(useState<string>("-"));
    ds.push(useState<string>("-"));
    es.push(useState<string>("-"));
    scoreAs.push(useState<number>(0));
    scoreBs.push(useState<number>(0));
    scoreCs.push(useState<number>(0));
    scoreDs.push(useState<number>(0));
    scoreEs.push(useState<number>(0));
    corrects.push(useState<Choice | "-">("-"));
    choiceOrder.push(useState<number>(0));
  }

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

      <div
        className="text-4xl font-bold"
        style={{
          color: "#961A1D",
        }}
      >
        Update Camp
      </div>
      <div
        className="w-[30%] items-center p-10 rounded-3xl "
        style={{
          backgroundColor: "#961A1D",
          width: "70%",
          marginTop: "20px",
        }}
      >
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">ชื่อบ้านใหม่</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-white rounded-2xl "
            sx={{
              backgroundColor: "#f5f5f5",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: " 1rem",
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "#5479FF",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5479FF",
                },
              },
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
          select={(e: Id) => {
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
              backgroundColor: "#f5f5f5",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: " 1rem",
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "#5479FF",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5479FF",
                },
              },
            }}
            onChange={(e) => setRegisterSheetLink(e.target.value)}
            defaultValue={camp.registerSheetLink}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">link frontend รอง</label>
          <TextField
            name="Email"
            id="Email"
            type="url"
            className="w-3/5 bg-white rounded-2xl "
            sx={{
              backgroundColor: "#f5f5f5",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: " 1rem",
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "#5479FF",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5479FF",
                },
              },
            }}
            onChange={(e) => setLink(e.target.value)}
            defaultValue={camp.link}
          />
        </div>

        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">link รูปภาพ</label>
          {pictureUrls.map((pictureUrl, i) => (
            <TypingImageSource
              onChange={function (imgSrc: string | null): void {
                pictureUrls[i] = imgSrc;
                setPictureUrls(pictureUrls);
              }}
              defaultSrc={pictureUrl}
            />
          ))}
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">link logo</label>
          <TypingImageSource defaultSrc={logoUrl} onChange={setLogoUrl} />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">คำเรียกชื่อกลุ่ม</label>
          <TextField
            name="Tel"
            id="Tel"
            className="w-3/5 bg-white rounded-2xl "
            sx={{
              backgroundColor: "#f5f5f5",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: " 1rem",
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "#5479FF",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#5479FF",
                },
              },
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
        {camp.memberStructure ===
        "nong->highSchool,pee->1year,peto->2upYear" ? (
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
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">มีเสื้อแจกหรือไม่</label>
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            onChange={(e, state) => {
              setHaveCloth(state);
            }}
            defaultChecked={haveCloth}
          />
        </div>
        <div className="flex flex-row items-center my-5">
          <label className="w-2/5 text-2xl text-white">
            เปิดเฉลยและคะแนนหรือไม่
          </label>
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: "#FFFFFF", // Custom color when checked
              },
            }}
            onChange={(e, state) => {
              setShowCorrectAnswerAndScore(state);
            }}
            defaultChecked={showCorrectAnswerAndScore}
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
          <label className="w-2/5 text-2xl text-white">ค่ายเสร็จหรือยัง</label>
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
              color: "white",
            }}
          >
            วันเริ่มค่าย
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              className="bg-white m-10 rounded-2xl"
              sx={{
                backgroundColor: "#f5f5f5",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: " 1rem",
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "#5479FF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#5479FF",
                  },
                },
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
              color: "white",
            }}
          >
            วันจบค่าย
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              className="bg-white m-10 rounded-2xl"
              sx={{
                backgroundColor: "#f5f5f5",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: " 1rem",
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "#5479FF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#5479FF",
                  },
                },
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

        {choiceIds.map((v, i) => {
          function getChooseChoice(input:Choice|'-'):string {
            var chooseChoice: string;
            switch (input) {
              case "A": {
                chooseChoice = as[i][0];
                break;
              }
              case "B": {
                chooseChoice = bs[i][0];
                break;
              }
              case "C": {
                chooseChoice = cs[i][0];
                break;
              }
              case "D": {
                chooseChoice = ds[i][0];
                break;
              }
              case "E": {
                chooseChoice = es[i][0];
                break;
              }
              case "-": {
                chooseChoice = "-";
                break;
              }
            }
            return chooseChoice
          }

          return (
            <>
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">
                  คำถามข้อที่ {i + 1}
                </label>
                <TextField
                  name="Email"
                  id="Email"
                  className="w-3/5 bg-white rounded-2xl "
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: " 1rem",
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#5479FF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5479FF",
                      },
                    },
                  }}
                  onChange={(e) => {
                    choiceQuestions[i][1](e.target.value);
                  }}
                  defaultValue={choiceQuestions[i][0]}
                />
              </div>
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">A</label>
                <TextField
                  name="Email"
                  id="Email"
                  className="w-3/5 bg-white rounded-2xl "
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: " 1rem",
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#5479FF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5479FF",
                      },
                    },
                  }}
                  onChange={(e) => {
                    as[i][1](e.target.value);
                  }}
                  defaultValue={as[i][0]}
                />
              </div>
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">B</label>
                <TextField
                  name="Email"
                  id="Email"
                  className="w-3/5 bg-white rounded-2xl "
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: " 1rem",
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#5479FF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5479FF",
                      },
                    },
                  }}
                  onChange={(e) => {
                    bs[i][1](e.target.value);
                  }}
                  defaultValue={bs[i][0]}
                />
              </div>
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">C</label>
                <TextField
                  name="Email"
                  id="Email"
                  className="w-3/5 bg-white rounded-2xl "
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: " 1rem",
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#5479FF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5479FF",
                      },
                    },
                  }}
                  onChange={(e) => {
                    cs[i][1](e.target.value);
                  }}
                  defaultValue={cs[i][0]}
                />
              </div>
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">D</label>
                <TextField
                  name="Email"
                  id="Email"
                  className="w-3/5 bg-white rounded-2xl "
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: " 1rem",
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#5479FF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5479FF",
                      },
                    },
                  }}
                  onChange={(e) => {
                    ds[i][1](e.target.value);
                  }}
                  defaultValue={ds[i][0]}
                />
              </div>
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">E</label>
                <TextField
                  name="Email"
                  id="Email"
                  className="w-3/5 bg-white rounded-2xl "
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: " 1rem",
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#5479FF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5479FF",
                      },
                    },
                  }}
                  onChange={(e) => {
                    es[i][1](e.target.value);
                  }}
                  defaultValue={es[i][0]}
                />
              </div>
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">คะแนน A</label>
                <TextField
                  name="Email"
                  id="Email"
                  type="number"
                  className="w-3/5 bg-white rounded-2xl "
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: " 1rem",
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#5479FF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5479FF",
                      },
                    },
                  }}
                  onChange={(e) => {
                    scoreAs[i][1](parseFloat(e.target.value));
                  }}
                  defaultValue={scoreAs[i][0]}
                />
              </div>
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">คะแนน B</label>
                <TextField
                  name="Email"
                  id="Email"
                  type="number"
                  className="w-3/5 bg-white rounded-2xl "
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: " 1rem",
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#5479FF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5479FF",
                      },
                    },
                  }}
                  onChange={(e) => {
                    scoreBs[i][1](parseFloat(e.target.value));
                  }}
                  defaultValue={scoreBs[i][0]}
                />
              </div>
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">คะแนน C</label>
                <TextField
                  name="Email"
                  id="Email"
                  type="number"
                  className="w-3/5 bg-white rounded-2xl "
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: " 1rem",
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#5479FF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5479FF",
                      },
                    },
                  }}
                  onChange={(e) => {
                    scoreCs[i][1](parseFloat(e.target.value));
                  }}
                  defaultValue={scoreCs[i][0]}
                />
              </div>
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">คะแนน D</label>
                <TextField
                  name="Email"
                  id="Email"
                  type="number"
                  className="w-3/5 bg-white rounded-2xl "
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: " 1rem",
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#5479FF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5479FF",
                      },
                    },
                  }}
                  onChange={(e) => {
                    scoreDs[i][1](parseFloat(e.target.value));
                  }}
                  defaultValue={scoreDs[i][0]}
                />
              </div>
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">คะแนน E</label>
                <TextField
                  name="Email"
                  id="Email"
                  type="number"
                  className="w-3/5 bg-white rounded-2xl "
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: " 1rem",
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#5479FF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5479FF",
                      },
                    },
                  }}
                  onChange={(e) => {
                    scoreEs[i][1](parseFloat(e.target.value));
                  }}
                  defaultValue={scoreEs[i][0]}
                />
              </div>
              <div>เลือกตัวเลือกที่ถูกต้อง</div>
              <Select
                defaultValue={getChooseChoice(corrects[i][0])}
                variant="standard"
                name="location"
                id="location"
                className="h-[2em] w-[200px] mb-5 text-white"
              >
                <MenuItem
                  onClick={() => {
                    corrects[i][1]("A");
                  }}
                  value={`A ${as[i][0]}`}
                >
                  A {as[i][0]}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    corrects[i][1]("B");
                  }}
                  value={`B ${bs[i][0]}`}
                >
                  B {bs[i][0]}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    corrects[i][1]("C");
                  }}
                  value={`C ${cs[i][0]}`}
                >
                  C {cs[i][0]}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    corrects[i][1]("D");
                  }}
                  value={`D ${ds[i][0]}`}
                >
                  D {ds[i][0]}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    corrects[i][1]("E");
                  }}
                  value={`E ${es[i]}`}
                >
                  E {es[i][0]}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    corrects[i][1]("-");
                  }}
                  value={"-"}
                >
                  -
                </MenuItem>
              </Select>
              {corrects[i]}
              <div className="flex flex-row items-center my-5">
                <label className="w-2/5 text-2xl text-white">ลำดับ</label>
                <TextField
                  name="Email"
                  id="Email"
                  type="number"
                  className="w-3/5 bg-white rounded-2xl "
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: " 1rem",
                        borderColor: "transparent",
                      },
                      "&:hover fieldset": {
                        borderColor: "#5479FF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#5479FF",
                      },
                    },
                  }}
                  onChange={(e) => {
                    choiceOrder[i][1](parseInt(e.target.value));
                  }}
                  defaultValue={as[i]}
                />
              </div>
            </>
          );
        })}
        <FinishButton
          text="เพิ่มคำถามที่เป็นตัวเลือก"
          onClick={addChoiceQuestion}
        />
        <FinishButton
          text="ลบคำถามที่เป็นตัวเลือก"
          onClick={safeToDeleteChoiceQuestion}
        />
        {textIds.map((v, i) => (
          <>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">คำถาม</label>
              <TextField
                name="Email"
                id="Email"
                className="w-3/5 bg-white rounded-2xl "
                sx={{
                  backgroundColor: "#f5f5f5",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: " 1rem",
                      borderColor: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "#5479FF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#5479FF",
                    },
                  },
                }}
                onChange={(e) => {
                  textQuestions[i][1](e.target.value);
                }}
                defaultValue={textQuestions[i][0]}
              />
            </div>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">คะแนน</label>
              <TextField
                name="Email"
                id="Email"
                type="number"
                className="w-3/5 bg-white rounded-2xl "
                sx={{
                  backgroundColor: "#f5f5f5",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: " 1rem",
                      borderColor: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "#5479FF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#5479FF",
                    },
                  },
                }}
                onChange={(e) => {
                  scores[i][1](parseFloat(e.target.value));
                }}
                defaultValue={scores[i][0]}
              />
            </div>
            <div className="flex flex-row items-center my-5">
              <label className="w-2/5 text-2xl text-white">ลำดับ</label>
              <TextField
                name="Email"
                id="Email"
                type="number"
                className="w-3/5 bg-white rounded-2xl "
                sx={{
                  backgroundColor: "#f5f5f5",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: " 1rem",
                      borderColor: "transparent",
                    },
                    "&:hover fieldset": {
                      borderColor: "#5479FF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#5479FF",
                    },
                  },
                }}
                onChange={(e) => {
                  textOrder[i][1](parseInt(e.target.value));
                }}
                defaultValue={textOrder[i]}
              />
            </div>
          </>
        ))}
        <FinishButton text="เพิ่มคำถามที่พิมพ์ตอบ" onClick={addTextQuestion} />
        <FinishButton
          text="ลบคำถามที่พิมพ์ตอบ"
          onClick={safeToDeleteTextQuestion}
        />
        <div className="flex flex-row justify-end">
          <button
            className="bg-white p-3 font-bold rounded-lg shadow-[10px_10px_10px_-10px_rgba(0,0,0,0.5)] hover:bg-rose-700 hover:text-pink-50"
            style={{
              color: "#961A1D",
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
                      pictureUrls: pictureUrls.filter(notEmpty),
                      open,
                      allDone,
                      registerSheetLink,
                      groupName,
                      peeDataLock,
                      petoDataLock,
                      haveCloth,
                      showCorrectAnswerAndScore,
                    },
                    camp._id,
                    session.user.token
                  );
                  editQuestion(
                    {
                      texts: textIds.map((id, i) => ({
                        _id: id[0],
                        question: textQuestions[i][0],
                        score: scores[i][0],
                        order: textOrder[i][0],
                      })),
                      choices: choiceIds.map((id, i) => ({
                        _id: id[0],
                        question: choiceQuestions[i][0],
                        a: as[i][0],
                        b: bs[i][0],
                        c: cs[i][0],
                        d: ds[i][0],
                        e: es[i][0],
                        scoreA: scoreAs[i][0],
                        scoreB: scoreBs[i][0],
                        scoreC: scoreCs[i][0],
                        scoreD: scoreDs[i][0],
                        scoreE: scoreEs[i][0],
                        correct: corrects[i][0],
                        order: choiceOrder[i][0],
                      })),
                      campId: camp._id,
                    },
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
        {choiceIds.length}
      </div>
    </div>
  );
}
