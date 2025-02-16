"use client"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

interface ClientCalendarProps {
  selected: Date | undefined
  onSelect: (date: Date | undefined) => void
}

export default function ClientCalendar({ selected, onSelect }: ClientCalendarProps) {
  return <DayPicker mode="single" selected={selected} onSelect={onSelect} className="rounded-md border" />
}

