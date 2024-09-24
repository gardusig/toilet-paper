# Toilet Paper

Toilet Paper is a playful library designed to provide convenient methods for creating and managing documents in Google Drive using Google Apps Script.

## Installation

Toilet Paper is a Google Apps Script library. To use it, follow these steps:

1. Open your Google Apps Script project.
2. Click on `Resources` > `Libraries`.
3. In the `Add a library` field, enter the script ID `1dOeIbk9S0Jx1W8CpNtjmSSLIRml6PMu2MKj4ryfr_Jhb_T992I7TnicG`.
4. Click `Add`.
5. Select the latest version from the dropdown.
6. Click `Save`.

## Example

Toilet Paper offers a simple API for creating and managing documents. Here's how you can use it:

```javascript
ToiletPaper.createDocument(
    "path/to/folder/", 
    "documentName"
);

ToiletPaper.appendParagraphToFile(
    "path/to/folder", 
    "documentName", 
    "Content to append", 
    DocumentApp.ParagraphHeading.HEADING1
);
```