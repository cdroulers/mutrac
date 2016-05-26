# mutrac
μtrac display

## Building

    cd ./src/
    npm install
    ./node_modules/.bin/tsc

Or use Visual Studio Code and hit <keyboard>`ctrl+shift+b`</keyboard>. (`npm install` is still required.)

## Configuration

When running the app, it's possible to set the URL to poll for the JSON file with data. Use the following:

    http://localhost:8000/?file=http://localhost:8000/test.json

Notice the `file` query string parameter.

## Running

Any web server serving the `./src/` folder will do.

### Python 3.x

    cd ./src/
    python -m http.server

### Python 2.x

    cd ./src/
    python -m SimpleHTTPServer