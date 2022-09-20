const isNotEmpty=function(value){
    if(value.trim().length!=0)
    return true; 
    return false;

}
const isValid = function (value) {
    if (typeof value === "undefined" || value === null || value==" ") return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
}
let isstreatValid = function (value) {
    return (/^[\s]*[a-zA-Z]+([\s]?[a-zA-Z]+)*[\s]*$/.test(value))
}
const isValidName = function (value) {
    if (value.match(/^[a-zA-Z\. ]*$/)) return true;  
    return false;
}
let isValidPhone = function (mob) {
    return /^[\s]*[6-9]\d{9}[\s]*$/gi.test(mob)
}
const isValidEmail=function(value){
    if(value.match(/^[a-z0-9_]{3,}@[a-z]{3,}[.]{1}[a-z]{3,6}$/))
    return true;
    return false;
}

const isValidPass=function(value){
    if(value.match(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/))
    return true
    return false
}
const isValidPin=function(value){
    if(value.match(/^\d{6}$/))
    return true
    return false
}

module.exports={isNotEmpty,isValidName,isValidPhone,isValidEmail,isValidPass,isstreatValid,isValidPin,isValid}




