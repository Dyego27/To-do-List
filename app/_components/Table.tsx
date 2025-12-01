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
  LoaderCircle,
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
import { updateTaskStatus } from "@/actions/toggle-done";
import EditTask from "./EditTask";
import FilterComponent from "./FilterComponent";
import { FilterType } from "./FilterComponent";
import { deletedCompletedTasks } from "@/actions/clearCompletedTasks";
export default function Table() {
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [filteredTasks, setFilteredTasks] = useState<Tasks[]>([]);
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
    setLoading(true);
    try {
      if (!task.length === 0 || !task) {
        toast.error("Insira uma atividade");
        setLoading(false);
        return;
      }

      const myNewTask = await NewTask(task);

      if (!myNewTask) return;

      toast.success("Atividade adicionada com sucesso !");

      setTaskList((prevTasks) => [...prevTasks, myNewTask]);

      setTask("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
    setLoading(false);
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

  const handleToggleTask = async (taskid: string) => {
    const previousTasks = [...taskList];

    try {
      setTaskList((prev) => {
        const updateTaskList = prev.map((task) => {
          if (task.id === taskid) {
            return {
              ...task,
              done: !task.done,
            };
          } else {
            return task;
          }
        });

        return updateTaskList;
      });
      await updateTaskStatus(taskid);
    } catch (error) {
      setTaskList(previousTasks);
      throw error;
    }
  };

  const clearCompletedTasks = async () => {
    const deletedTasks = await deletedCompletedTasks();
    if (!deletedTasks) return;

    setTaskList(deletedTasks);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      await handleGetTasks();
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    switch (currentFilter) {
      case "all":
        setFilteredTasks(taskList);
        break;
      case "pending":
        const pedingTasks = taskList.filter((task) => !task.done);
        setFilteredTasks(pedingTasks);
        break;
      case "completed":
        const completedTasks = taskList.filter((task) => task.done);
        setFilteredTasks(completedTasks);
        break;
    }
  }, [currentFilter, taskList]);

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
            {loading ? <LoaderCircle className="animate-spin" /> : <PlusIcon />}
            Cadastrar
          </Button>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <FilterComponent
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />
          <div className="mt-4 border-b-1">
            {taskList.length === 0 && (
              <p className="text-xs border-t-2 py-4">
                Você nâo tem nenhuma atividade cadastrada.
              </p>
            )}
            {filteredTasks.map((task) => (
              <div
                className=" h-14 flex justify-between items-center border-b-1 border-t-1 "
                key={task.id}
              >
                <div
                  className={`${
                    task.done
                      ? "w-1 h-full bg-green-400"
                      : "w-1 h-full bg-red-400"
                  }`}
                ></div>
                <p
                  className="flex-1 px-2 text-sm cursor-pointer hover:text-gray-600"
                  onClick={() => handleToggleTask(task.id)}
                >
                  {task.task}
                </p>
                <div className="flex items-center gap-2">
                  <EditTask task={task} handleGetTasks={handleGetTasks} />
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
              <p className="text-xs">
                tarefas concluidas (
                {taskList.filter((task) => !task.done).length}/{taskList.length}
                )
              </p>
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
                    Tem certeza que deseja excluir{" "}
                    {taskList.filter((task) => task.done).length} itens ?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction
                    className="cursor-pointer"
                    onClick={clearCompletedTasks}
                  >
                    Sim
                  </AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="h-2 w-ful bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full  bg-blue-500 rounded-md"
              style={{
                width: `${
                  (taskList.filter((task) => task.done).length /
                    taskList.length) *
                  100
                }`,
              }}
            ></div>
          </div>
          <div className="flex justify-end items-center mt-2 gap-2">
            <Sigma size={18} />
            <p className="text-xs">{taskList.length} tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
