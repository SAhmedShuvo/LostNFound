module.exports = (postedByUserName, itemName, claimer) => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
  <table width="100%">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="420" style="background:#ffffff;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.08);">

          <tr>
            <td style="padding:20px;background:#2f80ed;color:#ffffff;text-align:center;border-radius:8px 8px 0 0;">
              <h3 style="margin:0;">Item Claimed Successfully</h3>
            </td>
          </tr>

          <tr>
            <td style="padding:24px;color:#333;">
              <p>Hello <b>${postedByUserName}</b>,</p>

              <p>
                Your item <b>${itemName}</b> has been successfully claimed.
              </p>

              <p style="margin-top:16px;">
                Claimant contact details:
              </p>

              <table style="font-size:14px;">
                <tr>
                  <td><b>Name:</b></td>
                  <td>${claimer.name}</td>
                </tr>
                <tr>
                  <td><b>Email:</b></td>
                  <td>${claimer.email}</td>
                </tr>
              </table>

              <p style="font-size:13px;color:#666;margin-top:16px;">
                Please coordinate to complete the item return.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:14px;text-align:center;font-size:12px;color:#999;border-top:1px solid #eee;">
              Thank you for helping make Lost & Found safer
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
