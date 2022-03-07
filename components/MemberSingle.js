import { MinusCircledIcon } from "@radix-ui/react-icons"

function MemberSingle({member}) {
  return (
    <>
    <ul className="px-4 mb-2 -mx-4 bg-white border divide-y divide-gray-200 rounded sm:px-4 sm:mx-0">
        <li className="divide-y">
            <div className="flex justify-between my-4">
                <div className="flex flex-col justify-between w-full sm:flex-row">
                    <div className="flex">
                        <span>
                            <img alt={member.name} className="rounded-full h-auto w-undefined rounded-full w-9 h-9" src={`https://eu.ui-avatars.com/api/?uppercase=false&name=${member.name ? member.name : member.id}`}/>
                        </span>
                        <div className="inline-block ml-3">
                            <span className="text-sm font-bold text-neutral-700">{member.name}</span>
                            <span className="block -mt-1 text-xs text-gray-400" data-testid="member-email" data-email={member.email}>{member.email}</span>
                        </div>
                    </div>
                    <div className="flex mt-2 ltr:mr-2 rtl:ml-2 sm:mt-0 sm:justify-center">
                        <div className="self-center px-3 py-1 ltr:mr-2 rtl:ml-2 text-xs capitalize border rounded-md bg-gray-50 border-gray-200 text-gray-700">
                            {member.role}
                        </div>
                        <div className="self-center px-3 py-1 ltr:mr-2 rtl:ml-2 text-xs capitalize border rounded-md bg-gray-50 border-gray-200 text-gray-700 mx-2">
                            {!member.accepted ? 'Pending' : 'Onboarded'}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button><MinusCircledIcon/></button>
                </div>
            </div>
        </li>
    </ul>
    </>
  )
}

export default MemberSingle