"use client";
import { useRouter } from "next/navigation";
import { InterPartFront } from "../../interface";
import FinishButton from "./FinishButton";

export default function AuthPartClient({ parts }: { parts: InterPartFront[] }) {
  const router = useRouter();
  return parts.map((part) => (
    <FinishButton
      text={part.partName}
      onClick={() => {
        router.push(`authPart/${part._id}`);
      }}
    />
  ));
}
