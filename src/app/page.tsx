import { redirect } from "next/navigation";

export default function Home() {
  redirect("/api/auth/signin");
  return <div></div>;
}
