export async function getHistoryByUser(
  id: number,
  accessToken: string,
  month?: number
) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/user/${id}/history?month=${month}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return await res.json();
}
