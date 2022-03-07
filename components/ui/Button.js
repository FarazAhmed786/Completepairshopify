export default function Button(props){
    return (
        <>
        <button className={"inline-flex items-center px-3 py-2 text-sm font-medium rounded-sm relative border dark-bg-brand flex justify-center w-full mt-4 " + props.className} type={props.type} >
            {(props.isLoading) ? 'Loading' : props.children}
        </button>
        </>
    )
}