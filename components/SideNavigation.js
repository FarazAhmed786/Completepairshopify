import Link from "next/link";
import { useRouter } from "next/router";
import { FiHome,FiUsers,FiItalic,FiUploadCloud,FiClock, FiCloud } from 'react-icons/fi';
export default function SideNavigation({children}){
    const router = useRouter();
    const links = [
        {
            text:"Dashboard",
            href:"/dashboard",
            icon:function(){
                return <FiHome/>
            }
        },
        {
            text:"Teams",
            href:"/teams",
            icon:function(){
                return <FiUsers/>
            }
        },
        {
            text:"Appointment Types",
            href:"/appointment-types",
            icon:function(){
                return <FiClock/>
            }
        },
        {
            text:"Questionaiire",
            href:"/questionaiire",
            icon:function(){
                return <FiItalic/>
            }
        },
        {
            text:"Integrations",
            href:"/integrations",
            icon:function(){
                return <FiCloud/>
            }
        },
    ]
    return (
        <div className='flex flex-col w-16 lg:w-60'>
            <div className='flex flex-col flex-1 h-0 bg-white border-r border-gray-200'>
                <div className='flex flex-col flex-1 pt-3 pb-4 overflow-y-auto lg:pt-5'>
                    <img className="mx-auto" src="/images/logo.jpg" width="75" height="75"/>
                    <nav className="flex-1 mt-2 bg-white lg:mt-5 navigation-main-left-sidebar">
                        {links.map((link)=>{
                            const isActive = router.pathname == link.href || router.pathname.includes(link.href) ? 'active' : '';
                            return (
                            <Link href={link.href}>
                                <a className={isActive + ' flex dashboard__sidebar__links text-neutral-900 group flex items-center px-2 py-3 text-sm font-medium'}>{link.icon()}<span className="hidden lg:inline ml-2">{link.text}</span></a>
                            </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>
        </div>
    )
}