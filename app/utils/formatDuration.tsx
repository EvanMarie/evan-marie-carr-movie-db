export default function FormatDuration(duration: string): string {
  const match = duration.match(
    /P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
  );

  if (!match) return "Invalid duration";

  const [, days, hours, minutes, seconds] = match;

  const formattedDuration = [
    days ? `${days} day${days !== "1" ? "s" : ""}` : "",
    hours ? `${hours} hour${hours !== "1" ? "s" : ""}` : "",
    minutes ? `${minutes} minute${minutes !== "1" ? "s" : ""}` : "",
    seconds ? `${seconds} second${seconds !== "1" ? "s" : ""}` : "",
  ]
    .filter(Boolean)
    .join(", ");

  return formattedDuration || "0 minutes";
}
