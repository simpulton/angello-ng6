import angular from 'angular';
import App from './app/app';
import Dashboard from './dashboard/dashboard';
import Login from './login/login';
import Storyboard from './storyboard/storyboard';
import User from './user/user';

let componentModule = angular.module('app.components', [
  App.name,
  Dashboard.name,
  Login.name,
  Storyboard.name,
  User.name
]);

export default componentModule;
