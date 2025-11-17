"use server";
import { prisma } from "@/utils/prisma";

type EditTaskProps = {
  idTask: string;
  neWtask: string;
};

export const editTask = async ({ idTask, neWtask }: EditTaskProps) => {
  try {
    if (!idTask || !neWtask) return;
    const editedTask = await prisma.tasks.update({
      where: {
        id: idTask,
      },
      data: { task: neWtask },
    });

    if (!editTask) return;
  } catch (error) {
    throw error;
  }
};
