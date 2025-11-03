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
export default function Home() {
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg p-4">
        <CardHeader className="flex gap-2">
          <Input placeholder="Adicionar tarefa" />
          <Button variant={"default"} className="cursor-pointer">
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
            <div className=" h-14 flex justify-between items-center border-b-1 border-t-1">
              <div className="w-1 h-full bg-green-300"></div>
              <p className="flex-1 px-2 text-sm">Estudar React</p>
              <div className="flex items-center gap-2">
                <Edit size={14} className="cursor-pointer" />
                <Trash size={14} className="cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListCheck size={18} />
              <p className="text-xs">tarefas concluidas (3/3)</p>
            </div>
            <Button className="text-xs h-7 cursor-pointer" variant={"outline"}>
              <Trash />
              Limpar tarefas concluidas
            </Button>
          </div>
          <div className="h-2 w-ful bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full  bg-blue-500 rounded-md"
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
