import { backendUrl } from "@/components/setup";

export default async function addCampName(name: string, token: string) {
  const res = await fetch(`${backendUrl}/admin/addCampName/params/${name}`, {
    method: "POST",cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
