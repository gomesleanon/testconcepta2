const rp = require('request-promise')
const dateFns = require('date-fns')

/**
 * ServiceApiController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getTravels
};

async function getTravels (req, res) {
  let token = null

  // Verify if exists token cached
  token = sails.config.globals.cache.get('token')
  if (!token) {
    await sails.helpers.authenticationToken().then(auth => {
      token = JSON.parse(auth).access_token
      sails.config.globals.cache.set('token', token)
    }).catch(err => {
      return res.forbidden(JSON.parse(err.error))
    })

    if (!token) {
      return res.forbidden()
    }
  }

  await rp.post({
    url: sails.config.custom.api.urlSearch,
    body: JSON.stringify(req.body),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(response => {
    return res.json(parseBody(JSON.parse(response)))
  }).catch(err => {
    return res.badRequest(JSON.parse(err.error))
  })
}

function parseBody (body) {
  return body && body.Result && Array.isArray(body.Result) && body.Result.map(res => {
    const Description = res && res.TicketInfo && res.TicketInfo.DescriptionList && Array.isArray(res.TicketInfo.DescriptionList) && res.TicketInfo.DescriptionList.find(des => des.Type === 'generalDescription')
    const ImageList = res && res.TicketInfo && res.TicketInfo.ImageList && Array.isArray(res.TicketInfo.ImageList) && res.TicketInfo.ImageList.length >= 2 && res.TicketInfo.ImageList.slice(0, 2)
    return {
      Destination: (res && res.TicketInfo && res.TicketInfo.Destination && res.TicketInfo.Destination.Code) || null,
      Code: (res && res.TicketInfo && res.TicketInfo.Code) || null,
      Classification: (res && res.TicketInfo && res.TicketInfo.Classification && res.TicketInfo.Classification.Value) || null,
      Name: (res && res.TicketInfo && res.TicketInfo.Name) || null,
      Description: (Description && Description.Value) || null,
      ImageThumb: (ImageList && ImageList[0] && ImageList[0].Url) || null,
      ImageFull: (ImageList && ImageList[1] && ImageList[1].Url) || null,
      AvailableModality: (res && res.AvailableModality && Array.isArray(res.AvailableModality) && res.AvailableModality.map(mod => {
        const ServicePrice = mod && mod.PriceList && Array.isArray(mod.PriceList) && mod.PriceList.find(price => price.Description === 'SERVICE PRICE')
        return {
          Code: (mod && mod.Code) || null,
          Name: (mod && mod.Name) || null,
          Contract: (mod && mod.Contract && mod.Contract.Name) || null,
          ServicePrice: (ServicePrice && ServicePrice.Amount) || null,
          OperationDateList: mod && mod.OperationDateList && Array.isArray(mod.OperationDateList) && mod.OperationDateList.map(ope => {
            const opeDate = ope && ope.Date && `${ope.Date.substring(0, 4)}/${ope.Date.substring(4, 6)}/${ope.Date.substring(6)}`
            const isValid = dateFns.isValid(new Date(opeDate))
            return {
              From: (isValid && opeDate && dateFns.format(new Date(opeDate), 'MM/dd/yyyy')) || null,
              To: (isValid && opeDate && ope.MaximumDuration && dateFns.format(dateFns.addDays(new Date(opeDate), ope.MaximumDuration), 'MM/dd/yyyy')) || null
            }
          }) || null
        }
      })) || null
    }
  }) || null
}
