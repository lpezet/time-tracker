const TIME_REGEX =
  /\[([0-9]+(\:[0-9]{2})?([AP]M))-([0-9]+(:[0-9]{2})?([AP]M))\]/;

export function containsTime(value: string): boolean {
  return value.match(TIME_REGEX) != null;
}
export function parseDay(line: string): string {
  return line.replace("# ", "");
}

export function toMilitaryTime(value: string): number {
  // value is like 5:30

  const apm = value.slice(-2);
  const parts = value.substring(0, value.length - 2).split(":");
  let hours = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);
  if (("PM" === apm && hours < 12) || ("AM" === apm && hours === 12)) {
    hours += 12;
  }
  /*
console.log(
  "toMT: apm = " + apm + ", hours = " + hours + ", minutes = " + minutes
);
*/
  return hours * 100 + minutes;
}

export function militaryTimeToMinutes(value: number): number {
  const hours = (value / 100) >> 0;
  const minutes = value - hours * 100;
  const result = hours * 60 + minutes;
  /*
console.log(
  "value = " +
    value +
    ", hours = " +
    hours +
    ", minutes = " +
    minutes +
    ", result = " +
    result
);
*/
  return result;
}

export function parseMinutes(line: string): number {
  const match = TIME_REGEX.exec(line);
  // console.log(match);
  if (match !== null) {
    const from = match[1];
    const to = match[4];
    const fromMT = toMilitaryTime(from);
    const toMT = toMilitaryTime(to);
    const diff = toMT - fromMT;
    const minutes = militaryTimeToMinutes(diff);
    return minutes;
  }
  throw new Error("Could not parse minutes for [" + line + "]");
}

export function displayMinutes(minutes: number): string {
  const hours = (minutes / 60) >> 0;
  const rminutes = minutes - hours * 60;
  return `${hours} hours ${rminutes} minutes`;
}
