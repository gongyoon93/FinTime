import { buildApiUrl } from "./util";

export async function getHistoryByUser(
  id: number | null,
  accessToken: string | null,
  year: number,
  month: number
) {
  const res = await fetch(
    buildApiUrl(`/api/user/${id}/history?year=${year}&month=${month}`),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const result = await res.json();

  if (!res.ok) {
    return {
      error: result.error,
      status: res.status,
      expired: res.status === 401,
    };
  }

  console.log("result", result);
  return { data: result, status: res.status, expired: false };
}
