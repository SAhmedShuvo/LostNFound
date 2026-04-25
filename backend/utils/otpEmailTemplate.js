const otpEmailTemplate = (name, otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lost & Found - One-Time Password</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: Arial, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">

        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td align="center" style="padding: 40px 0;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
                        
                        <tr>
                            <td align="center" style="padding: 25px 0 15px 0; background-color: #1e3a8a; border-radius: 8px 8px 0 0;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: bold; letter-spacing: 1px;">
                                    Lost & Found System
                                </h1>
                                </td>
                        </tr>
                        
                        <tr>
                            <td style="padding: 30px 30px 40px 30px;">
                                
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td style="color: #333333; font-size: 18px; font-weight: bold; padding-bottom: 10px;">
                                            Hello ${name},
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="color: #555555; font-size: 15px; line-height: 24px; padding-bottom: 25px;">
                                            We received a request for email verification. Please use the One-Time Password (OTP) below to proceed:
                                        </td>
                                    </tr>
                                </table>

                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" style="padding: 10px 0;">
                                            <div style="
                                                display: inline-block; 
                                                background-color: #f59e0b; 
                                                color: #1e3a8a; 
                                                font-size: 32px; 
                                                font-weight: 900; 
                                                letter-spacing: 8px; 
                                                padding: 15px 35px; 
                                                border-radius: 6px; 
                                                border: 1px solid #d97706;
                                            ">
                                                ${otp}
                                            </div>
                                        </td>
                                    </tr>
                                </table>

                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td style="color: #555555; font-size: 14px; line-height: 22px; text-align: center; padding-top: 25px;">
                                            <strong style="color: #ef4444;">IMPORTANT:</strong> This code is valid for <strong>2 minutes</strong>.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="color: #777777; font-size: 13px; line-height: 20px; text-align: center; padding-top: 15px;">
                                            If you did not request this verification, please disregard this email.
                                            <br>
                                            **For security, please do not share this code with anyone.**
                                        </td>
                                    </tr>
                                </table>

                            </td>
                        </tr>
                        
                        <tr>
                            <td bgcolor="#f7f7f7" align="center" style="padding: 20px 30px; border-radius: 0 0 8px 8px;">
                                <p style="margin: 0; color: #aaaaaa; font-size: 11px;">
                                    © ${new Date().getFullYear()} Lost & Found System. All rights reserved.
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>

    </body>
    </html>
    `;
};

module.exports = otpEmailTemplate;