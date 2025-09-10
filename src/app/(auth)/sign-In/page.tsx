"use client"


import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from "next-auth/react"
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from "sonner"
import { signUpSchema } from '@/schemas/signUpSchema';
import { signInSchema } from '@/schemas/signInschemaSchema';
import { useDebounceValue } from 'usehooks-ts'



export default function SignUpForm(){
      //define states 
      const [username,setUsername]=useState('');
      const [usernameMessage,setUsernameMessage] = useState("");
      const[ischeckingusername,setIscheckingusername] =useState(false);
      const[issubmitting,setIssubmitting] =useState(false);

      const debouncedUsername = useDebounceValue(username,300) //if wondering where i susername cmg from its from teh state which we would handle later
      



      const router = useRouter() //this is useful redirecting pages 
      

      //setting up of the form 
      const form = useForm<z.infer<typeof signUpSchema>>({
          resolver:zodResolver(signUpSchema),
          //default values
          defaultValues:{
            username:"",
            email:"",
            password:""

          }
      })
} 
