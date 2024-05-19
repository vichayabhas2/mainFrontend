"use client";
import { useRouter } from "next/navigation";

export default function PushToCamps() {
  const router = useRouter();
  router.push("/camp/");
  return <></>;
}
