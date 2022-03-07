import Link from "next/link"
import { useEffect, useState } from "react";
export default function AppLink({ctx,href,text}){
    const [context,setContext] = useState({});
    useEffect(()=>{
        setContext({
            shopDomain:window.sessionStorage.getItem('shop'),
            host:window.sessionStorage.getItem('host')
        })
    },[])
    return (
        <Link classname='flex dashboard__sidebar__links active text-neutral-900 group flex items-center px-2 py-3 text-sm font-medium' href={href + '?shop=' + context.shopDomain + '&host=' + context.host}><span className="hidden lg:inline ml-2">{text}</span></Link>
    )
}