import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Dialog, DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { Edit } from "lucide-react";
import { Tasks } from "@/lib/generated/prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import { editTask } from "@/actions/edit-task";
type TaskProps = {
  task: Tasks;
  handleGetTasks: () => void;
};

const EditTask = ({ task, handleGetTasks }: TaskProps) => {
  const [editedTask, setEditedTask] = useState(task.task);

  const handleEditTask = async () => {
    try {
      if (editedTask !== task.task) {
        toast.success("Voce pode mandar as informaçoes para o BD");
      } else {
        toast.error("As informaçoes não foram alteradas");
        return;
      }

      await editTask({ idTask: task.id, neWtask: editedTask });

      handleGetTasks();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit size={14} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2">
          <Input
            placeholder="Editar tarefa"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />{" "}
          <Button className="cursor-pointer" onClick={handleEditTask}>
            Editar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
