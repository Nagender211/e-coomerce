import Kyc from "../model/kycSchema.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createKyc=async(req,res)=>{
    try {
        const {bankname,accountholder,accountnumber,ifsc}=req.body;
        if(!bankname || !accountholder || !accountnumber || !ifsc){
            return res.status(401).json({
                message: "please fill the all the deatiles"
            })
        }
         if (
            !req.files ||
            !req.files.pancard ||
            !req.files.aadharcard
            ) {
            return res.status(400).json({
                message: "Please upload both pancard and aadharcard files",
            });
            }
             const pancardFile = req.files.pancard[0];
            const aadharFile = req.files.aadharcard[0];
            const photoFile = req.files.photoimage ? req.files.photoimage[0] : null;
            const pancardPath = pancardFile.path || `kycupload/${pancardFile.filename}`;
            const aadharPath = aadharFile.path || `kycupload/${aadharFile.filename}`;
            const photoPath =
            photoFile ? (photoFile.path || `kycupload/${photoFile.filename}`) : undefined;

        const kycsubmission=await Kyc.create({bankname,accountholder,accountnumber,ifsc,phootoimage: photoPath,pancard: pancardPath,aadharcard: aadharPath,isVerify: false,user: req.user._id,});

       try {
      await sendEmail({
        to: req.user.email,
        subject: "KYC Submission Received",
        text: "Your KYC has been submitted successfully. We will review it and notify you once it is approved.",
      });
    } catch (emailErr) {
      console.log("Error sending KYC submission email:", emailErr);
      // don't fail the request just because email failed
    }

       return res.status(201).json({
      message: "KYC submitted successfully",
      data: kycsubmission,
    });


    } catch (error) {
        console.log("error",error);
        return res.status(500).json({
            message: "server is error while submited the kyc"
        })
        
    }
}







