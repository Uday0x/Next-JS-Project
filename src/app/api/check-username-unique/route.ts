import dbconnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import {  z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema"; 

//validate username from the url

const UsernameSchema = z.object({
    username:usernameValidation
}) 

//api starts from here 

export async function GET(request:Request){
    //database connection

    dbconnect();

    
try {
        const {searchParams} = new URL(request.url)   //this is for extracting dadt from the URL //compulsary to write
        const queryParams = {
            username:searchParams.get('username') //lhs is key //rhs is the value
        }

        const result = UsernameSchema.safeParse(queryParams);

        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || [];


            return Response.json(
                {
                    success:false,
                    message:
                    usernameErrors?.length >0 
                    ?usernameErrors.join(',')
                    :"Invalid query paramters",
                },
                { status :400}
            )
        }


        //extracting usernam e
        const { username } = result.data;


        const existingVerfiedUser =await UserModel.findOne({
            username,
            isVerified:true
        })

        if(existingVerfiedUser){
            return Response.json({
                success:true,
                messgae:"username is already taken",

            },{
                status:200
            })

        }
        
} catch (error) {
        console.error("error checking teh username",error);

        return Response.json(

            {
                success:false,
                message:"error checking the username"
            },
            {
                status:500
            }
        )
}}