import { Message } from "@/model/user";


export interface Apiresponse {
    success:boolean;
    message:string;
    Message?:Array<Message>;
    isAcceptingMessages?:boolean;
}