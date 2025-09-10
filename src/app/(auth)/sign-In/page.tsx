"use client"

import axios, { AxiosError } from "axios"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from "next-auth/react"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from "sonner"
import { signUpSchema } from '@/schemas/signUpSchema';
import { signInSchema } from '@/schemas/signInschemaSchema';
import { useDebounceValue } from 'usehooks-ts'
import { Apiresponse } from "@/Types/apiResponse";



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

      useEffect(()=>{
      const checkUsernameUnique = async () => {

          if(debouncedUsername){
            setIscheckingusername(true);
            setUsernameMessage("") //reset message

            try {
              const response = await axios.get<Apiresponse>(
                   `/api/check-username-unique?username=${debouncedUsername}}`
                 )
                 setUsernameMessage(response.data.message);
            } catch (error) {
                const axiosError = error as AxiosError<Apiresponse>;

                setUsernameMessage(
                  axiosError.response?.data.message ?? "error checking username"
                );
            }
            finally {
              setIscheckingusername(false)
            }
          }
        }
        checkUsernameUnique();
      },[debouncedUsername]);


      const onsubmit = async (data:z.infer<typeof signUpSchema>)=>{
        setIssubmitting(true)

        try {
          const response = await axios.post<Apiresponse>("/api/signup",data) //this data is also defined beside async be careful

          toast(`Success: ${response.data.message}`)

          router.replace(`/verify-code${username}`) //this will redirect to another frontedn page since there is no api before it too we can assume it in that way


          setIscheckingusername(false)
        } catch (error) {
          console.error('Error during sign-up:', error);

      const axiosError = error as AxiosError<Apiresponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message;
      ('There was a problem with your sign-up. Please try again.');

       toast('sign-up failed',{
        description:errorMessage,
       }) // new syntax of sooner it only accepts two arguments so may cause error if argumenst are mora than 2-3 

      setIssubmitting(false)
    }
        }
      }
    
