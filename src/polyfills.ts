import 'core-js';
import 'reflect-metadata';
require('zone.js/dist/zone');
if (process.env.NODE_ENV === 'production') {
  // Production
} else {
  // Development
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}