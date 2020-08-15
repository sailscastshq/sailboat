import * as vscode from "vscode";
import { docsLinks } from "./docsLinks";
import { sailsLiftCommands } from "./sailsLiftCommands";
import { getFilePath } from "./util";
import { LinkProvider } from "./link";

export function activate(context: vscode.ExtensionContext) {
  console.log("Sailboat is active now ⛵");

  // Getting a list of commands(these open links to the Sails docs)
  docsLinks.map((docsLink) => {
    let disposable = vscode.commands.registerCommand(docsLink.command, () => {
      vscode.env.openExternal(vscode.Uri.parse(docsLink.url));
    });
    context.subscriptions.push(disposable);
  });

  sailsLiftCommands.map((liftCommand) => {
    let disposable = vscode.commands.registerCommand(
      liftCommand.command,
      async () => {
        try {
          await vscode.commands.executeCommand(
            "workbench.action.terminal.sendSequence",
            { text: liftCommand.text }
          );
        } catch (error) {
          vscode.window.showErrorMessage(error);
        }
      }
    );
    context.subscriptions.push(disposable);
  });

  let hover = vscode.languages.registerHoverProvider(
    { scheme: "file", language: "javascript" },
    {
      provideHover(document, position, _) {
        if (document.uri.path.includes("config/routes")) {
          const regexPattern = /((?:'|")[\w\-]+\/([\w\-]+)(?:'|"))/;
          const range = document.getWordRangeAtPosition(
            position,
            regexPattern
          ) as vscode.Range;

          if (range) {
            let filePath = getFilePath(document.getText(range), document);
            let workspaceFolder = vscode.workspace.getWorkspaceFolder(
              document.uri
            ) as vscode.WorkspaceFolder;
            if (filePath !== null) {
              return new vscode.Hover(
                workspaceFolder.name +
                  filePath.replace(workspaceFolder.uri.fsPath, "")
              );
            }
          }
          return;
        }
      },
    }
  );
  let link = vscode.languages.registerDocumentLinkProvider(
    { scheme: "file", language: "javascript" },
    new LinkProvider()
  );
  context.subscriptions.push(hover);
  context.subscriptions.push(link);
}

export function deactivate() {}
