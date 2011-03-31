# gearman-node

This module lets you create [Gearman](http://gearman.org/) clients and workers with [Node.js](http://nodejs.org/).

## Installation

    $ npm install gearman

## Usage

### Clients

Creating a client goes something like this:

    var Client = require("gearman").Client,
        myClient = new Client(["my-gearman-server.example.com:4730",
                               "another-gearman-server.example.com:4730"]);
    console.log("Sending job...");
    var task = myClient.do("reverse", "Hello World!");
    task.on("result", function (result) {
        console.log(result);
    });

This creates a client with a task and a listener for the result.

You can run this on the command line like so:

    $ node reverse-client.js
    Sending job...

### Workers

Create a worker like this:

    var Worker = require("gearman").Worker,
        myWorker = new Worker([ /* ...servers ... */]);

    myWorker.addAbility("reverse", function (data, job) {
        console.log("Received job: " + job.handle);
        // Reverse a string
        return String(data).split("").reverse().join("");
    });

    myWorker.work();

Run it with:

    $ node reverse-worker.js

This worker will connect to the server and receive and do work until the process is terminated.

### More

Additional Gearman tutorials and help can be found at http://gearmanhq.com/help/tutorials/.

## API

### Client

### Worker

## Node Compatibility

Should be compatible with node 0.4.x.

## Contributors

Thanks to the Gearman community and rest of the [Gearman HQ](http://gearmanhq.com/) team for help and documentation. This module is mostly based on [gearman-ruby](https://github.com/gearman-ruby/gearman-ruby).

Thanks to the Node.js community for excellent tools, resources, examples, documentation, and inspiration.

## License

Copyright (c) 2011 Nathan L Smith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
