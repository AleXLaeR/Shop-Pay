import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MuiSelect from '@mui/material/Select';

interface SelectProps {
  items: any[];
  label: string;
  handleChange?: (...args: any[]) => void;
}

export default function PropSelect({ label, items, handleChange }: SelectProps) {
  const [curValue, setCurValue] = useState('');

  const onSelectChange = ({ target: { value } }: SelectChangeEvent) => {
    if (handleChange) handleChange(value);
    setCurValue(value);
  };

  return (
    <div className="mt-4 flex items-center gap-2.5">
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="select-label" className="capitalize">
          {label}
        </InputLabel>
        <MuiSelect
          labelId="select-label"
          id="property-select"
          value={curValue}
          label={label}
          autoWidth
          onChange={onSelectChange}
        >
          {items.map((item, idx) => (
            <MenuItem key={item} value={idx} className="flex-between gap-4">
              <span className="min-w-[65px]">{item}</span>
              {label === 'color' && (
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: item }} />
              )}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </div>
  );
}
