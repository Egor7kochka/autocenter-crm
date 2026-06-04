import { useState } from "react";
import { Part } from "../types/part";

export const useParts = () => {
  const [parts, setParts] = useState<Part[]>([]);

  return {
    parts,
    setParts,
  };
};