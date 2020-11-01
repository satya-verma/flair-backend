module.exports = {
    configure: (app, stripe) => {

        app.post('/payment', (req, res) => {
            const body = {
                source: req.body.token.id,
                amount: req.body.amount,
                currency: 'usd',
                description: "payment"
            }

            stripe.charges.create(body, (error, response) => {
                if (error) {
                    res.status(500).json({ error: error });
                    // console.log(error)
                }
                else {
                    res.status(200).json({ success: response });
                    // console.log(response)
                }
            })
        });


    }
}