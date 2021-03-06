const mongoose  = require('mongoose');
const bcrypt  = require('bcrypt');
const saltRounds = 10;

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

userSchema.pre('save', function (next){
    var user = this;
    if(user.isModified('password')){
        //비밀번호를 암호화 시킨다
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash
                // Store hash in your password DB.
                next()
            });
        });
    }else{
        next();
    }
    

})

userSchema.methods.comparePassword = function (plainPassword, cb){
    //plainPassword: 12345를 암호화해서
    //암호화된 비밀번호와 매칭한다
    bcrypt.compare(plainPassword, this.password, function( err, isMatch) {
        if(err) return cb(err),
        cb(null, isMatch)
    })
}

const  User = mongoose.model('User',userSchema)

module.exports = {User}