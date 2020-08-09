import * as vscode from "vscode";
import { getFilePath } from "./util";

export class LinkProvider implements vscode.DocumentLinkProvider {
    public provideDocumentLinks(document: vscode.TextDocument, _: vscode.CancellationToken): vscode.ProviderResult<vscode.DocumentLink[]> {
        let documentLinks = [];
        let index = 0;
        const regexPattern = /(\'|\"[\w\-]+\/([\w\-]+)"|')/g;
        while (index < document.lineCount) {
            let line = document.lineAt(index);
            let result = line.text.match(regexPattern);
            if (result != null) {
                for (let item of result) {

                    let filePath = getFilePath(item, document);
                    let splitted = item.replace(/'|"/g, "").split("/")
                    console.log(splitted);
                    if (filePath != null) {
                        let start = new vscode.Position(line.lineNumber, line.text.indexOf(item) + 1);
                        let end = start.translate(0, item.length - 2);
                        let documentLink = new vscode.DocumentLink(new vscode.Range(start, end), vscode.Uri.parse(filePath))
                        documentLinks.push(documentLink);
                    }
                }
            }
            index++;
        }
        return documentLinks;
    }
}