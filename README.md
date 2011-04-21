# gearman-node

This module lets you create [Gearman](http://gearman.org/) clients with [Node.js](http://nodejs.org/).

Only a subset of the features of Gearman are currently implemented.

## Installation

    $ npm install gearman

## Usage

### Clients

Creating a client goes something like this:

    var gearman = require("gearman"),
        client = gearman.createClient(4730, "my-gearman-server.example.com");

    console.log("Sending job...");
    var job = client.submitJob("reverse", "Hello World!", { encoding: "utf8" });
    job.on("complete", function (data) {
        console.log(data);
        client.end();
    });

This creates a client with a job and a listener for the result.

You can run this on the command line like so:

    $ node reverse-client.js
    Sending job...
    !dlroW olleH

### More

Additional Gearman tutorials and help can be found at [Gearman HQ help](http://gearmanhq.com/help/).

## API

The `gearman` module contains methods for creating clients. You can include this module with `require('gearman')`.

### gearman.createClient([port = 4730], [host = 'localhost'])

Creates a new Gearman client. Takes `port` and `host` arguments which default to `localhost:4730`.

### gearman.Client

This is an object with methods to create and manage jobs.

#### client.getConnection()

Creates and sets up a client's connection (an instance of `net.Socket`) if it has not yet been created and returns it.

#### client.end()

Closes the client connections for when you don't need to use the client any more.

#### client.submitJob(name, [data], [options])

Submits a job to a manager and returns a `gearman.Job`. `data` defaults to a `Buffer`, but can be a String if the `encoding` option is set to `'ascii'`, `'utf8'`, or `'base64'`.

`options` is an object with the following defaults:

    { background: false,
      priority: 'normal',
      encoding: null
    }

`priority` can be one of `'low'`, `'normal'`, or `'high'`.

If `background` is set to `true`, the job is detached after the `create` event and no further events are emitted.

### gearman.Job

An object representing a job that has been submitted. `gearman.Job` instances are EventEmitters with the these events:

#### Event: 'create'

`function (handle) {}`

Emitted when a job is created. `handle` is the new job's handle, which is also assigned to the `handle` property of the `gearman.Job` instance.

#### Event: 'data'

`function (data) {}`

Emitted when data for the job is received. `data` is the data sent, as a `Buffer` or as a String if `encoding` was set before the job was submitted.

#### Event: 'warning'

`function (warning) {}`

Same as a `data` event, but should be treated as a warning.

#### Event: 'complete'

`function (data) {}`

Emitted when a job completes. `data` is the data sent, as a `Buffer` or as a String if `encoding` was set before the job was submitted.

#### Event: 'fail'

`function () {}`

Emitted when a job fails.

#### job.getStatus([callback])

For a job that was submitted in the background (with `background: true`), get information about its status. `callback` will be called when the server returns the status, with an object showing status information:

    job.getStatus(function (info) { console.dir(info); });

The `info` object returned can contain the following:

    { handle: String,                   // the job's handle
      known: Boolean,                   // is the job known?
      running: Boolean,                 // is the job running?
      percentComplete: [Number, Number] // Numerator & denominator of percentage complete
    }

## Tests

To run the tests:

Set up [nodeunit](https://github.com/caolan/nodeunit):

    $ npm link

Some of the tests require a live Gearman server running on localhost:4730 (no mock server here, we keep it real.) [Download, install, and run](http://gearman.org/index.php?id=download#gearmand_c) `gearmand`. You can do `brew install gearman` on a Mac with [HomeBrew](http://mxcl.github.com/homebrew/).

A worker used by some of the tests is in the test/fixtures directory. You'll need the `gearman` gem installed and you can run it with:

    $ ruby test/fixtures/worker.rb &

Run the tests:

    $ nodeunit test

## Compatibility

Should be compatible with node 0.4.x.

Should work with Gearman 0.20 and [Gearman HQ](http://gearmanhq.com/).

## Contributors

Thanks to the Gearman community and rest of the Gearman HQ team for help and documentation. This module is mostly based on [gearman-ruby](https://github.com/gearman-ruby/gearman-ruby) and [gearman.net](https://launchpad.net/gearman.net).

Thanks to the Node.js community for excellent people, tools, resources, examples, documentation, and inspiration.

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
