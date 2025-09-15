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

     await dbconnect();

    
try {
        console.log("is it entering actuallyu?")
        const {searchParams} = new URL(request.url)   //this is for extracting dadt from the URL //compulsary to write
        const queryParams = {
            username:searchParams.get('username')?.trim() //lhs is key //rhs is the value
        }
        console.log("searchParams.get('username'):", searchParams.get('username'));
        const result = UsernameSchema.safeParse(queryParams);
        console.log("result",result);
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || [];
            console.log(usernameErrors)
            console.log("has it entered here?")
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


        //extracting username
        const { username } = result.data;
        console.log("username",username);

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
          return Response.json(
      {
        success: true,
        message: 'Username is unique',
      },
      { status: 200 }
    );
        
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