import * as vscode from 'vscode';
import { createWebView } from './CreateWebView';
import * as  fs from "fs";
import { MyTreeData } from './MyTreeData';
import { Dependency } from './nodeDependencies';
module.exports = function(context: vscode.ExtensionContext) {

	vscode.commands.registerCommand('nodeDependencies.addEntry', () => vscode.window.showInformationMessage(`Successfully called add entry.`));
	vscode.commands.registerCommand('nodeDependencies.editEntry', (node: Dependency) => vscode.window.showInformationMessage(`Successfully called edit entry on ${node.label}.`+context.extensionUri.fsPath));


	//打开文件夹
    context.subscriptions.push(vscode.commands.registerCommand('onclickfolder.showDialog', (uri) => {
		vscode.window.showOpenDialog({
	  canSelectMany: true,
	  filters: { Images: ['png', 'jpg'] }
	})
	.then(result => {
	  if (result) {
		console.log(`${result.length} files have been selected`);
	  }
	});
	}));
	//打开文件夹

	
	//选择服务
	let disposable = vscode.commands.registerCommand('onclickfolder.checkServer', function () {
        vscode.window.showQuickPick(
            [
		
                "服务1",
                "服务2",
                "服务3",
                "服务4"
            ],
            {
                canPickMany:false,
                ignoreFocusOut:true,
                matchOnDescription:true,
                matchOnDetail:true,
                placeHolder:'温馨提示，请选择你要下载的服务'
            })
            .then(function(msg){
				vscode.window.showInformationMessage(`返回：`+msg);
				const webView = createWebView(context, vscode.ViewColumn.Active, ''+msg);
				context.subscriptions.push(webView);
        })
    });
	context.subscriptions.push(disposable);
	//选择服务	



	//加载自定树
	context.subscriptions.push(vscode.commands.registerCommand('TreeViewTest_One.opendir', () => {
		let options = {
			canSelectFiles: true,		//是否可选择文件
			canSelectFolders: true,		//是否可选择目录
			canSelectMany: false,		//是否可多选
			defaultUri: vscode.Uri.file("D:/VScode"),	//默认打开的文件夹
			openLabel: '选择文件夹'
		};
		vscode.window.showOpenDialog(options).then(result => {
			if(result === undefined){
				vscode.window.showInformationMessage("can't open dir.");
			}
			else{
				//vscode.window.showInformationMessage("open dir: " + result.toString());
				//TODO: 这里 URI 转本地路径，暂时先这样，以后再改
				var loadUri = result[0].path.toString();
				var loadDir = loadUri.substr(1, loadUri.length);
				vscode.window.showInformationMessage("open dir: " + loadDir);
				vscode.window.registerTreeDataProvider('treeViewOne', new MyTreeData(loadDir));
				
			}
		});
	}));
	//注册命令 MyTreeItem.itemClick
	context.subscriptions.push(vscode.commands.registerCommand('MyTreeItem.itemClick', (label, filePath) => {
		//TODO：可以获取文件内容显示出来，这里暂时只打印入参
		//console.log("label : " + label);
		//console.log("filePath : " + filePath);
		
		let files = fs.statSync(filePath);
		if(!files.isDirectory()){
			editOpenedFileInWindow(filePath);
		}
	}));
	//加载自定树

};


export function editOpenedFileInWindow(filePath: string) {
    // 获取 vscode.TextDocument对象
    vscode.workspace.openTextDocument(filePath).then(doc => {
        // 获取 vscode.TextEditor对象
        vscode.window.showTextDocument(doc).then(editor => {
            // 获取 vscode.TextEditorEdit对象， 然后进行字符处理
            editor.edit(editorEdit => {
                // 这里可以做以下操作: 删除, 插入, 替换, 设置换行符
                // 以插入字符串为例: "Hello Word\r\n"
                //editorEdit.insert(new vscode.Position(0, 0), "Hello Word\r\n");
            }).then(isSuccess => {
                if (isSuccess) {
                    console.log("Edit successed");
                } else {
                    console.log("Edit failed");
                }
            }, err => {
                console.error("Edit error, " + err);
            });
        });
    }).then(undefined, err => {
        console.error(err);
    });
}

