import axios from "axios";
import React, { useEffect,useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";
import QuestionSingle from "../components/QuestionSingle";
import {getAccessToken} from '../utils/authHandler';
import CONSTANTS from '../utils/constants';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import Alert from "../components/Modal";
import Form from "../components/ui/Form";
import { Cross1Icon } from '@radix-ui/react-icons';

const arr = [];


const CreateQuestionFormValues = 
    {
        type:"text",
        label:"Type Your Question",
        placeholder:"Type Question Here",
        required:true,
        name:"Question",
        value:"",
    }

arr.push(CreateQuestionFormValues)
const Questionaiire = () => {
  const Question = CONSTANTS.BOOOKING_SYSTEM_URL + '/api/questions';
  const [question,setQuestions] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [errors,setErrors] = useState()
  const [updateQuestion,setUpdateQuestion] = useState(question)
  const [SetArray,setUpdateArray] = useState(arr)
  const [feilds,setFeilds] = useState(arr)
  const [questionModalActive,setQuestionModalActive] = useState(false)
  const [modalError,setModalError] = useState('');
  const accessToken = getAccessToken();
  const getQuestion = async() => {
      try{
          const response = await axios.get(Question,{headers:{'Authorization': accessToken}})
          
          setQuestions(response.data.questions)
          setIsLoading(false)
      }catch(err){
          setIsLoading(false);
          setErrors(err)
      }
  }
  
  const createQuestion = async(data) => {
      console.log('dddddddddddddddddd', data)
      try{
          const response = await axios.post(Question,{"Question": data,"type":"radio", "label": "radio_button", "subtype": "radio", },{headers:{Authorization:accessToken}})
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
  function  addfeildds() {
    
    let addans = {
        type:"text",
        label:"Type Your Answers",
        placeholder:"Type Youer Answer Here",
        required:true,
        name:`Answer${arr.length}`,
        value:"",
    }
    arr.push(addans);
    
        
    }
  useEffect(()=>{
    getQuestion();
  },[updateQuestion])
  useEffect(()=>{
    console.log('aaaaaaaaaaaaaaaaaaaaaa',arr);
  },[SetArray])



  
  

  return (
      <Layout>
          <PageHeader
              heading='Questionaiire'
              subheading='Build and Customize your Questionaiire'
              rightColumnData={(
                  <>
                  <button className="button-brand" onClick={()=>{setQuestionModalActive(true)}}>Add NewQuestion</button>
                  <Alert 
                  buttonText='Question'
                   
                  error={modalError}
                  active={questionModalActive}
                  
                  >

                      <button className="closeButtonModal" onClick={()=>{setQuestionModalActive(false)}}><Cross1Icon/></button>
                      <button className="inline-flex px-3 py-2 text-sm font-medium rounded-sm relative border dark-bg-brand flex" onClick={()=>{addfeildds()}}>Add a Feild</button>
                      <Form 
                        
                          submitText="Add QuestionHere"
                         
                          
                          onSubmit={createQuestion}
                      >
                          {SetArray}
                      </Form>
                  </Alert>
                  </>
                  
              )}
          />
          
          <Loader loading={isLoading}/>
          {(!errors) ? (<>{question.length > 0 ? (
              <ul className="mt-4 mb-2 bg-white border divide-y rounded divide-neutral-200">
                  {question.map((question)=> (
                      
                          <QuestionSingle id={question.id} name={question.Question} updateTeams={setUpdateQuestion} Feilds = {question.Feilds}/>
                      )
                  )}
              </ul>
          ): 'No Teams Created Yet'}</>) : (<p className="flex items-center justify-center h-full">There has been an error fetching the teams, Refresh and Try Again.</p>)}
              
      </Layout>
  )
}
//Question
export default Questionaiire;



