import * as vscode from 'vscode';

// 简单的 显示编辑器中选中的字符数
module.exports = function(context:vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('extension.wordsCount', () => {
	    let editor = vscode.window.activeTextEditor;
        if(!editor) {
            return ; //没有打开的文件
        }

        let selection = editor.selection;
        let text = editor.document.getText(selection);
        vscode.window.showInformationMessage('Selected characters：' + text.length);
	});
	context.subscriptions.push(disposable);
};