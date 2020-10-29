
const saltBath = (password) =>{
    let newPassword = ''
    for(let i =0 ; i< password.length; i++){
        newPassword = newPassword + password.charCodeAt(i) + i ;
    }
return newPassword
}

module.exports.saltBath = saltBath