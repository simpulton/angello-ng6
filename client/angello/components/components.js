import angular from 'angular';
import App from './app/app';
import Dashboard from './dashboard/dashboard';
import Login from './login/login';
import Storyboard from './storyboard/storyboard';
import Users from './users/users';

let componentModule = angular.module('app.components', [
  App.name,
  Dashboard.name,
  Login.name,
  Storyboard.name,
  Users.name
]);

export default componentModule;
