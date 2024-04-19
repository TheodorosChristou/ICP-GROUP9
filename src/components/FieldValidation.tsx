export default function FieldValidation(check){
    if(check){
        return {required: {value: true, message:"Please enter a valid value"}}
    }else{
        return {required: false}
    }
}