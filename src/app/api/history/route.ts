// import { validateAuth } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

interface RequestBody {
  amount: number;
  content: string;
  transaction: "INCOME" | "EXPENSE" | "TRANSFER";
}

export async function POST(request: Request) {
  try {
    // await validateAuth(request.headers.get("authorization"));

    const body: RequestBody = await request.json();

    const history = await prisma.history.create({
      data: {
        authorId: 1,
        amount: body.amount,
        content: body.content,
        transaction: body.transaction,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const result = history;
    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 401,
    });
  }
}
