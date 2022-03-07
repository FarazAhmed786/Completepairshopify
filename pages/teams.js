import axios from "axios";
import React, { useEffect,useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";
import TeamSingle from "../components/TeamSingle";
import {getAccessToken} from '../utils/authHandler';
import CONSTANTS from '../utils/constants';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import Alert from "../components/Modal";
import Form from "../components/ui/Form";
import { Cross1Icon } from '@radix-ui/react-icons';

const CreateTeamFormValues = [
    {
        type:"text",
        label:"Team Name",
        placeholder:"Team Name Here",
        required:true,
        name:"team_name",
        value:"",
    }
]
const Teams = () => {
    const TEAMS = CONSTANTS.BOOOKING_SYSTEM_URL + '/api/teams';
    const [teams,setTeams] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [errors,setErrors] = useState()
    const [updateTeams,setUpdateTeams] = useState(teams)
    const [teamModalActive,setTeamModalActive] = useState(false)
    const [modalError,setModalError] = useState('');
    const accessToken = getAccessToken();
    const getTeams = async() => {
        try{
            const response = await axios.get(TEAMS,{headers:{'Authorization': accessToken}})
            setTeams(response.data.teams)
            setIsLoading(false)
        }catch(err){
            setIsLoading(false);
            setErrors(err)
        }
    }
    const createTeam = async(data) => {
        try{
            const response = await axios.post(TEAMS,{name:data.team_name},{headers:{Authorization:accessToken}})
            setModalError('');
            setTeamModalActive(false)
            setUpdateTeams(response);
        }catch(err){
            const errorStatus = err.toJSON().status
            switch(errorStatus){
                case 409:
                    setModalError('Team with this name already exists.')
                    break;
                default:
                    setModalError('There was a problem creating the team, please try again.')
                    break;
            }
        }
    }
    useEffect(()=>{
        getTeams();
    },[updateTeams])

    return (
        <Layout>
            <PageHeader
                heading='Teams'
                subheading='Manage Teams and its Members'
                rightColumnData={(
                    <>
                    <button className="button-brand" onClick={()=>{setTeamModalActive(true)}}>Add Team</button>
                    <Alert 
                    buttonText='+ Team' 
                    error={modalError}
                    active={teamModalActive}
                    >
                        <button className="closeButtonModal" onClick={()=>{setTeamModalActive(false)}}><Cross1Icon/></button>
                        <Form 
                            submitText="Create Team"
                            onSubmit={createTeam}
                        >
                            {CreateTeamFormValues}
                        </Form>
                    </Alert>
                    </>
                    
                )}
            />
            
            <Loader loading={isLoading}/>
            {(!errors) ? (<>{teams.length > 0 ? (
                <ul className="mt-4 mb-2 bg-white border divide-y rounded divide-neutral-200">
                    {teams.map((team)=> (
                            <TeamSingle id={team.id} name={team.name} slug={team.slug} updateTeams={setUpdateTeams}/>
                        )
                    )}
                </ul>
            ): 'No Teams Created Yet'}</>) : (<p className="flex justify-center items-center h-full">There has been an error fetching the teams, Refresh and Try Again.</p>)}
                
        </Layout>
    )
}

export default Teams;