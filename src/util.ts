import * as vscode from "vscode";
import * as fs from 'fs';

export const getFilePath = (text: string, document: vscode.TextDocument) => {
    const controllersPath = '/api/controllers'
    let filePath = vscode.workspace.getWorkspaceFolder(document.uri)?.uri.fsPath + controllersPath;
    let splitted = text.replace(/'|"/g, "").split("/");
    let controllerFileName = splitted[0];
    let actionFileName = splitted[1] + ".js";
    console.log(text);
    let targetPath = filePath + "/" + controllerFileName + '/' + actionFileName;
    console.log(targetPath);
    if (fs.existsSync(targetPath)) {
        return targetPath
    }

    let dirItems = fs.readdirSync(filePath);

    for (let item of dirItems) {
        targetPath = filePath + '/' + item + '/' + actionFileName;
        if (fs.existsSync(targetPath)) {
            return targetPath;
        }
    }
    return null;
}