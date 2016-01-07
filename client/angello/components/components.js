import angular from 'angular';
import Dashboard from './dashboard/dashboard';
import Login from './login/login';
import Storyboard from './storyboard/storyboard';
import Users from './users/users';

let componentModule = angular.module('app.components', [
  Dashboard.name,
  Login.name,
  Storyboard.name,
  Users.name
]);

export default componentModule;
