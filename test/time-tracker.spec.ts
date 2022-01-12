import { createInterface } from "readline";
import { Readable } from "stream";
import { TimeTracker } from "../src/time-tracker";
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

  it("midnight", function (done) {
    const tt = new TimeTracker();
    const basic = `
    # 01/06/2022
    - [10:00PM-12:29AM] Something good
    `;
    tt.calculateDaysMinutesFromString(basic)
      .then((actual) => {
        assert.isNotNull(actual);
        console.log(actual);
        assert.deepEqual(actual, {
          "01/06/2022": 149,
        });
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it("noon", function (done) {
    const tt = new TimeTracker();
    const basic = `
    # 01/06/2022
    - [10:00AM-12:30PM] Something good
    `;
    tt.calculateDaysMinutesFromString(basic)
      .then((actual) => {
        assert.isNotNull(actual);
        console.log(actual);
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
        console.log(actual);
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
  it("file", function (done) {
    const file = path.join(__dirname, "test.md");
    const tt = new TimeTracker();
    tt.calculateDaysMinutesFromFile(file)
      .then((actual) => {
        assert.isNotNull(actual);
        console.log(actual);
        assert.deepEqual(actual, {
          "01/06/2022": 200,
          "01/07/2022": 395,
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
        console.log(actual);
        assert.deepEqual(actual, {
          "01/06/2022": 200,
          "01/07/2022": 395,
        });
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});
