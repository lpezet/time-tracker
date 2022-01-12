import { program } from "commander";
import { TimeTracker } from "./time-tracker";

const timeTracker = new TimeTracker();
program
  .command("calc <file>")
  .description("Calculate time spent based on time tracking file.")
  .action((file) => {
    timeTracker.calculateDaysMinutesFromFile(file).then((daysMinutes) => {
      timeTracker.displayDaysMinutes(daysMinutes);
    });
  });

program.parse(process.argv);
