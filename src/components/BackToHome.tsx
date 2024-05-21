"use client";
import { useRouter } from "next/navigation";

export default function BackToHome() {
  const router = useRouter();
  router.push("/");
  return <></>;
}
