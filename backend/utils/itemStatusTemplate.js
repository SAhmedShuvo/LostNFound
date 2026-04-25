module.exports = (name, itemName, status) => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
  <table width="100%">
    <tr>
      <td align="center" style="padding:40px 0;">
        <table width="420" style="background:#ffffff;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.08);">

          <tr>
            <td style="padding:20px;text-align:center;background:#27ae60;color:#ffffff;border-radius:8px 8px 0 0;">
              <h3 style="margin:0;">Item Status Update</h3>
            </td>
          </tr>

          <tr>
            <td style="padding:24px;color:#333;">
              <p>Hello <b>${name}</b>,</p>

              <p>
                Your item <b>${itemName}</b> has been
                <b style="color:${status === "approved" ? "#27ae60" : "#eb5757"};">
                  ${status.toUpperCase()}
                </b>
                by the admin.
              </p>

              <p style="font-size:14px;color:#666;">
                You can now track the item from your dashboard.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:16px;text-align:center;font-size:12px;color:#999;border-top:1px solid #eee;">
              Lost & Found Management System
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
