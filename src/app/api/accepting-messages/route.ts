import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbconnect from "@/lib/dbconnect";
import UserModel from "@/model/User";
import { User } from "next-auth"; //this user is from session user //it is defing teh typoe
import { success } from "zod";



export async function POST(request: Request) {
    await dbconnect() //db connection 

    //taking out teh session 
    const session = await getServerSession(authOptions) //passing auth options for creditails
    //taking out user from the session 
    const user: User = session?.user;

    if (!session || !session?.user) {
        return Response.json(
            { success: false, message: "Not autheticated" },
            { status: 401 }
        );
    }

    const userId = user._id
    const { acceptMessages } = await request.json();


    try {
        //find user based on userID
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessages: acceptMessages },
            { new: true }
        )

        //checking for updateduser
        if (!updatedUser) {
            return Response.json(
                {
                    success: false,
                    message: 'Unable to find user to update message acceptance status',
                },
                { status: 404 }
            );
        }

        //update the user accetance status

        return Response.json(
            {
                success: true,
                message: 'Message acceptance status updated successfully',
                updatedUser, //this is a important thing
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating message acceptance status:', error);
        return Response.json(
            { success: false, message: 'Error updating message acceptance status' },
            { status: 500 }
        );
    }
}
