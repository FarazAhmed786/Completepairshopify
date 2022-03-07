import Link from 'next/link';
import { useEffect } from 'react';
import Shop from "../models/Shop";
import dbConnect from '../utils/database';
import SideNavigation from '../components/SideNavigation';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";

const Dashboard = ({accessToken,host,shop}) => {
    const app = useAppBridge();
    useEffect(async ()=>{
        const token = await getSessionToken(app);
        console.log(token)
        window.sessionStorage.setItem("token", accessToken);
        window.sessionStorage.setItem("host", host);
        window.sessionStorage.setItem("shop", shop);


    })
    return (
        <Layout>
            <PageHeader
                heading='Dashboard'
                subheading='Manage your CompletePair App Settings here.'
            />
        </Layout>
    )
}

export async function getServerSideProps(context){
    dbConnect();
    const shopDomain = context.query.shop;
    const shopExists = await Shop.findOne({shopDomain:shopDomain});
    const host = context.query.host;
    if(shopExists){
        return{
            props:{
                accessToken:JSON.stringify(shopExists.sessionToken),
                host:host,
                shop:shopDomain,
            }
        }
    }
    return {
        props:{

        }
    }
}
export default Dashboard;