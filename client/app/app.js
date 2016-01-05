import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularComponent from 'angular-component';
require('bootstrap-css-only');
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'normalize.css';

angular.module('app', [
  uiRouter,
  Common.name,
  Components.name
])

.component('app', AppComponent);
