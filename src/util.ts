namespace ToiletPaper {
  export class Util {
    static createDoc(docName: string, folderPath: string): void {
      const targetFolder = this.getOrCreateFolder(folderPath);
      if (this.fileAlreadyExists(docName, targetFolder)) {
        return;
      }
      const doc = DocumentApp.create(docName);
      const file = DriveApp.getFileById(doc.getId());
      file.moveTo(targetFolder);
      Logger.log(
        `Document created:` +
          `\n\tURL: ${doc.getUrl()}` +
          `\n\tName: ${doc.getName()}` +
          `\n\tLocation: ${targetFolder.getName()}`,
      );
    }

    private static getOrCreateFolder(
      path: string,
    ): GoogleAppsScript.Drive.Folder {
      const parts = path.split("/");
      let folder = DriveApp.getRootFolder();
      for (const part of parts) {
        folder = this.getNextFolder(folder, part);
      }
      Logger.log(
        `Folder ${folder.getName()} retrieved or created successfully`,
      );
      return folder;
    }

    private static getNextFolder(
      folder: GoogleAppsScript.Drive.Folder,
      part: string,
    ): GoogleAppsScript.Drive.Folder {
      const folderIterator = folder.getFoldersByName(part);
      if (folderIterator.hasNext()) {
        const nextFolder = folderIterator.next();
        Logger.log(`Folder ${nextFolder.getName()} found`);
        return nextFolder;
      }
      const createdFolder = folder.createFolder(part);
      Logger.log(`Folder ${createdFolder.getName()} created`);
      return createdFolder;
    }

    private static fileAlreadyExists(
      docName: string,
      targetFolder: GoogleAppsScript.Drive.Folder,
    ): boolean {
      const files = targetFolder.getFilesByName(docName);
      if (!files.hasNext()) {
        return false;
      }
      const existingFile = files.next();
      Logger.log(`Document already exists: ${existingFile.getUrl()}`);
      return true;
    }
  }
}
