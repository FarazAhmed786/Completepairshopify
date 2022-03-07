import {useContext, useEffect, useState} from 'react';
import AuthContainer from '../components/AuthContainer';
import LoginForm from '../components/LoginForm';
import {AuthContext } from '../components/AuthContext';
import Dashboard from './dashboard';
import dbConnect from '../utils/database';
import Shop from "../models/Shop";
import { useRouter } from 'next/router';

const Index = ({exists,shop,host}) => {
  const [authenticated,setAuthenticated] = useState(false);
  useEffect(()=>{
    if(exists){
      setAuthenticated(true)
    }
  },[authenticated])
  return (
    <AuthContext.Provider value={[authenticated,setAuthenticated]}>
        <AuthContainer
          logo
          heading='Sign in to your Account'
          description='Please use credentials that you created when signed up for CompletePair Booking'
        >
          <LoginForm shop={shop} host={host}/>  
        </AuthContainer>
    </AuthContext.Provider>
  )
}


export async function getServerSideProps(context){
  dbConnect();
  const shopDomain = context.query.shop;
  const shopExists = await Shop.findOne({shopDomain:shopDomain});
  const host = context.query.host;
  if(shopExists){
    return{
      redirect:{
        destination:'/dashboard?shop=' + shopDomain + '&host=' + host, // must provide host and shopDomain
        permanent:true,
      },
      props:{
        shop:shopDomain,
        exists:true,
        host:host,
      }
    }
  }
  return {
    props:{
      shop:shopDomain,
      host:host,
      exists:false
    }
  }
}

export default Index;
