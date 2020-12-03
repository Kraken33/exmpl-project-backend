import { createTerminus as createTerminusModule, TerminusOptions } from '@godaddy/terminus';

import { storage } from './storage';

function onSignal() {
  console.log("server is starting cleanup");
  return Promise.all([
    storage.saveStore()
  ]);
}

function onShutdown(): any {
  console.log("cleanup finished, server is shutting down");
}

function healthCheck() {
  return Promise
    .resolve
    // optionally include a resolve value to be included as
    // info in the health check response
    ();
}

const options: TerminusOptions = {
    // health check options
    signal: 'SIGINT',
    healthChecks: {
      '/healthcheck': healthCheck,    // a function returning a promise indicating service health,
      verbatim: true // [optional = false] use object returned from /healthcheck verbatim in response
    },
    // cleanup options
    timeout: 1000,                   // [optional = 1000] number of milliseconds before forceful exiting
    onSignal,                        // [optional] cleanup function, returning a promise (used to be onSigterm)
    onShutdown,                      // [optional] called right before exiting
    logger: console.log
};

const createTerminus = (server: any)=>{
    createTerminusModule(server, options);
    return server;
};

export { createTerminus };