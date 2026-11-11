import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  TextField, 
  Button, 
  MenuItem, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  FormHelperText
} from '@mui/material';
import { adFormSchema, type AdFormData } from '../model/schema';
import { SPECIES_OPTIONS } from '../../../shared/config/constants';

interface AdFormProps {
  onSubmit: (data: AdFormData) => void;
  isSubmitting?: boolean;
}

export const AdForm = ({ onSubmit, isSubmitting = false }: AdFormProps) => {
  const { control, handleSubmit, formState: { errors } } = useForm<AdFormData>({
    resolver: zodResolver(adFormSchema),
    defaultValues: { 
      type: 'lost', 
      species: '', 
      name: '', 
      description: '', 
      location: '', 
      date: '', 
      contact_phone: '', 
      contact_name: '' 
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* 1. Тип объявления */}
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.type}>
              <FormLabel>Тип объявления</FormLabel>
              <RadioGroup row {...field}>
                <FormControlLabel value="lost" control={<Radio />} label="Потеряно" />
                <FormControlLabel value="found" control={<Radio />} label="Найдено" />
              </RadioGroup>
              <FormHelperText>{errors.type?.message}</FormHelperText>
            </FormControl>
          )}
        />

        {/* 2. Вид животного */}
        <Controller
          name="species"
          control={control}
          render={({ field }) => (
            <TextField 
              {...field} 
              select 
              label="Вид животного" 
              error={!!errors.species} 
              helperText={errors.species?.message}
            >
              {SPECIES_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* 3. Кличка */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField 
              {...field} 
              label="Кличка животного" 
              error={!!errors.name} 
              helperText={errors.name?.message} 
            />
          )}
        />

        {/* 4. Описание */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField 
              {...field} 
              label="Описание (приметы, особенности)" 
              multiline 
              rows={4} 
              error={!!errors.description} 
              helperText={errors.description?.message} 
            />
          )}
        />

        {/* 5. Место */}
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <TextField 
              {...field} 
              label="Место (адрес или район)" 
              error={!!errors.location} 
              helperText={errors.location?.message} 
            />
          )}
        />

        {/* 6. Дата */}
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <TextField 
              {...field} 
              type="date" 
              label="Дата пропажи/находки" 
              slotProps={{ inputLabel: { shrink: true } }}
              error={!!errors.date} 
              helperText={errors.date?.message} 
            />
          )}
        />

        {/* 7. Телефон */}
        <Controller
          name="contact_phone"
          control={control}
          render={({ field }) => (
            <TextField 
              {...field} 
              label="Контактный телефон" 
              placeholder="+7 (999) 123-45-67" 
              error={!!errors.contact_phone} 
              helperText={errors.contact_phone?.message} 
            />
          )}
        />

        {/* 8. Имя контакта */}
        <Controller
          name="contact_name"
          control={control}
          render={({ field }) => (
            <TextField 
              {...field} 
              label="Ваше имя (необязательно)" 
              error={!!errors.contact_name} 
              helperText={errors.contact_name?.message} 
            />
          )}
        />

        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Сохранение...' : 'Сохранить объявление'}
        </Button>
        
      </div>
    </form>
  );
};