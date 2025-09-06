//create the file in my-app/src/app/api/auth/[...nextauth]/options.ts

import dbconnect from '@/lib/dbconnect';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { email } from 'zod';


export const authOptions: NextAuthOptions ={
    //first we need to provide providers
    providers:[
        CredentialsProvider({
            id:"credentails",
            name:"credentials",
            credentials:{ //credentials is for creating HTML form in the frontend 
                email:{label:"email",type:"email"},
                password:{label:"password",type:"password"} //you can also provide placeholder if you require
            
        },

        async authorize(credentials:any):Promise<any>{
            //this is where we write all the logic of authorization
            await dbconnect();

            try {
                //find the user
                const user = await UserModel.findOne({
                    //to make the code future proof we find the either by username or email 
                    $or:[
                        {email:credentials.identifier},
                        {username:credentials.identifier}
                    ],
                });
    
                //check if user has found or not
                if(!user){
                    throw new Error("No user found with this email");
                }
    
                if(!user.isVerified){
                    throw new Error("plaese verify ypour account")
                }
    
                const isPasswordCorrect =await bcrypt.compare(
                    credentials.password, //there is no identifier keyword here //imp
                    user.password
                )

                if(isPasswordCorrect){
                    return user; //this wa sthe whole purpose //if u have to return the user
                }else{
                    throw new Error("incorrect password")
                }
            } catch (error:any) {
                throw new Error(error)
            }
        }
    
    
})
    ],

    
}