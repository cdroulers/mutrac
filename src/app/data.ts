module app {
  export interface IData {
    vel: number;
    slip: number;
    cvt: number;
    rpm: number; // (0-4000)
    throttle: number; // (0-100)
    load: number; // (0-100)
    temp: number;
    oil: number; // (0-100)
    susp: number; // (0-100)
    ballast: string; // (Forward / Backward / Off)
    lbrake: number; // (0-100)
    rbrake: number; // (0-100)
    hours: number;
    bat: number;
    user: string;
    lock: boolean;
  }

  export function Fetch() {
    var request = new XMLHttpRequest();

    request.addEventListener("load", TransferComplete);
    request.addEventListener("error", TransferFailed);
    request.addEventListener("abort", TransferCanceled);

    request.open("GET", "test.json");
    request.send();
  }

  function TransferComplete(evt) {
    var text = this.responseText;
    var result: IData = JSON.parse(text);
    app.DisplayData(result);

    setTimeout(() => {
      app.Fetch();
    }, 500);
  }

  function TransferFailed(evt) {
    console.log("An error occurred while transferring the file.", evt);
    setTimeout(() => {
      app.Fetch();
    }, 2500);
  }

  function TransferCanceled(evt) {
    console.log("The transfer has been canceled by the user.", evt);
  }
}