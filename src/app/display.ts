module app {
  export function DisplayData(data: IData): void {
    SetNumber("#velocity", data.vel, 1);
    SetPercentage(
      "#slip",
      data.slip,
      {
        Good: { Min: 0, Max: 20 },
        Warning: { Min: 20, Max: 40 },
        Bad: { Min: 40, Max: 100 }
      });
    SetNumber("#cvt_ratio", data.cvt_ratio);
    SetPercentage("#cvt_pct", data.cvt_pct);
    SetNumber("#rpm", data.rpm, 0);

    SetPercentage("#throttle", data.throttle);
    SetPercentage(
      "#engine-loading",
      data.load,
      {
        Good: { Min: 0, Max: 80 },
        Warning: { Min: 80, Max: 90 },
        Bad: { Min: 90, Max: 100 }
      });
    SetDegrees(
      "#engine-temperature",
      data.eng_temp,
      {
        Good: { Min: 0, Max: 100 },
        Warning: { Min: 100, Max: 140 },
        Bad: { Min: 141, Max: 1000 }
      });
    SetNumber(
      "#oil-pressure",
      data.oil,
      0,
      {
        Good: { Min: 0, Max: 50 },
        Bad: { Min: 50, Max: 1000 }
      });

    SetPercentage("#suspension", data.susp);
    SetBallast("#ballast-state", data.ballast);
    SetPercentage(
      "#lhs-brake-state",
      data.lbrake,
      {
        Good: { Min: 0, Max: 0 },
        Warning: { Min: 0, Max: 100 }
      });
    SetPercentage(
      "#rhs-brake-state",
      data.rbrake,
      {
        Good: { Min: 0, Max: 0 },
        Warning: { Min: 0, Max: 100 }
      });

    SetNumber("#engine-hours", data.hours, 0);
    SetBatteryVoltage("#battery-voltage", data.bat);
    SetValue("#rfid-user", data.user);
    SetValue("#differential", data.lock ? "ON" : "OFF", data.lock ? "warning" : "");

    SetNumber("#gear", data.gear, 0);
    SetPercentage("#belt_slip", data.belt_slip);
    SetDegrees("#trans_temp", data.trans_temp);
  }

  interface Interval {
    Min: number;
    Max: number;
  }

  interface Ranges {
    Good?: Interval;
    Warning?: Interval;
    Bad?: Interval;
  }

  function RangeClassFromRanges(value: number, ranges?: Ranges) {
    if (!ranges) {
      return "";
    }

    if (ranges.Good && ranges.Good.Min <= value && ranges.Good.Max >= value) {
      return "good";
    }

    if (ranges.Warning && ranges.Warning.Min <= value && ranges.Warning.Max >= value) {
      return "warning";
    }

    if (ranges.Bad && ranges.Bad.Min <= value && ranges.Bad.Max >= value) {
      return "bad";
    }
  }

  function SetPercentage(selector: string, value: number, ranges?: Ranges): void {
    SetValue(selector, value.toString() + " %", RangeClassFromRanges(value, ranges));
  }

  function SetDegrees(selector: string, value: number, ranges?: Ranges): void {
    SetValue(selector, value.toFixed(1).toString() + " °C", RangeClassFromRanges(value, ranges));
  }

  function SetBallast(selector: string, value: string): void {
    var stringValue = "Off";
    switch (value) {
      case "Forward":
        stringValue = "↑↑";
        break;

      case "Backward":
        stringValue = "↓↓";
        break;
    }
    SetValue(selector, stringValue);
  }

  function SetBatteryVoltage(selector: string, value: number): void {
    var rangeClass = RangeClassFromRanges(
      value,
      {
        Good: { Min: 11, Max: 12.999999 },
        Warning: { Min: 13, Max: 15 },
        Bad: { Min: 15.000001, Max: 1000 }
      })
      if (value < 11) {
        rangeClass = "warning";
      }
    SetValue(selector, value.toFixed(1).toString(), rangeClass);
  }

  function SetNumber(selector: string, value: number, precision: number = 2, ranges?: Ranges): void {
    SetValue(selector, value.toFixed(precision).toString(), RangeClassFromRanges(value, ranges));
  }

  function SetValue(selector: string, value: string, rangeClass?: string): void {
    var root = <HTMLElement>document.querySelector(selector);
    root.classList.remove("good", "warning", "bad");
    if (rangeClass) {
      root.classList.add(rangeClass);
    }
    var element = <HTMLElement>root.querySelector(".value");
    element.innerHTML = value.toString();
  }
}