// import { validateAuth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: number } }
) {
  try {
    // await validateAuth(request.headers.get("authorization"));

    //조건과 일치하는 데이터들 조회하는 findMany
    const userHistories = await prisma.history.findMany({
      where: {
        authorId: id,
      },
    });

    return new Response(JSON.stringify(userHistories));
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 401,
    });
  }
}
