import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { sayHello, getLiveToken } from 'meteor-u5auth'
import { Meteor } from 'meteor/meteor'

import './main.html';

Template.login.helpers({
  loginStatus() {
    return Meteor.user() ? `logged in as ${Meteor.user().profile.email}` : 'not logged in'
  }
})

Template.login.events({
  'click button'(event, instance) {
    Meteor.loginWithU5Auth({}, err => {
      console.log('after attempting login, err', err)
    })
  }
})

Template.useToken.events({
  'click button.client'(event, instance) {
    getLiveToken().then(t => console.log('live token:', t))
  },
  'click button.server'(event, instance) {
    Meteor.call('printToken') // should print token on server console
  }
})

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  sayHello()
  console.log('Meteor.user()', Meteor.user())
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

