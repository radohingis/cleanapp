import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronDownIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'

export function DateTimeInput(
  { 
    model, 
    dispatch 
  }: { 
    model: string, 
    dispatch: (payload: string) => void
  }
) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>(new Date(model))
  const [timeValue, setTimeValue] = useState<string>(() => {
    const hours = new Date(model).toISOString().substring(11, 13)
    return `${hours}:00:00`
  })

  const handleDateSelect = (selectedDate: Date | undefined): void => {
    if (!selectedDate) return
    
    setDate(selectedDate)
    const [hours, minutes] = timeValue.split(":").map(Number)
    const newDate = new Date(selectedDate)
    newDate.setHours(hours, minutes, 0, 0)
    dispatch(newDate.toISOString())
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTimeValue(e.target.value)
    const [hours, minutes] = e.target.value.split(":").map(Number)
    const newDate = new Date(date)
    newDate.setHours(hours, minutes, 0, 0)
    dispatch(newDate.toISOString())
  }

  return (
    <div className="grid grid-cols-5 gap-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker"
            className="col-span-3 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleDateSelect}
            required={true}
          />
        </PopoverContent>
      </Popover>
      <Input
        type="time"
        id="time-picker"
        step="60"
        value={timeValue}
        onChange={handleTimeChange}
        required={true}
        className="col-span-2 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </div>
  )
}