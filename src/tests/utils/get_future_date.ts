import { setYear, parseISO } from 'date-fns'

export default function getFutureDate(date: string): Date {
  return setYear(parseISO(date), new Date().getFullYear() + 1)
} 