import { Combobox } from "@/shared/ui";
import { AKWA_IBOM_LGAS } from "@/features/voting/data/mock-candidates";
import { ALL_LGAS } from "@/features/voting/constants";

const OPTIONS = [ALL_LGAS, ...AKWA_IBOM_LGAS];

export interface LgaFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function LgaFilter({ value, onChange }: LgaFilterProps) {
  return (
    <Combobox
      value={value}
      onValueChange={onChange}
      options={OPTIONS}
      placeholder={ALL_LGAS}
      searchPlaceholder="Search LGAs…"
      emptyMessage="No LGA found"
    />
  );
}
