import { createInterface } from "readline";
import { Readable } from "stream";
import { DaysMinutes, TimeTracker } from "../src/time-tracker";
import { assert } from "chai";
import * as fs from "fs";
import * as path from "path";

describe("time-tracker", function () {
  beforeEach(function (done: () => void) {
    done();
  });

  afterEach(function (done: () => void) {
    done();
  });

  it("from_noon_to_pm", function (done) {
    const tt = new TimeTracker();
    const basic = `
    # 01/06/2022
    - [12:00PM-2:23PM] Something good
    `;
    tt.calculateDaysMinutesFromString(basic)
      .then((actual) => {
        assert.isNotNull(actual);
        // console.log(actual);
        assert.deepEqual(actual, {
          "01/06/2022": 143,
        });
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  // WARNING: not supported.
  it("from_midnight_to_midnight", function (done) {
    const tt = new TimeTracker();
    const basic = `
    # 01/06/2022
    - [12:05AM-12:29AM] Something good
    `;
    tt.calculateDaysMinutesFromString(basic)
      .then((actual) => {
        assert.isNotNull(actual);
        // console.log(actual);
        assert.deepEqual(actual, {
          "01/06/2022": 24,
        });
        done(
          new Error(
            "Was not supported before. Test need to be updated or something else happened?"
          )
        );
      })
      .catch((e) => {
        done();
      });
  });

  it("from_midnight_to_am", function (done) {
    const tt = new TimeTracker();
    const basic = `
    # 01/06/2022
    - [12:05AM-1:32AM] Something good
    `;
    tt.calculateDaysMinutesFromString(basic)
      .then((actual) => {
        assert.isNotNull(actual);
        // console.log(actual);
        assert.deepEqual(actual, {
          "01/06/2022": 87,
        });
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it("to_midnight", function (done) {
    const tt = new TimeTracker();
    const basic = `
    # 01/06/2022
    - [10:00PM-12:29AM] Something good
    `;
    tt.calculateDaysMinutesFromString(basic)
      .then((actual) => {
        assert.isNotNull(actual);
        // console.log(actual);
        assert.deepEqual(actual, {
          "01/06/2022": 149,
        });
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it("to_noon", function (done) {
    const tt = new TimeTracker();
    const basic = `
    # 01/06/2022
    - [10:00AM-12:30PM] Something good
    `;
    tt.calculateDaysMinutesFromString(basic)
      .then((actual) => {
        assert.isNotNull(actual);
        // console.log(actual);
        assert.deepEqual(actual, {
          "01/06/2022": 150,
        });
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it("fromStream", function (done) {
    const tt = new TimeTracker();

    const basic = `
    # 01/06/2022
    - [8:00AM-9:30AM] Something good
    # 01/08/2022
    - [8:00AM-8:03AM] Three minutes only.
    `;
    const i = createInterface({
      input: Readable.from(basic),
    });
    tt.calculateDaysMinutes(i)
      .then((actual) => {
        assert.isNotNull(actual);
        // console.log(actual);
        assert.deepEqual(actual, {
          "01/06/2022": 90,
          "01/08/2022": 3,
        });
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it("displayDaysMinutes", function (done) {
    const daysMinutes: DaysMinutes = {
      "01/06/2022": 90,
      "01/08/2022": 3,
      "01/23/2022": 257,
      "01/24/2022": 134,
    };
    const tt = new TimeTracker();
    tt.displayDaysMinutes(daysMinutes);
    done();
  });
  it("file", function (done) {
    const file = path.join(__dirname, "test.md");
    const tt = new TimeTracker();
    tt.calculateDaysMinutesFromFile(file)
      .then((actual) => {
        assert.isNotNull(actual);
        // console.log(actual);
        assert.deepEqual(actual, {
          "01/06/2022": 200,
          "01/07/2022": 355,
        });
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it("bug001", function (done) {
    const tt = new TimeTracker();

    const bug = `
    # 01/19/2022

    - [9:30AM-10:30AM] Deep dive with Xing in POW ETL. Getting more read-only access to systems.
    - [10:30AM-11:00AM] Notes on POW ETL.
    - [4:00PM-5:30PM] Looking into Twilio TaskRouter and testing it for Telemed. Looked into Twilio FlexUI as well.
    - [6:30PM-10:00PM] Data Flow Diagram for merging of customer and purchase data.
    `;

    tt.calculateDaysMinutesFromString(bug)
      .then((actual) => {
        assert.isNotNull(actual);
        // console.log(actual);
        assert.deepEqual(actual, {
          "01/19/2022": 390,
        });
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it("basic", function (done) {
    const tt = new TimeTracker();

    const basic = `
    # 01/06/2022
    - [8:00AM-9:30AM] Something good
    - [11:00AM-11:30AM] Something bad.
    - [2:00PN-2:45PM] A bit of both
    - [5:00PM-6:20PM] All of it.
    
    # 01/07/2022
    
    - [8:00AM-9:00AM] Nothing here.
    - [10:30AM-12:30PM] Hello.
    - [2:20PM-2:45PM] World.
    - [6:40PM-9:10PM] Bye bye.
    `;
    tt.calculateDaysMinutesFromString(basic)
      .then((actual) => {
        assert.isNotNull(actual);
        // console.log(actual);
        assert.deepEqual(actual, {
          "01/06/2022": 200,
          "01/07/2022": 355,
        });
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});
