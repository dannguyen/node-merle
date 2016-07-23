#!/usr/bin/env node
const packageJson = require('./package.json');
import _ from 'lodash';
import program from 'commander';
import request from 'request';
import {printOut} from './lib/utils';



program.version(packageJson.version)
  .usage("merle <url>")
  .description("Hello merle")
  .parse(process.argv);

let original_url = program.args[0];
console.log(`Working with ${original_url}`);
