import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

interface MultipleSelectChipProps {
    data: string[];
    receiveJurisdictionChange: (jurData: string[]) => void;
  }
  
  export default function MultipleSelectChip({ data, receiveJurisdictionChange }: MultipleSelectChipProps & { receiveJurisdictionChange: (jurData: string[]) => void; }) {
    const theme = useTheme();
    const [selectedData, setSelectedData] = React.useState<string[]>([]);
  
    const handleChange = (event: SelectChangeEvent<typeof selectedData>) => {
        const {
          target: { value },
        } = event;
        const newSelectedData = typeof value === 'string' ? value.split(',') : value;
        setSelectedData(newSelectedData);
        receiveJurisdictionChange(newSelectedData);
      };
      
  
    return (
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Jurisdictions</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedData}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Jurisdictions" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.map((datas) => (
            <MenuItem
              key={datas}
              value={datas}
              style={getStyles(datas, selectedData, theme)}
            >
              {datas}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
  