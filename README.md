# Toilet Paper

Toilet Paper is a playful library designed to provide convenient methods for creating and managing documents in Google Drive using Google Apps Script.

## Features

- **Document Creation:** Easily generate new documents with customizable names and specify their storage location within Google Drive.
- **Folder Management:** Seamlessly manage folders and subfolders within Google Drive to organize your documents effectively.
- **Duplicate Detection:** Prevent the creation of duplicate documents by checking for existing files with the same name in the target folder.
- **Logging:** Utilize built-in logging functionality to track the creation process and monitor document and folder operations.

## Installation

Toilet Paper is a Google Apps Script library. To use it, follow these steps:

1. Open your Google Apps Script project.
2. Click on `Resources` > `Libraries`.
3. In the `Add a library` field, enter the script ID `1dOeIbk9S0Jx1W8CpNtjmSSLIRml6PMu2MKj4ryfr_Jhb_T992I7TnicG`.
4. Click `Add`.
5. Select the latest version from the dropdown.
6. Click `Save`.

## Usage

Toilet Paper offers a simple API for creating and managing documents. Here's how you can use it:

```javascript
// Create a new document
ToiletPaper.Tissuer.createGoogleDocument("MyDocument", "MyFolder/");
```

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
