import { Badge } from "@/components/ui/badge";
import { Check, List, X } from "lucide-react";

export type FilterType = "all" | "pending" | "completed";

type FilterProps = {
  currentFilter: FilterType;
  setCurrentFilter: React.Dispatch<React.SetStateAction<FilterType>>;
};
const FilterComponent = ({ currentFilter, setCurrentFilter }: FilterProps) => {
  return (
    <div className="flex gap-2">
      <Badge
        className="cursor-pointer"
        variant={currentFilter === "all" ? "default" : "outline"}
        onClick={() => setCurrentFilter("all")}
      >
        <List />
        Todas
      </Badge>
      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "pending" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("pending")}
      >
        <X />
        Não finalizadas
      </Badge>
      <Badge
        className="cursor-pointer"
        variant={`${currentFilter === "completed" ? "default" : "outline"}`}
        onClick={() => setCurrentFilter("completed")}
      >
        <Check />
        Concluidas
      </Badge>
    </div>
  );
};

export default FilterComponent;
