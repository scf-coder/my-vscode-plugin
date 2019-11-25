import * as vscode from 'vscode';

module.exports = function(context:vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.helloWorld', (uri) => {
        vscode.window.showInformationMessage('Hello World!'); //消息提示框
	});
    // 所有注册类的API执行后都需要将返回结果放到 context.subscriptions中去
	context.subscriptions.push(disposable);
};

/** 关于uri
 *  回调函数接受一个可选参数 uri：
 *  当从资源管理器中右键执行命令时会把当前选中资源路径uri作为参数传过；
    当从编辑器中右键菜单执行时则会将当前打开文件路径URI传过去；
    当直接按Ctrl+Shift+P执行命令时，这个参数为空；
**/

