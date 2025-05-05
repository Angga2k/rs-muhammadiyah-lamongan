"use client"

import * as React from "react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Clock } from "lucide-react"
import { cn } from "@/Lib/utils"

interface TimePickerProps {
    id?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function TimePicker({ 
    value, 
    onChange, 
    id, 
    placeholder = "Select time",
    className
}: TimePickerProps) {
    const [time, setTime] = React.useState(value || "");
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setTime(value);
    }, [value]);

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;
        setTime(newTime);
        onChange(newTime);
    };

    return (
        <div className={className}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="relative">
                        <Input
                            id={id}
                            value={time}
                            onChange={handleTimeChange}
                            placeholder={placeholder}
                            className="pr-10"
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
                    <div className="p-4">
                        <Input
                            type="time"
                            value={time}
                            onChange={handleTimeChange}
                            className="w-full"
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}