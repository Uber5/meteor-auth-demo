import { Meteor } from 'meteor/meteor';
import { getLiveToken, setU5AuthDebug } from 'meteor-u5auth'

Meteor.startup(() => {

  setU5AuthDebug()

  ServiceConfiguration.configurations.upsert({
    service: 'u5auth'
  }, {
    $set: {
      clientId: process.env.OAUTH2_ID || 'your-client-id',
      //loginStyle: 'redirect',
      secret: process.env.OAUTH2_SECRET || 'your-client-secret',
      issuer: process.env.OAUTH2_SITE || 'https://your-oauth2-provider.com',
      requestPermissions: [ 'email', 'userinfo', 'openid', 'phone_number', 'sub' ],
      ttl: 1 /* minutes */ * 60 /* seconds */ // TODO: too short
    }
  })

})

Meteor.methods({
  async printToken() {
    const token = await getLiveToken()
    console.log('token', token)
  }
})
