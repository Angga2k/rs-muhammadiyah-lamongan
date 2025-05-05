"use client"

import * as React from "react"
import { format, parse } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Clock, AlertCircle } from "lucide-react"
import { cn } from "@/Lib/utils"

interface TimeRangePickerProps {
  value: { start: string; end: string }
  onChange: (value: { start: string; end: string }) => void
  id?: string
  placeholder?: string
  className?: string
}

export function TimeRangePicker({ 
  value, 
  onChange, 
  id, 
  placeholder = "Select time range",
  className
}: TimeRangePickerProps) {
  const [timeRange, setTimeRange] = React.useState(value || { start: "", end: "" })
  const [open, setOpen] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const parseTime = (timeString: string) => {
    return parse(timeString, 'HH:mm', new Date())
  }

  const handleTimeChange = (type: 'start' | 'end') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    const newTimeRange = { ...timeRange, [type]: newValue }
    
    if (newTimeRange.start && newTimeRange.end) {
      const startTime = parseTime(newTimeRange.start)
      const endTime = parseTime(newTimeRange.end)
      
      if (endTime <= startTime) {
        setError("End time must be after start time")
      } else {
        setError(null)
      }
    } else {
      setError(null)
    }
    
    setTimeRange(newTimeRange)
    onChange(newTimeRange)
  }

  const handleSelectNow = () => {
    const now = new Date()
    const formattedTime = format(now, 'HH:mm')
    const newTimeRange = { 
      start: formattedTime, 
      end: format(new Date(now.getTime() + 60 * 60 * 1000), 'HH:mm') // +1 hour
    }
    setTimeRange(newTimeRange)
    onChange(newTimeRange)
    setError(null)
  }

  const handleApply = () => {
    if (!error) {
      setOpen(false)
    }
  }

  return (
    <div className={cn("space-y-1", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              id={id}
              value={`${timeRange.start} - ${timeRange.end}`}
              readOnly
              placeholder={placeholder}
              className={cn("pr-10", error && "border-destructive")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
            >
              <Clock className="h-4 w-4 opacity-50" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`${id}-start-time`}>Start Time</Label>
                <Input
                  id={`${id}-start-time`}
                  type="time"
                  value={timeRange.start}
                  onChange={handleTimeChange('start')}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-end-time`}>End Time</Label>
                <Input
                  id={`${id}-end-time`}
                  type="time"
                  value={timeRange.end}
                  onChange={handleTimeChange('end')}
                  className="w-full"
                />
              </div>
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleSelectNow}
              >
                Set Current
              </Button>
              <Button
                type="button"
                className="flex-1"
                onClick={handleApply}
                disabled={!!error}
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-sm text-destructive flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  )
}