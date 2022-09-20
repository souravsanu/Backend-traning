
const isNotEmpty=function(value){
    if(value.trim().length!=0)
    return true; 
    return false;

}

const isValidName = function (value) {
    if (value.match(/^[a-zA-Z\. ]*$/)) return true;  
    return false;
}

const isValidPhone=function(value){
    if(value.match(/^[0-9]{10}$/))
    return true;
    return false;
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


module.exports={isNotEmpty,isValidName,isValidPhone,isValidEmail,isValidPass}




