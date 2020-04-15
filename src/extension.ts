import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "sailboat" is now active!');

  let openSailsCoreConcepts = vscode.commands.registerCommand(
    "sailboat.openSailsCoreConcepts",
    () => {
      vscode.env.openExternal(
        vscode.Uri.parse("https://sailsjs.com/documentation/concepts")
      );
    }
  );

  let openSailsAPIReference = vscode.commands.registerCommand(
    "sailboat.openSailsAPIReference",
    () => {
      vscode.env.openExternal(
        vscode.Uri.parse("https://sailsjs.com/documentation/reference")
      );
    }
  );

  context.subscriptions.push(openSailsCoreConcepts);
  context.subscriptions.push(openSailsAPIReference);
}

export function deactivate() {}
