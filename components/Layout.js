import SideNavigation from "./SideNavigation"
export default function Layout({children}){
    return (
        <div className='dashboard__wrapper'>
            <div className='flex h-screen overflow-hidden bg-gray-50'>
                <div className='hidden md:flex lg:flex-shrink-0'>
                    <SideNavigation/>
                </div>
                <div className='flex flex-col flex-1 w-0 overflow-hidden'>
                    <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none max-w-[1700px]'>
                        <div className='py-8'>
                            <div className='block sm:flex justify-between px-4 sm:px-6 md:px-8 min-h-[80px]'>
                                <div className="w-full mb-8">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}