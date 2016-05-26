# mutrac
μtrac display

## Building

    cd ./src/
    npm install
    ./node_modules/.bin/tsc

Or use Visual Studio Code and hit <keyboard>`ctrl+shift+b`</keyboard>. (`npm install` is still required.)

## Running

Any web server serving the `./src/` folder will do.

### Python 3.x

    cd ./src/
    python -m http.server

### Python 2.x

    cd ./src/
    python -m SimpleHTTPServer