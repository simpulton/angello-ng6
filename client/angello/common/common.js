import angular from 'angular';
import Navbar from './navbar/navbar';
import UtilsService from './services/UtilsService';
import EndpointConfigService from './services/EndpointConfigService';
import LoginService from './services/LoginService';
import LoadingService from './services/LoadingService';
import './common.styl';

let commonModule = angular.module('app.common', [
  Navbar.name
])

//.constant('CURRENT_BACKEND', 'node')
.constant('CURRENT_BACKEND', 'firebase')

.service('EndpointConfigService', EndpointConfigService)

.service('LoginService', LoginService)

.service('LoadingService', LoadingService)

.service('UtilsService', UtilsService);

export default commonModule;
