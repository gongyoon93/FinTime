import { buildApiUrl } from "./util";

export async function getHistoryByUser(
  id: number | null,
  accessToken: string | null,
  month: number
) {
  const res = await fetch(
    buildApiUrl(`/api/user/${id}/history?month=${month}`),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const result = await res.json();
  console.log("refetch");
  if (!res.ok) {
    return {
      error: result.error,
      status: res.status,
      expired: res.status === 401 ? true : false,
    };
  }

  return { data: result.data, status: res.status, expired: false };
}
