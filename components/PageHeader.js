export default function PageHeader({heading,subheading,rightColumnData}){
    return (
        <div className='block sm:flex justify-between min-h-[80px]'>
            <div className="w-full mb-8" align="left">
                <h1 className="mb-1 text-xl font-bold tracking-wide text-gray-900 font-cal">{heading}</h1>
                <p className="text-sm ltr:mr-4 rtl:ml-4 text-neutral-500">{subheading}</p>
            </div>
            <div className='flex-shrink-0 mb-4'>
                {rightColumnData}
            </div>
        </div>
    )
}