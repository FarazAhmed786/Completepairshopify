import React from "react";

export default function Field(props){
    const required = (props.field.required) ? true : false; 
    const register = props.register;
    return (
        <>
            <label className="block text-sm font-medium text-gray-700 mt-3">{props.field.label}</label>
            <input 
            {...register(props.field.name)}
            type={props.field.type} 
            placeholder={props.field.placeholder}
            className={"mt-1 block w-full border border-gray-300 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-neutral-800 focus:border-neutral-800 sm:text-sm " + props.field.classes}
            required
            />
        </>
    )
}