import { format, differenceInSeconds } from "date-fns";

export const formatDate = (date: Date): string => {
  return format(date, "yyyy-MM-dd HH:mm:ss");
};

export const calculateTimeTaken = (start: Date, end: Date): string => {
  const seconds = differenceInSeconds(end, start);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}h ${minutes}m ${remainingSeconds}s`;
};
