module app {
  interface IData {
    vel: number;
    slip: number;
    cvt: number;
    rpm: number; // (0-4000)
    throttle: number; // (0-100)
    load: number; // (0-100)
    temp: number; // (0-100)
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
}