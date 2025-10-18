import { create } from "zustand";

interface CalendarState {
  startDate: Date | null;
  endDate: Date | null;
  currentDate: Date;
  defaultDate: Date;
  today: Date;

  isCalendarOpen: boolean;
}

interface CalendarActions {
  resetToggleCalendar: () => void;
  toggleCalendar: () => void;

  setToday: (date: Date) => void;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;

  isDisabledDate: (date: Date) => boolean;
  isSameDate: (date1: Date | null, date2: Date | null) => boolean;
  updateDates: (newStartDate: Date | null, newEndDate: Date | null) => void;

  monthToggle: (newDate: Date) => void;
  dateClick: (clickedDateNumber: number) => void;
  moveMonth: (direction: "next" | "prev") => void;
  createClickedDate: (dayToRender: number) => Date;
}

export const useCalendarStore = create<CalendarState & CalendarActions>((set, get) => ({
  startDate: null,
  endDate: null,
  currentDate: new Date(),
  defaultDate: new Date(2025, 0, 1),
  today: new Date(),
  isCalendarOpen: false,

  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setToday: (date) => set({ today: date }),

  isSameDate: (date1, date2) =>
    date1 instanceof Date && date2 instanceof Date && date1.getTime() === date2.getTime(),

  isDisabledDate: (clickedDate) => {
    const { currentDate } = get();
    return clickedDate > currentDate;
  },

  updateDates: (newStartDate, newEndDate) => {
    set({
      startDate: newStartDate,
      endDate: newEndDate,
    });
  },

  moveMonth: (direction: "next" | "prev") => {
    const { today, currentDate, defaultDate } = get();

    const newDate = new Date(
      today.getFullYear(),
      today.getMonth() + (direction === "next" ? 1 : -1),
      today.getDate()
    );

    if (newDate >= defaultDate && newDate <= currentDate) {
      set({ today: newDate });
    }
  },

  createClickedDate: (dayToRender) => {
    const { today } = get();
    return new Date(today.getFullYear(), today.getMonth(), dayToRender);
  },

  dateClick: (clickedDateNumber) => {
    const {
      createClickedDate,
      isDisabledDate,
      isSameDate,
      updateDates,
      startDate,
      endDate,
      currentDate,
    } = get();

    const clickedDate = createClickedDate(clickedDateNumber);

    if (isDisabledDate(clickedDate)) {
      return;
    }

    if (!startDate) {
      updateDates(clickedDate, null);
    } else if (endDate) {
      updateDates(clickedDate, null);
    } else if (isSameDate(clickedDate, startDate)) {
      updateDates(clickedDate, clickedDate);
    } else if (clickedDate < startDate || clickedDate < currentDate) {
      updateDates(clickedDate, startDate);
    } else {
      updateDates(null, null);
    }
  },

  monthToggle: (newDate) =>
    set((state) => {
      if (newDate >= state.defaultDate && newDate <= state.currentDate) {
        return { today: newDate };
      }
      return state;
    }),

  resetToggleCalendar: () =>
    set(() => ({
      startDate: null,
      endDate: null,
      isCalendarOpen: false,
    })),

  toggleCalendar: () =>
    set((state) => ({
      isCalendarOpen: !state.isCalendarOpen,
    })),
}));
