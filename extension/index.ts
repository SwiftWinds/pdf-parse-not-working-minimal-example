import { commands, ExtensionContext, window } from "vscode";
import { MainPanel } from "./views/panel";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse";

export function activate(context: ExtensionContext) {
  // Add command to the extension context
  context.subscriptions.push(
    commands.registerCommand("hello-world.showHelloWorld", async () => {
      MainPanel.render(context);
    })
  );

  // Add command to parse a pdf file
  context.subscriptions.push(
    commands.registerCommand("hello-world.parsePdf", async () => {
      // show a file picker
      const file = await window.showOpenDialog({
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: false,
      });

      if (!file) {
        return;
      }

      // Read and parse PDF using pdf-parse
      const dataBuffer = fs.readFileSync(file[0].fsPath);
      const data = await pdf(dataBuffer);

      // Print the text content to the console
      console.log(data.text);
    })
  );
}

export function deactivate() {}
