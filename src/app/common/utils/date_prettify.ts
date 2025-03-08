export const datePrettify = (dt: string | Date) => {
  if (!dt) return "-";
  const date = new Date(dt);
  return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;
};
