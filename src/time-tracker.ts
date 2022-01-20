import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import { Readable } from "stream";
import * as utils from "./utils";

const DEBUG = process.env.DEBUG;

export type DaysMinutes = { [key: string]: number };

export class TimeTracker {
  _display_keyed(key: string, day: string, minutes: number): void {
    const display = `${key},${day},${minutes},${utils.displayMinutes(minutes)}`;
    console.log(display);
  }
  displayDaysMinutes(daysMinutes: DaysMinutes): void {
    let biWeeklyMinutes = 0;
    let currentBiWeekly = "";
    Object.keys(daysMinutes).forEach((d) => {
      const month = d.substring(0, 2);
      const year = d.substring(6);
      const dayOfMonth = d.substring(3, 5);
      const nDayOfMonth = parseInt(dayOfMonth);
      // console.log("Month = " + month + ", dayOfMonth = " + dayOfMonth);
      const biWeekly =
        month + "/" + (nDayOfMonth > 15 ? "15" : "01") + "/" + year;
      if (currentBiWeekly !== biWeekly) {
        if (currentBiWeekly !== "") {
          this._display_keyed("Biweekly", currentBiWeekly, biWeeklyMinutes);
        }
        currentBiWeekly = biWeekly;
        biWeeklyMinutes = 0;
      }
      biWeeklyMinutes += daysMinutes[d];
      this._display_keyed("Daily", d, daysMinutes[d]);
    });
    if (currentBiWeekly !== "") {
      this._display_keyed("Biweekly", currentBiWeekly, biWeeklyMinutes);
    }
  }
  async calculateDaysMinutesFromString(content: string): Promise<DaysMinutes> {
    const i = readline.createInterface({
      input: Readable.from(content),
    });
    return this.calculateDaysMinutes(i);
  }
  async calculateDaysMinutes(
    content: readline.Interface
  ): Promise<DaysMinutes> {
    const days: DaysMinutes = {};
    let day: string = "";
    for await (const line of content) {
      // Each line in input.txt will be successively available here as `line`.
      if (DEBUG) {
        console.log(`Line from file: ${line}`);
      }
      const lineTrimmed = line.trim();
      if (lineTrimmed.match(/^# [0-9]+\/[0-9]+\/[0-9]+/)) {
        // read day
        day = utils.parseDay(lineTrimmed);
        days[day] = 0;
      } else if (utils.containsTime(lineTrimmed)) {
        // read hours
        const minutes = utils.parseMinutes(lineTrimmed);
        if (minutes > 24 * 60)
          throw new Error(
            `Current implementation is within a day. Found ${minutes} which is more than 24 hours.`
          );
        days[day] += minutes;
      }
    }
    return days;
  }

  async calculateDaysMinutesFromFile(filePath: string): Promise<DaysMinutes> {
    const is = fs.createReadStream(filePath, "utf8");
    const rl = readline.createInterface({
      input: is,
      crlfDelay: Infinity,
    });
    return this.calculateDaysMinutes(rl);
    // this.displayDaysMinutes(daysMinutes);
  }
}
