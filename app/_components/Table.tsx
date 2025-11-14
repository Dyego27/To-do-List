"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  Edit,
  List,
  ListCheck,
  PlusIcon,
  Sigma,
  Trash,
  X,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { getTasks } from "@/actions/get-tasks-from-bd";
import { useEffect, useState } from "react";
import { Tasks } from "@/lib/generated/prisma/client";
import { NewTask } from "@/actions/add-task";
import { deleteTask } from "@/actions/delete-task";
import { toast } from "sonner";
export default function Table() {
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");

  console.log(task);

  const handleGetTasks = async () => {
    try {
      const tasks = await getTasks();

      if (tasks && tasks.length > 0) {
        setTaskList(tasks);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleAddTask = async () => {
    try {
      if (!task.trim()) return;

      const myNewTask = await NewTask(task);

      if (!myNewTask) return;

      toast.success("Atividade adicionada com sucesso !");

      setTaskList((prevTasks) => [...prevTasks, myNewTask]);

      setTask("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      if (!id) return;

      const deletedTask = await deleteTask(id);
      if (!deletedTask) return;
      toast.warning("Atividade excluida com sucesso !");
      await handleGetTasks();
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    const fetchTasks = async () => {
      await handleGetTasks();
    };

    fetchTasks();
  }, []);

  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg p-4">
        <CardHeader className="flex gap-2">
          <Input
            placeholder="Adicionar tarefa"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button
            variant={"default"}
            className="cursor-pointer"
            onClick={handleAddTask}
          >
            {" "}
            <PlusIcon /> Cadastrar
          </Button>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <div className="flex gap-2">
            <Badge className="cursor-pointer" variant={"outline"}>
              <List />
              Todas
            </Badge>
            <Badge className="cursor-pointer" variant={"outline"}>
              <X />
              Não finalizadas
            </Badge>
            <Badge className="cursor-pointer" variant={"outline"}>
              <Check />
              Concluidas
            </Badge>
          </div>
          <div className="mt-4 border-b-1">
            {taskList.map((task) => (
              <div
                className=" h-14 flex justify-between items-center border-b-1 border-t-1 "
                key={task.id}
              >
                <div className="w-1 h-full bg-green-300"></div>
                <p className="flex-1 px-2 text-sm">{task.task}</p>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Edit size={14} className="cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Tarefa</DialogTitle>
                      </DialogHeader>
                      <div className="flex gap-2">
                        <Input placeholder="Editar tarefa" />
                        <Button className="cursor-pointer">Editar</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Trash
                    size={14}
                    className="cursor-pointer"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListCheck size={18} />
              <p className="text-xs">tarefas concluidas (3/3)</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="text-xs h-7 cursor-pointer"
                  variant={"outline"}
                >
                  <Trash />
                  Limpar tarefas concluidas
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja excluir x itens ?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Continue</AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="h-2 w-ful bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full  bg-blue-500 rounded-md"
              style={{
                width: "50%",
              }}
            ></div>
          </div>
          <div className="flex justify-end items-center mt-2 gap-2">
            <Sigma size={18} />
            <p className="text-xs">3 tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
