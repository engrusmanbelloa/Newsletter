const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing"); // you need to add dependency first. See tips.

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

client.setConfig({
  apiKey: "853800dbf0b9668d974654d5de000f62-us14",
  server: "us14",
});

app.post("/", function(req, res) {
  const firstName = req.body.name;
  // const lastName = req.body.lName;
  const email = req.body.email;
  console.log(firstName, email);
  const subscribingUser = {
    firstName: firstName,
    email: email
  }

  const run = async () => {
    try {
      const response = await client.lists.addListMember("e59e78f63c", {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,

        }
      });
      console.log(response);
      res.sendFile(__dirname + "/success.html");
    } catch (err) {
      console.log(err.status);
      res.sendFile(__dirname + "/failure.html");
    }
  };

  run();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.post("/success", function(req, res) {
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000.");
});
