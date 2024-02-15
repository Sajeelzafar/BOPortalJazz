const otpGenerator = require("otp-generator");
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
