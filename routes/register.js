const express = require("express");
const router = express.Router();
const Graduate = require("../models/graduate");
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');
const graduate = require("../models/graduate");

router.get("/", (req, res) => {
  res.render("signup");
});

router.post("/", async (req, res) => {
    try {
        const graduate = new Graduate({
        firstName: req.body.firstName,
        surName: req.body.surName,
        middleName: req.body.middleName,
        dob: req.body.dob,
        passWord: req.body.passWord,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        address: req.body.address,
        lga: req.body.lga,
        qualification: req.body.qualification,
        otherQualification: req.body.otherQualification,
        certificate: req.body.certificate,
        nyscNumber: req.body.nyscNumber,
        socialProgramme: req.body.socialProgramme,
        programmeId: req.body.programmeId,
        skills: req.body.skills,
        });
        if (req.body.passWord !== req.body.confirmPassword) {
        console.log(
            "the two passwords do not match"
        );
        res.render("signup", {
            errorMessage:
            "The two passwords do not match",
        });
        } else {
        const newGraduate = await graduate.save();
        sendMail()
        sendCode()
        console.log("created");
        res.status(201).render("done", {errorMessage: "two messages where sent successfully ckeck it and see"});
        }
    } catch (err) {
        res.render("done", {
        graduate: graduate,
        errorMessage: "someting went wrong",
        });
        console.log("error");
        console.error(err)
        res.end();
    }

    async function sendMail() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: `${req.body.email}`,
            from: 'yusufabu179@gmail.com',
            subject: 'verification testing with twilio send grid',
            text: 'yusuf says open it',
            html: '<strong>nagani nagani wlh mun koma bayan science</strong>',
        };
        sgMail.send(msg);
    }

    async function sendCode() {
        const accountSid = 'AC69e4c374957cc67134c67f6cd53fc194';
        const authToken = 'b12284fc3e3369cd7efec5b79d43cb15';
        const client = require('twilio')(accountSid, authToken);

        client.messages
            .create({
                body: 'yusuf has successfully sent an sms using twilio',
                from: '+17814175307',
                to: `+234${req.body.phoneNumber}`
            })
            .then(message => console.log(message.sid));

    }
    });

module.exports = router;
