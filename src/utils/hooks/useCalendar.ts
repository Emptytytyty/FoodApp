import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  interval,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useState } from "react";

export const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval(interval(startDate, endDate));

  return {currentMonth, nextMonth, prevMonth, days};
};
