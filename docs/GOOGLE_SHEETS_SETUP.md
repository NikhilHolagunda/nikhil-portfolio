# Google Sheets Contact Form Setup Guide

This guide explains how to connect the portfolio's contact form to a Google Sheet so submissions are automatically saved.

---

## Step 1: Create a Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name it: **Portfolio Contact Submissions**
3. In the first row (headers), add these columns:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Type`
   - E1: `Message`

---

## Step 2: Create the Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code and paste this:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.type || "",
      data.message || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("Contact form endpoint is active.")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

3. Click **Save** (Ctrl+S)
4. Name the project: **Portfolio Contact Handler**

---

## Step 3: Deploy as Web App

1. Click **Deploy > New Deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Configure:
   - **Description:** Portfolio contact form handler
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
4. Click **Deploy**
5. Click **Authorize access** and follow the Google sign-in prompts
   - If you see "This app isn't verified," click **Advanced > Go to Portfolio Contact Handler (unsafe)**
   - This is safe — it's your own script
6. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

---

## Step 4: Update the Portfolio Code

1. Open `src/components/Portfolio.tsx`
2. Find this line (search for `PLACEHOLDER_SCRIPT_ID`):
   ```typescript
   await fetch("https://script.google.com/macros/s/PLACEHOLDER_SCRIPT_ID/exec", {
   ```
3. Replace the entire URL with your Web App URL:
   ```typescript
   await fetch("https://script.google.com/macros/s/AKfycbx.../exec", {
   ```
4. Save, commit, and push:
   ```bash
   git add src/components/Portfolio.tsx
   git commit -m "Connect contact form to Google Sheets"
   git push origin master
   ```

---

## Step 5: Test

1. Go to your live portfolio
2. Fill out the contact form and click "Send Proposal"
3. Check your Google Sheet — the submission should appear as a new row

---

## Troubleshooting

### Form says "Sent!" but nothing in the sheet
- The `mode: "no-cors"` means we can't read the response. Check:
  1. Open your Apps Script deployment URL directly in a browser — you should see "Contact form endpoint is active."
  2. Check the Apps Script execution log: **Extensions > Apps Script > Executions**

### "Authorization required" error
- Re-deploy the script and re-authorize. Make sure "Who has access" is set to "Anyone."

### Data appears in wrong columns
- Verify your sheet headers match exactly: `Timestamp`, `Name`, `Email`, `Type`, `Message`

---

## Security Notes

- The Apps Script URL is public but only accepts POST data in a specific format
- No sensitive data is stored in the code — the script URL is not a secret (it's a write-only endpoint)
- Consider adding rate limiting in the Apps Script if you receive spam:
  ```javascript
  // Add at the top of doPost():
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) {
    return ContentService.createTextOutput("Too many requests").setMimeType(ContentService.MimeType.TEXT);
  }
  ```

---

*Last updated: April 15, 2026*
