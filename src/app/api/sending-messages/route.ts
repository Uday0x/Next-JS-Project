import dbconnect from "@/lib/dbconnect";
import UserModel from "@/model/User";

import { Message } from "@/model/User";

export async function POST(request:Request){
    //Db connection 
    //take data from req.json username and content 
    //find user based on username
    //check if user is present or not 
    //check if useris accepting messages or not 
    //if accepting messages push the new message 

    await dbconnect();
    const { username ,content} = await request.json();

    //finding user
    try {
        const user = await UserModel.findOne({
            username
        })
    
        if(!user){
            return Response.json(
                {message:"user not found"},
                {
                    status:404
                }
            )
        }
    
    
        if(!user.isAcceptingMessages){
            return Response.json(
            { message: 'User is not accepting messages', success: false },
            { status: 403 } // 403 Forbidden status
          );
        }
    
    
        const newMessage = {content ,createdAt:new Date()}
    
    
        user.messages.push(newMessage as Message) //Messaage is for type safety //we have given Message interface in user model
        await user.save();
    
         return Response.json(
          { message: 'Message sent successfully', success: true },
          { status: 201 }
        )
    
    } catch (error) {
         console.error('Error adding message:', error);
    return Response.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
    }

