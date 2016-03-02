module app {
  window.onload = () => {
    var data: IData = {
      vel: 15.6,
      slip: 10,
      cvt: 3.4,
      rpm: 3600,
      throttle: 100,
      load: 87,
      temp: 80,
      oil: 40,
      susp: 100,
      ballast: "Forward",
      lbrake: 0,
      rbrake: 75,
      hours: 10.5,
      bat: 12.6,
      user: "guest",
      lock: false
    }

    DisplayData(data);
  }

  export function DisplayData(data: IData): void {
    SetNumber("#velocity", data.vel, 1);
    SetPercentage("#slip", data.slip);
    SetNumber("#cvt", data.cvt);
    SetNumber("#rpm", data.rpm, 0);

    SetPercentage("#throttle", data.throttle);
    SetPercentage("#engine-loading", data.load);
    SetDegrees("#engine-temperature", data.temp);
    SetNumber("#oil-pressure", data.oil, 0);

    SetPercentage("#suspension", data.susp);
    SetBallast("#ballast-state", data.ballast);
    SetPercentage("#lhs-brake-state", data.lbrake);
    SetPercentage("#rhs-brake-state", data.rbrake);

    SetNumber("#engine-hours", data.hours, 0);
    SetNumber("#battery-voltage", data.bat, 1);
    SetValue("#rfid-user", data.user);
    SetValue("#differential", data.lock ? "ON" : "OFF");
  }

  function SetPercentage(selector: string, value: number): void {
    SetValue(selector, value.toString() + " %");
  }

  function SetDegrees(selector: string, value: number): void {
    SetValue(selector, value.toFixed(1).toString() + " °C");
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

  function SetNumber(selector: string, value: number, precision: number = 2): void {
    SetValue(selector, value.toFixed(precision).toString());
  }

  function SetValue(selector: string, value: string): void {
    var root = <HTMLElement>document.querySelector(selector);
    var element = <HTMLElement>root.querySelector(".value");
    element.innerHTML = value.toString();
  }
}