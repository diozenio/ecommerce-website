import { LoaderCircle } from "lucide-react";

export default function Spinner() {
  return (
    <LoaderCircle
      className="animate-spin"
      size={40}
      color="var(--color-border)"
    />
  );
}
