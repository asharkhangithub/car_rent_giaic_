"use client"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

interface DatePickerProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
}

export default function DatePicker({ selected, onSelect }: DatePickerProps) {
  return <DayPicker mode="single" selected={selected} onSelect={onSelect} className="rounded-md border" />
}

