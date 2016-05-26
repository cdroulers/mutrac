module app {
  export interface IData {
    vel: number;
    slip: number;
    cvt_ratio: number;
    cvt_pct: number;
    rpm: number; // (0-4000)
    throttle: number; // (0-100)
    load: number; // (0-100)
    eng_temp: number;
    oil: number; // (0-100)
    susp: number; // (0-100)
    ballast: string; // (Forward / Backward / Off)
    lbrake: number; // (0-100)
    rbrake: number; // (0-100)
    hours: number;
    bat: number;
    user: string;
    lock: boolean;
    gear: number;
    belt_slip: number;
    trans_temp: number;
  }

  function getParameterByName(name: string, url?: string) {
    if (!url) url = window.location.search;
    name = name.replace(/[\[\]]/g, "\\$&");
    const results = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)").exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  export function Fetch() {
    const fileName = getParameterByName("file") || "test.json";
    console.log(`Starting fetch for ${fileName}`);

    FetchInternal(fileName);
  }

  export function FetchInternal(fileName: string) {
    const request = new XMLHttpRequest();

    request.addEventListener("load", e => TransferComplete(e, fileName));
    request.addEventListener("error", e => TransferFailed(e, fileName));
    request.addEventListener("abort", e => TransferCanceled(e, fileName));

    request.open("GET", fileName);
    request.send();
  }

  function TransferComplete(evt, fileName: string) {
    const result: IData = JSON.parse(evt.target.responseText);
    app.DisplayData(result);

    setTimeout(() => {
      app.FetchInternal(fileName);
    }, 500);
  }

  function TransferFailed(evt, fileName: string) {
    console.error("An error occurred while transferring the file.", evt);
    setTimeout(() => {
      app.FetchInternal(fileName);
    }, 2500);
  }

  function TransferCanceled(evt, fileName: string) {
    console.error("The transfer has been canceled by the user.", evt);
  }
}