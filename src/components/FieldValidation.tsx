export default function FieldValidation(check){
    if(check){
        return {required: {value: true, message:"Please enter a valid value"}}
    }else{
        return {required: false}
    }
}

export function NumberValidation(value){
    console.log(value)
    if(value/0 == 0){
        return {required: {value: true, message: "Please enter a valid numerical value"}}
    }else{
        return {required: false}
    }
}