# gearman-node

This module lets you create [Gearman](http://gearman.org/) clients with [Node.js](http://nodejs.org/).

Only a subset of the features of Gearman are currently implemented.

## Installation

    $ npm install gearman

## Usage

### Clients

Creating a client goes something like this:

    var gearman = require("gearman"),
        myClient = gearman.createClient(["my-gearman-server.example.com:4730",
                                         "another-gearman-server.example.com:4730"]);
    console.log("Sending job...");
    var job = myClient.submitJob("reverse", "Hello World!", {
        encoding: "utf8"
    });
    job.on("complete", function (data, handle) {
        console.log(data);
    });

This creates a client with a task and a listener for the result.

You can run this on the command line like so:

    $ node reverse-client.js
    Sending job...
    !dlroW olleH

### More

Additional Gearman tutorials and help can be found at [Gearman HQ help](http://gearmanhq.com/help/tutorials/).

## API

The gearman module contains methods for creating clients. You can include this module with `require("gearman")`.

### gearman.createClient([managers = ["localhost:4730"]])

Creates a new Gearman client. The managers argument can be a String or Array of Strings with `host:port` pairs representing the server connections that will be available to this client.

### gearman.Client

This is an object with methods to create and manage jobs.

#### client.submitJob(name, [data], [options])

Submits a job to a manager and returns a `gearman.Job`. `data` defaults to a `Buffer`, but can be a String if the `encoding` option is set to `'ascii'`, `'utf8'`, or `'base64'`.

`options` is an object with the following defaults:

    { encoding: null
    }

### gearman.Job

An object representing a job that has been submitted. `gearman.Job` instances are EventEmitters.

## Tests

To run the tests:

Set up [nodeunit](https://github.com/caolan/nodeunit):

    $ npm link

Run the tests:

    $ nodeunit test

## Node Compatibility

Should be compatible with node 0.4.x.

## Contributors

Thanks to the Gearman community and rest of the [Gearman HQ](http://gearmanhq.com/) team for help and documentation. This module is mostly based on [gearman-ruby](https://github.com/gearman-ruby/gearman-ruby) and [gearman.net](https://launchpad.net/gearman.net).

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
