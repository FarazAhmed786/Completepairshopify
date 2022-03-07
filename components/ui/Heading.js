import styled from "styled-components";

export default function Heading(props){
    return <Title></Title>
}

const Title = styled.h3`
    font-size:${(props)=>{props.fontSize ? props.fontSize : "50px"}},
    
`