import { GoogleDocs } from "./google-docs";
import { GoogleDrive } from "./google-drive";

export function createDocument(folderPath: string, docName: string): void {
  const targetFolder = GoogleDrive.getOrCreateFolderByPath(folderPath);
  if (GoogleDrive.doesFileExists(docName, targetFolder)) {
    Logger.log(
      `Document "${docName}" already exists in folder: "${targetFolder.getName()}"`,
    );
    return;
  }
  const doc = DocumentApp.create(docName);
  const file = DriveApp.getFileById(doc.getId());
  file.moveTo(targetFolder);
  Logger.log(
    `Document created successfully:` +
      `\n\tURL: ${doc.getUrl()}` +
      `\n\tName: ${doc.getName()}` +
      `\n\tLocation: ${targetFolder.getName()}`,
  );
}

export function appendParagraphToFile(
  folderPath: string,
  fileName: string,
  content: string,
  heading?: GoogleAppsScript.Document.ParagraphHeading,
): void {
  const file = GoogleDrive.findFile(folderPath, fileName);
  const doc = DocumentApp.openById(file.getId());
  const body = doc.getBody();
  const paragraph =
    body.getNumChildren() === 0
      ? body.insertParagraph(0, content)
      : body.appendParagraph(content);
  GoogleDocs.formatParagraph(paragraph);
  if (heading !== undefined) {
    paragraph.setHeading(heading);
    const emptyParagraph = body.appendParagraph("");
    GoogleDocs.formatParagraph(emptyParagraph);
  }
  doc.saveAndClose();
  Logger.log(
    `Content appended to document "${fileName}" in folder "${folderPath}"`,
  );
}
