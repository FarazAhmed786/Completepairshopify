
export default function AuthContainer(props){
    return (
        <div className="flex flex-col justify-center min-h-screen py-12 bg-neutral-50 sm:px-6 lg:px-8 w-full">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {props.logo && (
                    <img className="mx-auto" src="https://clewedri.sirv.com/Images/logo.jpg" width="100px" height="100px" alt="Complete Pair Booking App" />
                )}
                {props.heading && (
                    <h2 className="mt-6 text-3xl font-bold text-center font-cal text-neutral-900 brand-font">Sign in to your account</h2>
                )}
                {props.description && (
                    <p className="text-center mt-2 font-medium text-gray-500">Please Login with the credentials you created when you signed up for Complete Pair Booking App</p>
                )}
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="px-4 py-8 mx-2 bg-white border rounded-sm sm:px-10 border-neutral-200">
                    {props.children}
                </div>
            </div>
        </div>
    )
}