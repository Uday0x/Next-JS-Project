import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" { //we are amking cahnges in default next auth modiule thats the reason we are using the keyword module
    interface session {
        user:{
            _id?:string;
            isVerified?:boolean;
            isAcceptingMessage?:boolean;
            username?:string;
        }& DefaultSession['user']
    }
}

    interface User{
        _id?:string,
        isVerified?:boolean,
        isAcceptingmessages?:boolean,
        username?:string,
    }


   declare module "next-auth/jwt"
{
    interface JWT{
        _id?:string,
        isVerified?:boolean,
        isAcceptingMessages?:boolean,
        username?:string
    }
}