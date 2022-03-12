export default function AddFeildButton(props){
    return (
        <>
        <button className={"inline-flex items-center px-3 py-2 text-sm font-medium rounded-sm relative border dark-bg-brand flex justify-center w-full mt-4 " + props.className}  >
            {(props.isLoading) ? 'Loading' : props.children}
        </button>
        </>
    )
}