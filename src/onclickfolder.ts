import * as vscode from 'vscode';
module.exports = function(context: { subscriptions: vscode.Disposable[]; }) {
    context.subscriptions.push(vscode.commands.registerCommand('onclickfolder.event', (uri) => {
        vscode.window.showInformationMessage(`点击了文件夹：`+uri.fsPath);
        console.log("点击了文件夹");
    }));
};

