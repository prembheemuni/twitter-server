import { PrismaClient } from "@prisma/client";

// it will display queries when any operation performed on db
export const prismaClient = new PrismaClient({ log: ["query"] });
