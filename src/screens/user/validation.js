const validation = (values) => {
    let errors={};
    if(!values.email) {
        errors.email = "email is required";
    }else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email="Email is invalid"
    }
    if(!values.password) {
        errors.password="Password is required"
    } else if(values.password.length < 8) {
        errors.password = "Password must be more than eight characters"
    }
    if(values.repassword !== values.password){
        errors.repassword = "password not match"
    }
    if(values.image && !values.image.match(/\.(jpg|jpeg|png|gif)$/) ) {
        errors.image = "Please select valid image"
    }
    return errors;
};
export default validation;