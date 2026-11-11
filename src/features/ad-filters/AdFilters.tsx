import { TextField, MenuItem } from '@mui/material';
import type { AdFilters as AdFiltersType } from '../../entities/ad/types';
import { SPECIES_OPTIONS } from '../../shared/config/constants';

interface AdFiltersProps {
  filters: AdFiltersType;
  onChange: (newFilters: AdFiltersType) => void;
}

export const AdFilters = ({ filters, onChange }: AdFiltersProps) => {
  
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ 
      ...filters, 
      type: event.target.value as AdFiltersType['type'] 
    });
  };

  const handleSpeciesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ 
      ...filters, 
      species: event.target.value 
    });
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '16px', 
      marginBottom: '24px', 
      flexWrap: 'wrap',
      backgroundColor: '#f5f5f5',
      padding: '16px',
      borderRadius: '8px'
    }}>
      
      {/* Фильтр по типу */}
      <TextField
        select
        label="Тип объявления"
        value={filters.type}
        onChange={handleTypeChange}
        size="small"
        style={{ minWidth: '200px', backgroundColor: '#fff' }}
      >
        <MenuItem value="all">Все</MenuItem>
        <MenuItem value="lost">Потеряно</MenuItem>
        <MenuItem value="found">Найдено</MenuItem>
      </TextField>

      {/* Фильтр по виду животного */}
      <TextField
        select
        label="Вид животного"
        value={filters.species}
        onChange={handleSpeciesChange}
        size="small"
        style={{ minWidth: '200px', backgroundColor: '#fff' }}
      >
        <MenuItem value="all">Все</MenuItem>
        {SPECIES_OPTIONS.map((species) => (
          <MenuItem key={species} value={species}>
            {species}
          </MenuItem>
        ))}
      </TextField>

    </div>
  );
};