"use client"

import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { verifySchema } from '@/schemas/verifySchema';
import { Apiresponse } from '@/Types/apiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';


export default function Page() {
    //setup routera nd use params
    const router = useRouter();
    const params = useParams<{username :string}>()

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver:zodResolver(verifySchema),
        defaultValues:{
             code: ""   
        }
        //important to give default vaues coz we may get once controlled once not controlled error
    })


    const onSumbit = async(data: z.infer<typeof verifySchema>)=>{
        try {
            const response = await axios.post<Apiresponse>(`/api/verify`,{
                username:params.username,
                code:data.code
            });


            toast(response.data.message);

            router.replace("/sign-In")
        } catch (error) {
            const axioserror = error as AxiosError<Apiresponse>;
            toast("verification failed")
        }
    };

     return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
         {/* be sure that you imfort form from compnenets not from react */}
        <Form {...form}> 
          <form onSubmit={form.handleSubmit(onSumbit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Verify</Button>
          </form>
        </Form>
      </div>
    </div>
  );
    
}