import * as vscode from 'vscode';
import { FileExplorer } from './fileExplorer';
export async function activate(context: vscode.ExtensionContext) {

	console.log("mc_stadio 加载成功！");
	require("./saveEvent")(context);   //保存文件时触发事件
	require("./onclickfolder")(context); //点击获取文件位置
	require("./openDialog")(context);//打开文件    自定义树加载     选择服务
	require("./initCount")(context);//统计文字
	require("./withProgress")(context);//进入
	new FileExplorer(context);
}

export function deactivate() {}

