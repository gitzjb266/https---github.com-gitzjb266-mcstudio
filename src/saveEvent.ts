import * as vscode from 'vscode';
module.exports = function(context: { subscriptions: any[]; }) {
    vscode.workspace.onDidSaveTextDocument(
		event =>{
			let uri2 = event.uri.fsPath;
			vscode.window.showInformationMessage('文件保存触发事件,文件地：'+uri2);
			console.log("lineCount:"+event.lineCount);
		}
	);
};

