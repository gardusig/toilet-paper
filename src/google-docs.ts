export namespace GoogleDocs {
  export function formatParagraph(
    paragraph: GoogleAppsScript.Document.Paragraph,
    fontFamily: string = "Roboto",
  ): void {
    paragraph.setAttributes({
      [DocumentApp.Attribute.FONT_FAMILY]: fontFamily,
    });
    paragraph.setAlignment(DocumentApp.HorizontalAlignment.JUSTIFY);
  }
}
