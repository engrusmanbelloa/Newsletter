const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")
const client = require("@mailchimp/mailchimp_marketing");

// start the expressjs
const app = express();
// link other local folders to the index using public folder on the server
app.use(express.static("public"))

// the bodyParser to collect the data posted from the form
app.use(bodyParser.urlencoded({
  extended: true
}));

// configuring the mailchimp_marketing apiKey
client.setConfig({
  apiKey: "853800dbf0b9668d974654d5de000f62-us14",
  server: "us14",
});


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  // form data
  var name = req.body.name;
  var email = req.body.email;

  // mailchimp mailing codes
  const subscribingUser = {
    firstName: name,
    email: email,
  }

  const run = async () => {
    // try {

      const response = await client.lists.addListMember("e59e78f63c", {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          // LNAME: subscribingUser.lastName
        }

      });
      console.log(response);
    //   res.sendFile(__dirname + "/success.html");
    //
    //
    // } catch (err) {
    //   console.log(err.status);
    //   res.sendFile(__dirname + "/failure.html");
    // }

    run();
  };

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});


// api
// 853800dbf0b9668d974654d5de000f62-us14


app.listen(process.env.PORT, function() {
  console.log("done");
});
