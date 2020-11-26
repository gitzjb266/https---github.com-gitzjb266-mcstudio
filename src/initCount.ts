import * as vscode from 'vscode';
import { WordCount } from './WordCount';
module.exports = function(context: { subscriptions: vscode.Disposable[]; }) {
	let wordCount = new WordCount();
	context.subscriptions.push(vscode.commands.registerCommand('extension.wordCount', () => {
		  wordCount.updateWordCount();
		  vscode.window.showInformationMessage('该插件为显示 md 文档输出的字符，请看 vs Code 左下角~');
	  }));
};

