import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../../auth/[...nextauth]";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  if (!session) return res.status(401).end();

  try {
    const bookId = String(req.query.bookId);
    const userId = String(session?.user?.id!);

    // Validação do corpo da requisição
    const bodySchema = z.object({
      description: z.string().max(450),
      rating: z.number().min(1).max(5), // Validando 'rating' ao invés de 'rate'
    });

    // Faz o parse do corpo da requisição
    const { description, rating: rate } = bodySchema.parse(req.body);

    // Verifica se o usuário já avaliou o livro
    const userAlreadyRated = await prisma.rating.findFirst({
      where: {
        user_id: userId,
        book_id: bookId,
      },
    });

    if (userAlreadyRated) {
      return res.status(400).json({
        error: "You already rated this book",
      });
    }

    // Cria a nova avaliação
    await prisma.rating.create({
      data: {
        book_id: bookId,
        description,
        rate, // Usa a variável 'rate' após o parse
        user_id: userId,
      },
    });

    return res.status(201).end();
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}
