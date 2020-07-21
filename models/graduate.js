const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const graduateSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true},
    surName: { type: String, required: true, trim: true },
    middleName: { type: String, trim: true },
    dob: { type: String, required: true},
    passWord: {type: String, required: true},
    gender: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    lga: { type: String, required: true},
    address: {type: String, required: true},
    qualification: { type: String, required: true},
    otherQualification: { type: String, required:false, default: '' },
    certificate: { type: String, required: false, default: '' },
    nyscNumber: { type: Number, required: false, default: '' },
    socialProgramme: { type: Array, required: false, default: [] },
    programmeId: { type: Array, required: false, default: [] },
    skills: { type: Array, required: false, default: [] },
    phoneVerified : {type: Boolean, default: false},
    emailVerified: { type: Boolean, default: false }
})

graduateSchema.pre('save', async function (next) {
    if (this.passWord) {
        var salt = await bcrypt.genSalt(10)
        this.passWord = await bcrypt.hash(this.passWord, salt)
    }
    next()
})

module.exports = mongoose.model('graduate', graduateSchema)