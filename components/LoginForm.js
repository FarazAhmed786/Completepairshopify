import Form from "./ui/Form";
import {useState,useCallback, useContext} from 'react';
import axios from "axios";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import {useAppBridge } from '@shopify/app-bridge-react'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { AuthContext } from "./AuthContext";
import CONSTANTS from '../utils/constants';
import { useRouter } from "next/router";

const LoginFormValues = [
    {
        type:"email",
        label:"Email",
        classes:"mb-2",
        placeholder:"johndoe@example.com",
        required:true,
        name:"email_address",
        value:"",
    },
    {
        type:"password",
        label:"Password",
        placeholder:"**********",
        required:true,
        name:"password",
        value:"",
    }
]

export default function LoginForm(props){
    const app = useAppBridge();
    const router = useRouter();
    const authFetch = authenticatedFetch(app)
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    const handleLogin = async(data) => {
        setLoading(true);
        try{
            const sessionToken = await axios.post(CONSTANTS.BOOOKING_SYSTEM_URL + '/api/auth/login',{"email": data.email_address,"password":data.password })
            const response = await authFetch('/api/setup',{
                method:"POST",
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify({
                    store:props.shop,
                    token:sessionToken.data
                }),
            })
            setLoading(false)
            setError('');
            Toastify({text: "Successfully Logged In"}).showToast();
            router.push(`/dashboard/?shop=${props.shop}&host=${props.host}`)
        }catch(err){
            setLoading(false)
            setError(err.response?.data?.message)
        }
    }

    return (
        <>
        <Form 
            submitText="Sign In"
            onSubmit={handleLogin}
            isLoading={loading}
        >
            {LoginFormValues}
        </Form>
        <p className="error-login-form">{error}</p>
        
        </>
    )
}

