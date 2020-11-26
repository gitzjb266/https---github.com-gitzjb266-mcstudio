import { window, StatusBarItem, StatusBarAlignment } from 'vscode';
export class WordCount {
  private statusBar !: StatusBarItem ;

  constructor() {

    // 当编辑器中的选择更改时触发的事件
    window.onDidChangeTextEditorSelection(this.updateWordCount,this);

    // 当活动编辑器 发生更改时将触发的事件
    window.onDidChangeActiveTextEditor(this.updateWordCount, this);
  }

  public updateWordCount() {
    if(!this.statusBar) {
      this.statusBar  = window.createStatusBarItem(StatusBarAlignment.Left);
    }

    // 获取当前活动编辑器
    let editor = window.activeTextEditor;

    // 未获取到当前活动编辑器时退出
    if(!editor) {
      this.statusBar.hide();
      return;
    }

    // 获取当前文档的全部信息
    let doc = editor.document;

    let languageIdResult = doc.languageId;
    // 用来读取当前文件的语言 ID，判断是否是 md 文档
    if(languageIdResult === 'javascript' || languageIdResult === 'html' || languageIdResult === 'css'
    || languageIdResult === 'typescript' || languageIdResult === 'css') {
      let textNum = doc.getText().replace(/[\r\n\s]+/g, '').length;
      this.statusBar.text = textNum === 0 ? `目前还没有文字～` : `$(pencil)已经输出 ${textNum} 个字啦！！！`;
      this.statusBar.show();
    } else {
      this.statusBar.hide();
    }
  }

  // 销毁对象和自由资源
  dispose() {
		this.statusBar.dispose();
	}
}