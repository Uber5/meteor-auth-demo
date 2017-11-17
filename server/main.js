import { Meteor } from 'meteor/meteor';
import { sayHello } from 'meteor-u5auth'

Meteor.startup(() => {
  // code to run on server at startup
  sayHello()
});
