import Link from "next/link";

export default function StringToHtml({ input }: { input: string }) {
  try {
    const url = new URL(input);
    return <Link href={url}>{input}</Link>;
  } catch (e) {
    return <>{input}</>;
  }
}
