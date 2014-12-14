var express, noticeboard,
    server, app;

    express = require('express');
    noticeboard = require('cjs-noticeboard');

// configure app
    app = new noticeboard();

    // pipe app log to console
        app.watch('log-entry', 'node-console', function(msg){

          var entry = msg.notice;

          // filter
              if(typeof entry.length === 'undefined' || entry.length < 1){ return; }

          // format output
              switch(entry.length){

                case 1: 
                  console.log( entry[0] );
                  break;

                default:
                  console.log.apply(console, entry);
                  break;
              }
        });

// configure server
    server = express();

    // root path ('/')
        server.get('/', function(request, response){

          // set response code
              response.status(200);

          // set headers
              response.set({

              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            });

          response.send("hello world!");
        });

// start server
    server.listen( 3000 );
    app.log('\nSERVER STARTED!');