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
import {
  modifyElementInUseStateArray,
  notEmpty,
  removeElementInUseStateArray,
} from "./setup";
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
  const pictureUrls = useState<(string | null)[]>(camp.pictureUrls);
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
  const [choiceIds, setChoiceIds] = useState<(Id | null)[]>(
    questions.choices.map((choice) => choice._id)
  );
  const [choiceQuestions, setChoiceQuestions] = useState(
    questions.choices.map((choice) => choice.question)
  );
  const [as, setAs] = useState(questions.choices.map((choice) => choice.a));
  const [bs, setBs] = useState(questions.choices.map((choice) => choice.b));
  const [cs, setCs] = useState(questions.choices.map((choice) => choice.c));
  const [ds, setDs] = useState(questions.choices.map((choice) => choice.d));
  const [es, setEs] = useState(questions.choices.map((choice) => choice.e));
  const scoreAs = useState(questions.choices.map((choice) => choice.scoreA));
  const scoreBs = useState(questions.choices.map((choice) => choice.scoreB));
  const scoreCs = useState(questions.choices.map((choice) => choice.scoreC));
  const scoreDs = useState(questions.choices.map((choice) => choice.scoreD));
  const scoreEs = useState(questions.choices.map((choice) => choice.scoreE));
  const [corrects, setCorrect] = useState<(Choice | "-")[]>(
    questions.choices.map((choice) => choice.correct)
  );
  const [choiceOrder, setChoiceOrder] = useState(
    questions.choices.map((choice) => choice.order)
  );
  const textQuestions = useState(questions.texts.map((text) => text.question));
  const textIds = useState<(Id | null)[]>(
    questions.texts.map((text) => text._id)
  );
  const scores = useState(questions.texts.map((text) => text.score));
  const textOrder = useState(questions.texts.map((text) => text.score));
  function safeToDeleteTextQuestion() {
    if (textIds[0][textIds.length - 1]) {
      return;
    }
    textQuestions[1](textQuestions[0].filter(removeElementInUseStateArray));
    textIds[1](textIds[0].filter(removeElementInUseStateArray));
    scores[1](scores[0].filter(removeElementInUseStateArray));
    textOrder[1](textOrder[0].filter(removeElementInUseStateArray));
  }
  function safeToDeleteChoiceQuestion() {
    if (choiceIds[choiceIds.length - 1]) {
      return;
    }
    setChoiceIds(choiceIds.filter(removeElementInUseStateArray));
    setChoiceQuestions(choiceQuestions.filter(removeElementInUseStateArray));
    setAs(as.filter(removeElementInUseStateArray));
    setBs(bs.filter(removeElementInUseStateArray));
    setCs(cs.filter(removeElementInUseStateArray));
    setDs(ds.filter(removeElementInUseStateArray));
    setEs(es.filter(removeElementInUseStateArray));
    scoreAs[1](scoreAs[0].filter(removeElementInUseStateArray));
    scoreBs[1](scoreBs[0].filter(removeElementInUseStateArray));
    scoreCs[1](scoreCs[0].filter(removeElementInUseStateArray));
    scoreDs[1](scoreDs[0].filter(removeElementInUseStateArray));
    scoreEs[1](scoreEs[0].filter(removeElementInUseStateArray));
    setCorrect(corrects.filter(removeElementInUseStateArray));
    setChoiceOrder(choiceOrder.filter(removeElementInUseStateArray));
  }
  function addTextQuestion() {
    textIds[1]([...textIds[0], null]);
    textQuestions[1]([...textQuestions[0], "-"]);
    scores[1]([...scores[0], 0]);
    textOrder[1]([...textOrder[0], 0]);
  }
  function addChoiceQuestion() {
    setChoiceIds([...choiceIds, null]);
    setChoiceQuestions([...choiceQuestions, "-"]);
    setAs([...as, "-"]);
    setBs([...bs, "-"]);
    setCs([...cs, "-"]);
    setDs([...ds, "-"]);
    setEs([...es, "-"]);
    scoreAs[1]([...scoreAs[0], 0]);
    scoreBs[1]([...scoreBs[0], 0]);
    scoreCs[1]([...scoreCs[0], 0]);
    scoreDs[1]([...scoreDs[0], 0]);
    scoreEs[1]([...scoreEs[0], 0]);
    setCorrect([...corrects, "-"]);
    setChoiceOrder([...choiceOrder, 0]);
  }
  const { data: session } = useSession();
  if (!session) {
    return <BackToHome />;
  }
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
          {pictureUrls[0].map((pictureUrl, i) => (
            <TypingImageSource
              onChange={function (imgSrc: string | null): void {
                pictureUrls[1](
                  pictureUrls[0].map(modifyElementInUseStateArray(imgSrc, i))
                );
              }}
              defaultSrc={pictureUrl}
            />
          ))}
        </div>
        <FinishButton
          text="add photo"
          onClick={() => {
            pictureUrls[1]([...pictureUrls[0]]);
          }}
        />
        <FinishButton
          text="remove photo"
          onClick={() => {
            pictureUrls[1](pictureUrls[0].filter(removeElementInUseStateArray));
          }}
        />
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
          function getChooseChoice(input: Choice | "-"): string {
            var chooseChoice: string;
            switch (input) {
              case "A": {
                chooseChoice = as[i];
                break;
              }
              case "B": {
                chooseChoice = bs[i];
                break;
              }
              case "C": {
                chooseChoice = cs[i];
                break;
              }
              case "D": {
                chooseChoice = ds[i];
                break;
              }
              case "E": {
                chooseChoice = es[i];
                break;
              }
              case "-": {
                chooseChoice = "-";
                break;
              }
            }
            return chooseChoice;
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
                    setChoiceQuestions(
                      choiceQuestions.map(
                        modifyElementInUseStateArray(e.target.value, i)
                      )
                    );
                  }}
                  defaultValue={choiceQuestions[i]}
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
                    setAs(
                      as.map(modifyElementInUseStateArray(e.target.value, i))
                    );
                  }}
                  defaultValue={as[i]}
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
                    setBs(
                      bs.map(modifyElementInUseStateArray(e.target.value, i))
                    );
                  }}
                  defaultValue={bs[i]}
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
                    setCs(
                      cs.map(modifyElementInUseStateArray(e.target.value, i))
                    );
                  }}
                  defaultValue={cs[i]}
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
                    setDs(
                      ds.map(modifyElementInUseStateArray(e.target.value, i))
                    );
                  }}
                  defaultValue={ds[i]}
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
                    setEs(
                      es.map(modifyElementInUseStateArray(e.target.value, i))
                    );
                  }}
                  defaultValue={es[i]}
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
                    scoreAs[1](
                      scoreAs[0].map(
                        modifyElementInUseStateArray(
                          parseFloat(e.target.value),
                          i
                        )
                      )
                    );
                  }}
                  defaultValue={scoreAs[0][i].toString()}
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
                    scoreBs[1](
                      scoreBs[0].map(
                        modifyElementInUseStateArray(
                          parseFloat(e.target.value),
                          i
                        )
                      )
                    );
                  }}
                  defaultValue={scoreBs[0][i]}
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
                    scoreCs[1](
                      scoreCs[0].map(
                        modifyElementInUseStateArray(
                          parseFloat(e.target.value),
                          i
                        )
                      )
                    );
                  }}
                  defaultValue={scoreCs[0][i]}
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
                    scoreDs[1](
                      scoreDs[0].map(
                        modifyElementInUseStateArray(
                          parseFloat(e.target.value),
                          i
                        )
                      )
                    );
                  }}
                  defaultValue={scoreDs[i]}
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
                    scoreEs[1](
                      scoreEs[0].map(
                        modifyElementInUseStateArray(
                          parseFloat(e.target.value),
                          i
                        )
                      )
                    );
                  }}
                  defaultValue={scoreEs[0][i]}
                />
              </div>
              <div>เลือกตัวเลือกที่ถูกต้อง</div>
              <Select
                defaultValue={getChooseChoice(corrects[i])}
                variant="standard"
                name="location"
                id="location"
                className="h-[2em] w-[200px] mb-5 text-white"
              >
                <MenuItem
                  onClick={() => {
                    setCorrect(
                      corrects.map(
                        modifyElementInUseStateArray<Choice | "-">("A", i)
                      )
                    );
                  }}
                  value={`A ${as[i]}`}
                >
                  A {as[i]}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setCorrect(
                      corrects.map(
                        modifyElementInUseStateArray<Choice | "-">("B", i)
                      )
                    );
                  }}
                  value={`B ${bs[i]}`}
                >
                  B {bs[i]}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setCorrect(
                      corrects.map(
                        modifyElementInUseStateArray<Choice | "-">("C", i)
                      )
                    );
                  }}
                  value={`C ${cs[i]}`}
                >
                  C {cs[i]}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setCorrect(
                      corrects.map(
                        modifyElementInUseStateArray<Choice | "-">("D", i)
                      )
                    );
                  }}
                  value={`D ${ds[i]}`}
                >
                  D {ds[i]}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setCorrect(
                      corrects.map(
                        modifyElementInUseStateArray<Choice | "-">("E", i)
                      )
                    );
                  }}
                  value={`E ${es[i]}`}
                >
                  E {es[i]}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setCorrect(
                      corrects.map(
                        modifyElementInUseStateArray<Choice | "-">("-", i)
                      )
                    );
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
                    setChoiceOrder(
                      choiceOrder.map(
                        modifyElementInUseStateArray(
                          parseInt(e.target.value),
                          i
                        )
                      )
                    );
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
        {textIds[0].map((v, i) => (
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
                  textQuestions[1](
                    textQuestions[0].map(
                      modifyElementInUseStateArray(e.target.value, i)
                    )
                  );
                }}
                defaultValue={textQuestions[0][i]}
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
                  scores[1](
                    scores[0].map(
                      modifyElementInUseStateArray(
                        parseFloat(e.target.value),
                        i
                      )
                    )
                  );
                }}
                defaultValue={scores[0][i]}
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
                  textOrder[1](
                    textOrder[0].map(
                      modifyElementInUseStateArray(parseInt(e.target.value), i)
                    )
                  );
                }}
                defaultValue={textOrder[0][i]}
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
                      pictureUrls: pictureUrls[0].filter(notEmpty),
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
                      texts: textIds[0].map((_id, i) => ({
                        _id,
                        question: textQuestions[0][i],
                        score: scores[0][i],
                        order: textOrder[0][i],
                      })),
                      choices: choiceIds.map((_id, i) => ({
                        _id,
                        question: choiceQuestions[i],
                        a: as[i],
                        b: bs[i],
                        c: cs[i],
                        d: ds[i],
                        e: es[i],
                        scoreA: scoreAs[0][i],
                        scoreB: scoreBs[0][i],
                        scoreC: scoreCs[0][i],
                        scoreD: scoreDs[0][i],
                        scoreE: scoreEs[0][i],
                        correct: corrects[i],
                        order: choiceOrder[i],
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
      </div>
    </div>
  );
}
