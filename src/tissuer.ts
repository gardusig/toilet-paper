export namespace Tissuer {
  export function createDocument(folderPath: string, docName: string): void {
    const targetFolder = getOrCreateFolderByPath(folderPath);
    if (doesFileExists(docName, targetFolder)) {
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

  export function appendToFile(
    folderPath: string,
    fileName: string,
    content: string,
    heading?: GoogleAppsScript.Document.ParagraphHeading,
  ): void {
    const file = findFile(folderPath, fileName);
    const doc = DocumentApp.openById(file.getId());
    const body = doc.getBody();

    if (heading) {
      body.appendParagraph(content).setHeading(heading);
    } else {
      body.appendParagraph(content);
    }

    doc.saveAndClose();
    Logger.log(
      `Content appended to document "${fileName}" in folder "${folderPath}"`,
    );
  }

  function getOrCreateFolderByPath(
    path: string,
  ): GoogleAppsScript.Drive.Folder {
    const parts = path.split("/");
    let currentFolder = DriveApp.getRootFolder();
    parts.forEach((part) => {
      currentFolder = findOrCreateFolder(currentFolder, part);
    });
    Logger.log(`Folder path "${path}" retrieved or created successfully`);
    return currentFolder;
  }

  function findOrCreateFolder(
    parentFolder: GoogleAppsScript.Drive.Folder,
    folderName: string,
  ): GoogleAppsScript.Drive.Folder {
    const folderIterator = parentFolder.getFoldersByName(folderName);
    if (folderIterator.hasNext()) {
      const existingFolder = folderIterator.next();
      Logger.log(`Folder "${existingFolder.getName()}" found`);
      return existingFolder;
    }
    const newFolder = parentFolder.createFolder(folderName);
    Logger.log(`Folder "${newFolder.getName()}" created`);
    return newFolder;
  }

  function doesFileExists(
    fileName: string,
    targetFolder: GoogleAppsScript.Drive.Folder,
  ): boolean {
    const files = targetFolder.getFilesByName(fileName);
    if (files.hasNext()) {
      const existingFile = files.next();
      Logger.log(`Document already exists: ${existingFile.getUrl()}`);
      return true;
    }
    return false;
  }

  function findFile(
    folderPath: string,
    fileName: string,
  ): GoogleAppsScript.Drive.File {
    const targetFolder = getOrCreateFolderByPath(folderPath);
    const files = targetFolder.getFilesByName(fileName);
    if (!files.hasNext()) {
      throw new Error(
        `Document "${fileName}" not found in folder: "${folderPath}"`,
      );
    }
    Logger.log(`Document "${fileName}" found in folder "${folderPath}"`);
    return files.next();
  }
}
