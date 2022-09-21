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
const isstreatValid = function (value) {
    return (/^[\s]*[a-zA-Z-0-9,]+([\s]?[a-zA-Z-0-9]+)*[\s]*$/.test(value))
}
const isValidName = function (value) {
    if (value.match(/^[a-zA-Z\. ]*$/)) return true;  
    return false;
}
const isValidPhone = function (value) {
    return /^[\s]*[6-9]\d{9}[\s]*$/gi.test(value)
}
const isValidISBN=function(value){
        return  /^[6-9]{3}[\-][\d]{10}$/.test(value)
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
function isValidDate(value){
    return  /^\d{4}\-\d{1,2}\-\d{1,2}$/.test(value);
}



const isValidRating=function(value){
    
    return (/^[1-5]{1}.\d{1}$/).test(value)
}


module.exports={isValidRating,isValidDate,isNotEmpty,isValidName,isValidPhone,isValidEmail,isValidPass,isstreatValid,isValidPin,isValid,isValidISBN}




