function pad2(value: number) {
  return String(value).padStart(2, "0");
}

function getDatePartsInSeoul(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = formatter.formatToParts(date);
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);

  if (!year || !month || !day) {
    return null;
  }

  return { year, month, day };
}

export function getYmdInSeoul(input: string | Date | null | undefined) {
  if (!input) return "";

  if (typeof input === "string") {
    const matched = input.match(/\d{4}-\d{2}-\d{2}/);
    if (matched) {
      return matched[0];
    }

    const parsed = new Date(input);
    if (Number.isNaN(parsed.getTime())) {
      return "";
    }

    return getYmdInSeoul(parsed);
  }

  if (Number.isNaN(input.getTime())) {
    return "";
  }

  const parts = getDatePartsInSeoul(input);
  if (!parts) {
    return "";
  }

  return `${parts.year}-${pad2(parts.month)}-${pad2(parts.day)}`;
}

export function formatYmdForDisplay(ymd: string, month: "short" | "long" = "short") {
  const match = ymd.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return ymd;

  const [, year, monthNum, day] = match;
  const utcDate = new Date(Date.UTC(Number(year), Number(monthNum) - 1, Number(day)));

  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month,
    day: "numeric",
  }).format(utcDate);
}
