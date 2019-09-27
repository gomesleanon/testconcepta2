module.exports = {


  friendlyName: 'Get travels',


  description: '',


  inputs: {
    test: {
      type: 'string'
    }
  },


  exits: {
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function (req) {
    const token = sails.helpers.authenticationToken().then(res => {
      const token = JSON.parse(res).access_token
      if (!token) {
        return res.forbidden({ err: 'Failed when generate the token.' })
      }
      return { token: req };
    }).catch(err => {
      return err
    })

    return token
  }
};
