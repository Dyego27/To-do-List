"use server";
import { prisma } from "@/utils/prisma";

export const getTasks = async () => {
  try {
    const tasks = await prisma.tasks.findMany();

    console.log("Tarefas buscadas no BD:", tasks);

    return tasks;
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);

    throw error;
  }
};
