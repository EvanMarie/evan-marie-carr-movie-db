export default function FormatDate({
  inputDate,
  format = "number",
  dateOnly = false,
  fullYear = true, // Set default to true for full year
  fileNameFormat = false,
}: {
  inputDate: Date | string | null | undefined;
  format?: "text" | "number";
  dateOnly?: boolean;
  fullYear?: boolean;
  fileNameFormat?: boolean;
}): string {
  if (!inputDate) {
    return "Invalid Date";
  }

  const date = new Date(inputDate);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const year = fullYear
    ? date.getFullYear().toString()
    : date.getFullYear().toString().slice(-2);

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  if (fileNameFormat) {
    return `${month}-${day}-${year}`;
  }

  if (dateOnly) {
    if (format === "text") {
      const datePart = new Intl.DateTimeFormat("en-US", {
        month: "long", // Full month name
        day: "2-digit",
        year: "numeric", // Full year
      }).format(date);
      return datePart;
    }
    return `${month}/${day}/${year}`;
  }

  if (format === "number") {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${month}/${day}/${year} ${formattedHour}:${formattedMinutes} ${ampm}`;
  } else {
    const datePart = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date);

    const timePart = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);

    return `${datePart} ${timePart}`;
  }
}
