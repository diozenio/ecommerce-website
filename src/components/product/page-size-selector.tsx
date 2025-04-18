import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Props {
  pageSize: number;
  setPageSize: (size: number) => void;
}

export default function PageSizeSelector({ pageSize, setPageSize }: Props) {
  return (
    <div className="flex justify-end items-center gap-2">
      <Label htmlFor="pageSize" className="text-sm text-muted-foreground">
        Itens por página:
      </Label>
      <Select
        value={String(pageSize)}
        onValueChange={(value) => setPageSize(Number(value))}
      >
        <SelectTrigger id="pageSize" className="w-[100px] h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="8">8</SelectItem>
          <SelectItem value="12">12</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="40">40</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
