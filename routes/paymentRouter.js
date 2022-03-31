const router= require('express').Router();
const paymentCtr= require("../controllers/paymentCtr");
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');


router.route('/payment')
.get(auth,authAdmin,paymentCtr.getPayments)
.post(auth,paymentCtr.createPayment)


module.exports = router;