import Link from 'next/link';
import { useEffect } from 'react';
import Shop from "../models/Shop";
import dbConnect from '../utils/database';
import SideNavigation from '../components/SideNavigation';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import DashboardBanner from '../components/DashboardBanner';
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
                heading='Welcome To Complete Pair!'
                subheading='Its great to see you.'
            />
            <img class="mx-auto pb-2" src={"https://res.cloudinary.com/givees1/image/upload/v1644410397/uploads/products/09d0a17aa3/thumbnail/caztpvengaawwzbcqw5w.png"} width="150" height="150" />
        
            <DashboardBanner
                title='Welcome To Complete Pair!'
                para='Its great to see you.'
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