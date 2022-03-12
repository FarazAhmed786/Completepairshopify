import Link from 'next/link';
import {FiEdit} from 'react-icons';
import {getAccessToken} from '../utils/authHandler';
import CONSTANTS from '../utils/constants';
import axios from 'axios';
import {useState} from 'react';
import { MinusCircledIcon } from '@radix-ui/react-icons';

export default function QuestionSingle({name,slug,id,updateTeams,Feilds}) {
    console.log("ccccccccccc",Feilds);
    const accessToken = getAccessToken();
    const host = window.sessionStorage.getItem("host");
    const shop = window.sessionStorage.getItem("shop");
    const [membersModalActive,setMembersModalAcitve] = useState(false)
    
    const handleDeleteTeam = async(e) => {
        const teamId = e.target.dataset.teamId;
        try{
            const response = await axios.delete(CONSTANTS.BOOOKING_SYSTEM_URL + '/api/teams/' + teamId,{
                headers:{
                    'Authorization':accessToken,
                }
            });
            updateTeams(response);
        }catch(err){
            console.log(err);
        }
    }
  return (
    <li className="divide-y">
        <div className="flex items-center justify-between group hover:bg-neutral-50">
            <Link href={`/teams/${id}/?shop=${shop}&host=${host}`}>
                <a className="flex-grow text-sm truncate cursor-pointer" title="kk">
                    <div className="flex px-5 py-5">
                        <span>
                            <img alt="Team Logo" className="h-auto rounded-full w-9 h-9 min-w-9 min-h-9" src={`https://eu.ui-avatars.com/api/?uppercase=false&name=${name}`}/>
                        </span>
                        <div className="inline-block ml-3"><span className="text-sm font-bold text-neutral-700">{name}</span></div>
                    </div>
                </a>
            </Link>
            
            <div className="px-5 py-5">
                <div className="flex space-x-2 rtl:space-x-reverse">
                    <button onClick={handleDeleteTeam} className='text-sm font-bold text-red-700' data-team-id={id}><MinusCircledIcon/></button>
                </div>
                
            </div>
        </div>
        {Feilds.map((v,i)=>{
            return  <div >
                        <input type="radio" id="html" name="fav_language" value="Yes" />
                        <label for="html">Yes</label>
                        <input type="radio" id="css" name="fav_language" value="NO" />
                        <label for="css">NO</label>
                        
                    </div>
         })} 
        
    </li>
    
  )
}
