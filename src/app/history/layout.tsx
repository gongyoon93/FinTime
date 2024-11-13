import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import HistoryPage from "./page";

export default async function HistoryLayout() {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    !session.user ||
    !session.user.id ||
    !session.user.accessToken
  ) {
    throw new Error("User is not authenticated or access token is missing.");
  }

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/history/user/${session?.user.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const histories = await res.json();

  return <HistoryPage histories={histories} />;
}
