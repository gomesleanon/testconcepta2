# testconcepta

a [Sails v1](https://sailsjs.com) application

## Get travels
```
URL: POST {host}/api/get-travels
Header: {
  "Content-Type": "application/json"
}
Body: {
  "Language": "string",
  "Currency": "string",
  "destination": "string",
  "DateFrom": "string",
  "DateTO": "string",
  "Occupancy": {
    "AdultCount": "string",
    "ChildCount": "string",
    "ChildAges": ["string"]
  }
}
```
**This is an example using the public endpoint:**
```
URL: POST https://testconcepta.herokuapp.com/api/get-travels
Header: {
  "Content-Type": "application/json"
}
Body: {
  "Language":"ENG",
  "Currency":"USD",
  "destination": "MCO",
  "DateFrom":"11/26/2019",
  "DateTO":"11/29/2019",
  "Occupancy":{
    "AdultCount": "1",
    "ChildCount": "1",
    "ChildAges": ["10"]
  }
}
```

### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Thu Sep 26 2019 14:23:12 GMT-0300 (GMT-03:00) using Sails v1.2.3.
