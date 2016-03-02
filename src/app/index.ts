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

    app.DisplayData(data);
    app.Fetch();
  }
}