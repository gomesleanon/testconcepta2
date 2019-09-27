const rp = require('request-promise')

module.exports = {


  friendlyName: 'Authentication token',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const grant_type = sails.config.custom.api.grant_type
    const username = sails.config.custom.api.username
    const password = sails.config.custom.api.password

    return rp.post({
      url: sails.config.custom.api.urlToken,
      body: `grant_type=${grant_type}&username=${username}&password=${password}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }, (err, res, body) => {
      if (err) {
        return err
      }
      return body
    })
  }

};
