import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';
import QUnit from 'qunit';
import { start } from 'ember-cli-qunit';
QUnit.config.hidepassed = true

if (!String.prototype.includes) {
  String.prototype.includes = function() {'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

setResolver(resolver);
start();
