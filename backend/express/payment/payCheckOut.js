const axios = require("axios");
require("dotenv").config();

let config = {
  headers: {
    Authorization: "Bearer " + process.env.CHAPA_SECRET_KEY,
  },
};
const payCheckOut = async (req, res) => {
  try {
    //TODO: populate from DB
    let book = req.body.book_id;
    let user = req.body.user_id;

    console.log(process.env.CHAPA_SECRET_KEY);
    console.log(req.body);
    let tx_ref = `tx-myecommerce12345${Date.now()}~${book}~${user}`;
    console.log(tx_ref);

    let result = await axios.postForm(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        amount: req.body.total_price,
        currency: "ETB",
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        tx_ref: tx_ref,
        callback_url: `http://localhost:5000/api/pay/success?tx_ref=${tx_ref}`,
        // "customization[title]": "I love e-commerce",
        // "customization[description]": "It is time to pay",
      },
      config
    );
    console.log("result");
    console.log(result.data);
    //returning back the checkout url to Frontend

    res.send(result.data);
  } catch (error) {
    console.log(error.data);
    res.send("error message " + error);
  }
};

module.exports = payCheckOut;
