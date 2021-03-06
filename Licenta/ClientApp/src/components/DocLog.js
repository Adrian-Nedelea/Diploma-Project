import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { LogIn, UserPlus } from 'react-feather'
import { useState } from 'react'
import {  useNavigate } from 'react-router'
import Navbar from './Navbar/Index'

async function LoginUser(credentials)
{
  return fetch('Http://localhost:5000/api/doc/login' ,{
    method:'POST',
    headers :{'Content-Type':'application/json'},
    body:JSON.stringify(credentials)
  })
  .then(data =>data)
}


export default function LoginForm() {
  const [UsernameDoc, setUsernameDoc]=useState("");
  const [Password, setPassword]=useState("");
  
  let navigate=useNavigate();

    function ValidateForm ()
    {
      return UsernameDoc.length > 0 && Password.length > 0 ;
    }
  
    
    const handleSubmit = async e =>{
      e.preventDefault();
  
      const response =await LoginUser({
        UsernameDoc,
        Password
      });
      console.log(response);
      if(response.ok){
       
       navigate('/HomeDoc');
      }
      else{
        alert('Ati gresit Username-ul sau parola !!');
      }
    }

  return (
    <>
    <Navbar/>
    <div className='Login'>
      <Form onSubmit={handleSubmit} className="Form1">
        <div className='Form1-inner'>
        <div className='Title'>Autentificare</div>
            <Form.Group className="Form1-Group" controlId="Username">
              <Form.Label className='label'>Numele de utilizator</Form.Label>
              <Form.Control className='Form1-Control'  type="text" placeholder="Numele de utilizator"
                value={UsernameDoc}
                onChange={(e)=>setUsernameDoc(e.target.value)} /> 
            </Form.Group>

            <Form.Group className="Form1-Group " controlId="Password">
              <Form.Label className='label'>Parola</Form.Label>
              <Form.Control className='Form1-Control'  type="password" placeholder="Parola"
              value={Password}
              onChange={(e)=>setPassword(e.target.value)} />
              
            </Form.Group>

            <Button className='button' type="submit" >
            <LogIn size={20}/>
              Autentificare
            </Button>
          
        </div>
      </Form>
    </div>
    </>
  )
}


