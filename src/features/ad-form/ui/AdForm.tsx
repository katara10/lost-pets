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
  onSubmit: (data: FormData) => void;
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

  const handleFormSubmit = (data: AdFormData) => {
    const formData = new FormData();
    formData.append('type', data.type);
    formData.append('species', data.species);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('location', data.location);
    formData.append('date', new Date(data.date).toISOString()); 
    formData.append('contact_phone', data.contact_phone);
    
    if (data.contact_name) {
      formData.append('contact_name', data.contact_name);
    }
    
    if (data.photo) {
      formData.append('photo', data.photo);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
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

        <Controller
          name="photo"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <Button variant="outlined" component="label" color="primary">
              Прикрепить фотографию
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  onChange(file);
                }}
              />
            </Button>
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