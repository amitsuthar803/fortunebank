const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours ? hours : 12; // If the hour is 0, set it to 12 (midnight or noon)

  return `${hours.toString().padStart(2, "0")} : ${minutes} ${ampm}`;
}

export function formatShortMonthDate(date) {
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
}

export function formatDateWithYear(date) {
  const day = date.getDate();
  const month = months[date.getMonth()]; // getMonth() returns 0-11
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
