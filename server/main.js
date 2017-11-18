import { Meteor } from 'meteor/meteor';
import { sayHello, getLiveToken } from 'meteor-u5auth'

Meteor.startup(() => {

  sayHello()

  ServiceConfiguration.configurations.upsert({
    service: 'u5auth'
  }, {
    $set: {
      clientId: process.env.OAUTH2_ID || 'your-client-id',
      //loginStyle: 'redirect',
      secret: process.env.OAUTH2_SECRET || 'your-client-secret',
      issuer: process.env.OAUTH2_SITE || 'https://your-oauth2-provider.com',
      requestPermissions: [ 'email', 'userinfo', 'openid', 'phone_number', 'sub' ]
    }
  })

});

Meteor.methods({
  async printToken() {
    const token = await getLiveToken()
    console.log('token', token)
  }
})
