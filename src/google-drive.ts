export namespace GoogleDrive {
  export function getOrCreateFolderByPath(
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

  export function findOrCreateFolder(
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

  export function doesFileExists(
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

  export function findFile(
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
