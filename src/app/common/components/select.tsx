"use client";

import { Select as ChakraSelect } from "@chakra-ui/react";
import { FC } from "react";

interface IOption {
  value: string;
  name: string;
}

export const Select: FC<{
  options?: IOption[];
  value: string;
  onChange(value: string): void;
}> = ({ onChange, options = [], value }) => {
  return (
    <ChakraSelect
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Select option"
    >
      {options.map((elem) => (
        <option key={elem.value} value={elem.value}>
          {elem.name}
        </option>
      ))}
    </ChakraSelect>
  );
};
