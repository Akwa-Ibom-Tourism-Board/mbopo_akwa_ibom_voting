import styled from "styled-components";
import { Search } from "lucide-react";
import { Input } from "@/shared/ui";

const Frame = styled.div`
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 14px;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.muted.foreground};
    pointer-events: none;
  }

  input {
    padding-left: 2.5rem;
  }
`;

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Frame>
      <Search size={18} aria-hidden />
      <Input
        type="search"
        value={value}
        placeholder="Search by candidate name or LGA"
        aria-label="Search candidates by name or LGA"
        onChange={(event) => onChange(event.target.value)}
      />
    </Frame>
  );
}
