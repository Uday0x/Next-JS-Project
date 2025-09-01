import { Message } from "@/model/User";



export interface Apiresponse {
    success:boolean;
    message:string;
    Message?:Array<Message>;
    isAcceptingMessages?:boolean;
}