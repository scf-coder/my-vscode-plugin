import * as vscode from 'vscode';

// 快捷生成log信息：
module.exports = function(context:vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.consoleLog', () => {
        const editor = vscode.window.activeTextEditor;

        const selection = editor.selection;
        let { start } = selection;
        let curText = editor.document.getText(selection); //选中的文本

		const insertPositon = new vscode.Position(start.line + 1, 0); // 弹出console的位置
		// 获取配置 可自定义间隔符
		const config = vscode.workspace.getConfiguration('myDemo');
        const identifier = config.get('identifier');
        
		editor.edit((TextEditor) => {
			TextEditor.insert(insertPositon, `console.log('${curText}${identifier}', ${curText});\n`);
		});

	});
    
	context.subscriptions.push(disposable);
};

