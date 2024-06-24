import prisma from "@/lib/prisma";


export async function fetchEmails(query: string) {
    const emails = await prisma.user.findMany({
      where: {
        email: {
          contains: query,
          mode: 'insensitive',
        },
      },
      select: { email: true },
      take: 3,
    });
    return emails;
  }
  