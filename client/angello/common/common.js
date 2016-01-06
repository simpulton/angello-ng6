import angular from 'angular';
import Navbar from './navbar/navbar';
import EndpointConfigService from './services/EndpointConfigService';
import UtilsService from './services/UtilsService';
import './common.styl';

let commonModule = angular.module('app.common', [
  Navbar.name
])

//.constant('CURRENT_BACKEND', 'node')
.constant('CURRENT_BACKEND', 'firebase')

.service('EndpointConfigService', EndpointConfigService)

.service('UtilsService', UtilsService);

export default commonModule;
