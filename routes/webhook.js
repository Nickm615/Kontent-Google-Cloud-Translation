var express = require('express');
var router = express.Router();
var {signatureHelper} = require('@kontent-ai/webhook-helper');
const webhookSecret = 'ocSWUP33sRIGWJcYF9M357BvWkiNqhRQPOVEht4nvec=';
const crypto = require('crypto');
// const hasValidSignature = (body, signature) => {
//   const computedSignature = crypto.createHmac('sha256', webhookSecret)
//       .update(body)
//       .digest();
//   return crypto.timingSafeEqual(Buffer.from(signature, 'base64'), computedSignature);
// }

router.post('/', (req, res, err) => {
  res.status(200).send('Success')
})

//  console.log(err)
//   if(hasValidSignature(req.body, req.headers['x-kc-signature'])) {
//     res.status(200).send('Success');
//   }
//   else {
//     res.status(403).send('Invalid signature');
//   }
// });
  // const isValidSignature = signatureHelper.isValidSignatureFromString;
  // const payload = JSON.stringify(req.body, null, 2);
  // console.log('PAYLOAD',payload,'X-KC HEADERS',req.headers['x-kc-signature']);
  // isValidSignature(req.body, webhookSecret, req.headers['x-kc-signature'])
  // if(isValidSignature(payload, webhookSecret, req.headers['x-kc-signature'])){
  //   res.status(200).send('Success');
  // }
  // else {
  //   console.log('false')
  //   res.status(403).send('Invalid signature');
  // }
  // console.log(res, 'response')
  // });

module.exports = router;
