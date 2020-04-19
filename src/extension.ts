import * as vscode from "vscode";
import { docsLinks } from "./docsLinks";
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "sailboat" is now active!');

  // Getting a list of commands(these open links to the Sails docs)
  docsLinks.map((docsLink) => {
    let disposable = vscode.commands.registerCommand(docsLink.command, () => {
      vscode.env.openExternal(vscode.Uri.parse(docsLink.url));
    });
    context.subscriptions.push(disposable);
  });
}

export function deactivate() {}
