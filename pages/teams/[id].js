import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import PageHeader from "../../components/PageHeader";
import CONSTANTS from "../../utils/constants";
import {getAccessToken} from '../../utils/authHandler';
import dbConnect from "../../utils/database";
import Shop from "../../models/Shop";
import MemberSingle from "../../components/MemberSingle";
import Alert from "../../components/Modal";
import { Cross1Icon } from "@radix-ui/react-icons";
import Form from "../../components/ui/Form";

const AddTeamMemberFormValues = [
    {
        type:"email",
        label:"Email or Username",
        placeholder:"email@example.com",
        required:true,
        name:"member_email",
        value:"",
    }
]
const TeamPage = ({data}) => {
    const [addMemberModalActive,setMemberModalActive] = useState(false);
    const [members,setMembers] = useState(data.team.members)
    const [membersUpdate,setMembersUpdate] = useState([]);
    const accessToken = getAccessToken();
    const addMember = async(formData) => {
        try{
            const response = await axios.post(CONSTANTS.BOOOKING_SYSTEM_URL + '/api/teams/' + data.team.id + '/invite',{role:"MEMBER",usernameOrEmail:formData.member_email},{
                headers:{
                    'Authorization':accessToken
                }
            })
            setMembersUpdate(response);
            setMemberModalActive(false);
        }catch(err){
            console.log(err) 
        }
    }
    useEffect(async ()=>{
        const response = await axios.get(CONSTANTS.BOOOKING_SYSTEM_URL + '/api/teams/' + data.team.id,{
            headers:{
                'Authorization': accessToken
            }
        })
        setMembers(response.data.team.members);
        console.log(members);
    },[membersUpdate])
    return (
        <Layout>
            <PageHeader
                heading={data.team.name}
                subheading='Manage Team Members'
                rightColumnData={(
                    <button onClick={()=>{setMemberModalActive(true)}} className="button-brand">Invite Member</button>
                )}
            />
                    <Alert 
                    active={addMemberModalActive}
                    >
                    <button className="closeButtonModal" onClick={()=>{setMemberModalActive(false)}}><Cross1Icon/></button>
                        <Form 
                            submitText="Invite Member"
                            onSubmit={addMember}
                        >
                            {AddTeamMemberFormValues}
                        </Form>
                    </Alert>
            {(members.length > 0) ? members.map((member)=>(<MemberSingle member={member}/>)) : 'No Members in this Team at the moment.'}
        </Layout>
    )
}

export async function getServerSideProps(context){
    dbConnect();
    const shopDomain = context.query.shop;
    const shopObj = await Shop.findOne({shopDomain:shopDomain});
    const team = await axios.get(CONSTANTS.BOOOKING_SYSTEM_URL + '/api/teams/' + context.params.id,{
        headers:{
            'Authorization': shopObj.sessionToken
        }
    })
    return {
        props:{
            data:team.data
        }
    }
}
export default TeamPage;