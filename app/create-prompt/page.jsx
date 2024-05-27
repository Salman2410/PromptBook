'use client';
import Form from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {useState} from 'react'



const CreatePrompt = () => {
  const[submitting, setSubmitting] = useState(false);
  const[post, setPost] = useState({
    promt: '',
    tag: '',
  });

  const createPrompt = async(e)=>{
   e.preventDefault();
  }
  
  return (
    <Form 
     type = "Create"
     post = {post}
     setPost = {setPost}
     submitting= {submitting}
     handleSubmit={createPrompt}
    
    
    />
  )
}

export default CreatePrompt