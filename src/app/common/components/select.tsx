"use client";

import { Select as ChakraSelect } from "@chakra-ui/react";
import { FC } from "react";

interface IOption {
  value: string;
  name: string;
}

interface SelectOptions {
  options?: IOption[];
  value: string;
  onChange(value: string): void;
  placeholder: string;
}

export const Select: FC<SelectOptions> = ({
  onChange,
  options = [],
  value,
  placeholder = "Select option",
}) => {
  return (
    <ChakraSelect
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    >
      {options.map((elem) => (
        <option key={elem.value} value={elem.value}>
          {elem.name}
        </option>
      ))}
    </ChakraSelect>
  );
};
