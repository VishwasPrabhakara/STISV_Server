// ✅ Google Sheets Integration
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

const SHEET_ID = "13WezerzzuaGoWN3mDEpnmZmgj4I0aS9h3i91X7Msw0g"; // ✅ Replace with your actual Google Sheet ID

// ✅ Authenticate using Google Service Account
async function updateGoogleSheet(userData, isAbstractSubmission = false) {
  try {
    console.log("🟢 Google Sheets update triggered for:", userData.email);

    const auth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(SHEET_ID, auth);
    
    await doc.loadInfo();

    // ✅ Selecting sheets
    const registrationSheet = doc.sheetsByTitle["Registration Details"];
    const abstractSheet = doc.sheetsByTitle["Abstract Submissions"];
    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "short",
    });
    
    

    if (!registrationSheet || !abstractSheet) {
      console.error("❌ One or both sheets do not exist. Please create them in Google Sheets.");
      return;
    }

    if (isAbstractSubmission) {
      // ✅ Fetch all rows from Abstract Submissions
      const abstractRows = await abstractSheet.getRows();
      console.log("📌 Total Abstract Submissions:", abstractRows.length);

      // ✅ Find if an abstract with the same email exists
      const existingAbstractRow = abstractRows.find(
        row => row.Email && 
        typeof row.Email === "string" && 
        row.Email.trim().toLowerCase() === userData.email.trim().toLowerCase()
      );

      if (existingAbstractRow) {
        console.log("🔄 Updating existing abstract submission for:", userData.email);
        existingAbstractRow.Abstract_Code = userData.abstractSubmission?.code || "N/A";
        existingAbstractRow.Abstract_Title = userData.abstractSubmission?.title || "N/A";
        existingAbstractRow.Abstract_Scope = userData.abstractSubmission?.scope || "N/A";
        existingAbstractRow.Abstract_PresentingType = userData.abstractSubmission?.presentingType || "N/A";
        existingAbstractRow.Abstract_File = userData.abstractSubmission?.abstractFile || "N/A";
        existingAbstractRow.Abstract_Authors = userData.abstractSubmission?.otherAuthors || "N/A";
        existingAbstractRow.Timestamp = timestamp;

        await existingAbstractRow.save();
        console.log("✅ Abstract submission updated for:", userData.email);
      } else {
        console.log("⚠️ No existing abstract found. Adding a new submission...");
        await abstractSheet.addRow({
          Abstract_Code: userData.abstractSubmission?.abstractCode || "N/A",
          Full_Name: userData.fullName,
          Email: userData.email,
          Abstract_Title: userData.abstractSubmission?.title || "N/A",
          Abstract : userData.abstractSubmission?.mainBody || "N/A",
          Abstract_Scope: userData.abstractSubmission?.scope || "N/A",
          Abstract_PresentingType: userData.abstractSubmission?.presentingType || "N/A",
          Abstract_File: userData.abstractSubmission?.abstractFile || "N/A",
          Abstract_Authors: userData.abstractSubmission?.otherAuthors || "N/A",
          Timestamp: timestamp,
        });
        console.log("✅ New abstract submission added for:", userData.email);
      }
    } else {
      // ✅ Registration Details - Add new users only (no update)
      console.log("📌 Adding new user to Registration Details...");
      await registrationSheet.addRow({
        Email: userData.email,
        Phone: userData.phone,
        Given_Name: userData.givenName,
        Family_Name: userData.familyName || "N/A",
        Full_Name: userData.fullName,
        Country: userData.country,
        Affiliation: userData.affiliation,
        Registered_At: timestamp,
      });
      console.log("✅ Registration details added for:", userData.email);
    }
  } catch (error) {
    console.error("❌ Error updating Google Sheets:", error);
  }
}

// ✅ Ensure function is properly exported
module.exports = { updateGoogleSheet };
