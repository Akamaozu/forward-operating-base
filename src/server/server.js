var express, fs, noticeboard,
    server, app;

    noticeboard = require('cjs-noticeboard');
    express = require('express');
    fs = require('fs');

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

    // load html
        fs.readFile('./src/client/index.html', 'utf8', function(error, html){

          if(error){ 
          
            app.log('\n! ERROR: HTML NOT LOADED\n  | \n  |-> fs.readFile: ./src/client/index.html\n\n' + error); 
            return; 
          }

          else app.notify('html-loaded', html, 'fs-readfile');
        });

    // start server
        app.watch('start-server', 'server-starter', function(){

          server.listen( 3000 );
          app.log('\nSERVER STARTED!');
        });

// configure server
    server = express();

    // root path ('/')
        server.get('/', function(request, response){

          var process = "server.get('/')";

          // set response code
              response.status(200);

          // set headers
              response.set({

              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            });

          // get html
              app.watch('html-loaded', process, function(msg){

                var html = msg.notice;

                response.send( html );

              }, {useCache: true});
        });

    // launch startup tests
        server_startup_tests();

// helper functions
    function server_startup_tests(){

      var process, tests, state;

          process = "server-startup-tests";
          tests = new noticeboard({logging: false});
          state = {

            "html-loaded": false
          };

      // html is loaded -> update state
          app.watch('html-loaded', process, function(){

            state["html-loaded"] = true;
            tests.notify('state-updated', state, process + ':html-loaded');

          }, {useCache: true});

      // check if server is ready to start
          tests.watch('state-updated', process, function(msg){

            var current_state = msg.notice;

            // do not start if any flag is not yet true 
                for(var flag in current_state){

                  if( !current_state.hasOwnProperty(flag) ) continue;

                  if( current_state[flag] !== true ) return;
                }

            app.notify('start-server', true, 'server-startup-tests');
          });
    }