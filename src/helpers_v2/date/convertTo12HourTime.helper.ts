export const formatTo12HourTime = (dateLike: string | Date): string => {
  const date = typeof dateLike === 'string' ? new Date(dateLike) : dateLike;
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
