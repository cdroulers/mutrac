Format is the following:

```
{
    "vel" : unsigned float,
    "slip" : unsigned float ,
    "cvt" : unsigned float,
    "rpm" : unsigned int 0 - 4000,
    "throttle" : unsigned int 0 - 100,
    "load" : unsigned int 0 - 100,
    "temp" : unsigned int 0 - 100,
    "oil" : unsigned int 0 - 100,
    "susp" : int 0 - 100,
    "ballast" : Forward / Backward / Off,
    "lbrake" : unsigned int 0 - 100,
    "rbrake" : unsigned int 0 - 100,
    "hours" : unsigned float,
    "bat" : unsigned float,
    "user" : String,
    "lock" : boolean,
    "gear" : number,
    "belt_slip" : number,
    "trans_temp" : number
}
```

# Color coding

```
Slip ratio:     0-19% green, 20-39% orange, 40-100% red
Engine loading: 0-79% green, 80-89% Orange,90-100% red
Engine temp:    0-100 C green, 101-140C yellow, 141 and above red
Oil pressure:   0-50 psi green, 51-100 psi red.
Brake state:    0% white, else orange
Battery voltage: 0-10.9 orange, 11.0-12.9 green, 13.0-15.0 orange, 15.1 and above is red
Differential:   ON orange, OFF white
```
