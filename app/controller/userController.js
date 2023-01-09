require('dotenv').config();
const stripe = require('stripe')("sk_test_51KGelaSDNkqyjJqyqoNBSTePv3Jtnil0hkwj4Sg07Wq9NLjMluLr6OZo3knA96Tz324lM4qYrYbhy97nEiGVjYzd00nZO0G23W")

exports.home = (req, res) => {
    res.render("payment", {
        key: "pk_test_51KGgUmSFsWWiuIx6ais3METv8r0js78GCVZ0FkEfj159AekL7lWYKq9Brha0MtBYKKokHTxLgfGq26Yc0Hy3b2xK00ubAMhkmh",
    });
};

exports.payment = (req, res) => {
    try {
        if (stripe) {
            console.log("stripeToken", req.body.stripeToken);
            stripe.customers
            .create({
                email: req.body.stripeEmail,
                source: req.body.stripeToken,
                name: req.body.name,
                address: {
                    line1: "Mavdi area",
                    postal_code: "360004",
                    city: "ahmadabad",
                    state: "Gujarat",
                    country: "India",
                },
                
            })
            
            .then((customer) => {
                    console.log("source",customer);

                    return stripe.paymentIntents.create({
                        amount: 1099,
                        currency: "usd",
                        payment_method_types: ["card"],
                        customer: customer.id,
                    });
                })
                .then((charge) => {
                    res.send("Success"); // If no error occurs
                })
                .catch((err) => {
                    res.send(err); // If some error occurs
                });
        }
        else {
            result = "Please try again"
        }
    }
    catch (err) {
        req.send("Please try again")
    }
}
