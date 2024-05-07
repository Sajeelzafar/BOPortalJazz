const otpGenerator = require("otp-generator");
const axios = require("axios");
const { verifyUser } = require("../database");

class otpService {
  async generateOTP() {
    const sms_otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const email_otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const ttl = 1000 * 60 * 2; //2 minutes
    const expiration_time = (Date.now() + ttl) / 1000;
    return { sms_otp, email_otp, expiration_time };
  }

  async sendOTP(otp_details, user_details) {
    try {
      await axios
        .post(
          "http://notification-microservice-qa-consumer.apps.stgjcocp.jazzcash.com.pk/rest/api/v1/notification/sms",
          {
            msisdn: user_details.phoneNumber,
            customerType: "consumer",
            template: "SINGLE_PARAMETER",
            data: [
              {
                key: "smsBody",
                value: `Your OTP is ${otp_details.sms_otp}`,
              },
            ],
          },
          {
            withCredentials: true,
            headers: {
              "X-Client-ID": "69b12b2872021d2488c598d2388ace2e",
              "X-CLIENT-SECRET": "fcbd7e53428d318af45fbfc1d6f1837c",
              "Content-Type": "application/json",
              Cookie:
                "TS01eb50c3=019409637e74cdfc9a0e76ff35ca5c87255e745c1b78f8187d02ce4f421ffc5799688d1827f70b5928e3e8a3704cc0376337444d5d; TS01af21b1=019409637e5fbc421b3f259aadf9ca8e8dcd48866186fedc05c6e0c755655ad5f451262c10966594af795846da06940b4c1b0ef7ef",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .post(
          "http://notification-microservice-qa-consumer.apps.stgjcocp.jazzcash.com.pk/rest/api/v1/notification/email",
          {
            to: user_details.email,
            subject: "JazzCash Login Alert",
            html: "",
            template: "LOGIN_ALERT",
            data: [
              {
                key: "htmlTemplate",
                value:
                  `<table border='0' cellpadding='0' cellspacing='0' align='center' width='600' style='margin:0 auto;width:600px;border:1px solid #aaa;font-family:tahoma,arial;font-size:14px'><tbody><tr><td><a href= http://www.PMCL.com  target='_blank' data-saferedirecturl= https://www.google.com/url?q=http://www.PMCL.com&amp;source=gmail&amp;ust=1598110181753000&amp;usg=AFQjCNFhJqOgwPn9l1uitpBeFxonYM9uKQ ><img src= https://jazzcash.com.pk/assets/uploads/2021/09/webbanner.png  width='600' height='89' border='0' style='display:block;border:0;width:600px;height:89px' class='CToWUd'></a></td></tr><tr><td><table cellpadding='25' cellspacing='0' border='0' width='100%'><tbody><tr><td style='font-family:tahoma,arial;font-size:14px;text-align:left'><p><b>Dear JazzCash Customer,</b></p><p>You have successfully logged in</p><p>Your otp is ${otp_details.email_otp}</p></td></tr><tr><td style='font-family:tahoma,arial;font-size:14px;text-align:left'>Kind Regards ,<br>JazzCash</td></tr></tbody></table></td></tr><tr><td>&nbsp;</td></tr><tr><td><table cellpadding='25' cellspacing='0' border='0' width='100%'><tbody><tr><td style='font-family:tahoma,arial;font-size:11px;text-align:left;color:#727272'><p><b>Disclaimer:</b></p><p>This is a system generated email.</p><p>The communication/message (including any attachments) may contain information that is privileged and/or confidential under applicable laws. If you are not the intended recipient or such recipient’s employee or agent, you are hereby notified that any dissemination, copy or disclosure of this communication is strictly prohibited. If you have received this communication without making any copy. Any unauthorized use or communication of this communication/message in whole or in part is strictly prohibited. Please note that emails are susceptible to change.</p><p>Mobilink Microfinance Bank will not be liable for the improper or incomplete transmission of the information contained in this communication nor for any delay in its receipts or damage to your system. Mobilink Microfinance Bank does not guarantee that the integrity of this communication has been maintained nor that this communication is free of viruses, interceptions or interference.</p><p>Thank you<br>JazzCash</p></td></tr></tbody></table></td></tr><tr><td><a href= http://www.PMCL.com  target='_blank' data-saferedirecturl= https://www.google.com/url?q=http://www.PMCL.com&amp;source=gmail&amp;ust=1598110181753000&amp;usg=AFQjCNFhJqOgwPn9l1uitpBeFxonYM9uKQ ><img src= https://jazzcash.com.pk/assets/uploads/2021/09/webbanner.png  width='600' height='64' border='0' style='display:block;border:0;width:600px;height:79px' class='CToWUd'></a><font color='#888888'></font></td></tr></tbody></table>`,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Cookie:
                "b7f32f13195b96554257f9e7ad07cdc3=1cf1039d566d0171541f978bdfed3404",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      throw error;
    }
  }

  async verifyOTP(input_otp, actual_otp) {
    if (Date.now() < actual_otp.expiration_time) {
      if (
        input_otp.email_otp === actual_otp.email_otp &&
        input_otp.sms_otp === actual_otp.sms_otp
      ) {
        await verifyUser(input_otp.id);
        return "Success";
      }
      return "Either SMS or Email OTP do not match";
    } else {
      return "Time expired";
    }
  }
}

module.exports = new otpService();
