import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/emailVerification";
import { Apiresponse } from "@/Types/apiResponse";


export async function sendverificationEmail (
    email:string,
    username:string,
    verifyCode:string
): Promise<Apiresponse>
{
    try {
        await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: "mystery Message verification code",
    react: VerificationEmail({ username, otp: verifyCode }),
  });
  return { success: true, message: 'Verification email sent successfully.' }; //this response is related to API-RESPONSE that we have written in API RESPONSE success and message were compulsary to return
    } catch (error) {
        console.error("error sending the email ",error)
        return {success:false,message:"Error sending the email"}
    }
}
