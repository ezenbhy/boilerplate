const mongoose  = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength:50
    },
    email: {
        type: String,
        trim:true, //빈칸제거
        unique:1
    },
    password: {
        type: String,
        minlength:5
    },
    lastname: {
        type: String,
        maxlength:50
    },
    role: {
        type: Number, //일반유저, 관리자 등 구분
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const  User = mongoose.model('User',userSchema) // 'User'는 모델이름

module.exports = {User}