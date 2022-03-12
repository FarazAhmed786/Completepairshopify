import { useForm } from "react-hook-form";
import Field from "./Field";

import Button from "./Button";

export default function Form(props){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className={props.className}>
            {props.children.map((field)=>{
                return (
                    <Field register={register} field={field}/>
                )
            })}
            
            <Button isLoading={props.isLoading}>{props.submitText}</Button>
        </form>
    )
}