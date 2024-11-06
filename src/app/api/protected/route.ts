import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  // 세션 가져오기
  const session = await getServerSession(authOptions);

  // 인증되지 않은 경우 401 Unauthorized 반환
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // 인증된 사용자에게만 데이터 반환
  return NextResponse.json({
    message: "This is protected data",
    user: session.user,
  });
}
