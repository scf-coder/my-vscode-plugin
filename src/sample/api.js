import * as vscode from 'vscode';
import * as path from 'path'

module.exports = function(context) {
    let disposable = vscode.commands.registerCommand('extension.apiTest', (uri) => {

        // 1、注册命令：vscode.commands.registerCommand('lucky.hello', () => {}); 配合在package.json中配置
        
        // 2、命令执行
        vscode.commands.executeCommand(
            "vscode.open", // vscode.open为vscode自带命令（也可以使用自己的命令）
            vscode.Uri.parse(`https://baidu.com`)
        );

        // 3、获取所有命令
        vscode.commands.getCommands().then(allCommands => {
            console.log('所有命令：', allCommands);
        });
        // vscode内部有一些复杂命令，所谓复杂命令,一些需要特殊参数并且通常有返回值、执行一些诸如跳转到定义、执行代码高亮等特殊操作。
        // 参见 https://code.visualstudio.com/api/references/commands

        // 4、一些显示命令
        vscode.window.showInformationMessage("info！");
        vscode.window.showErrorMessage("Error！");
        vscode.window.setStatusBarMessage("王一博给了你一个鼓励！");
        //带回调的提示
        vscode.window
        .showInformationMessage("是否要做什么.....？", "yes", "no", "close")
        .then(result => {
        if (result === "yes") {
        } else if (result === "close") {
            // 。。。
        }
        });

        // 5、创建一个终端并输入命令
        let terminalA = vscode.window.createTerminal({ name: "Terminal Name" });
        terminalA.show(true);
        terminalA.sendText("yarn"); //输入命令


        // 6、编辑器内容修改
        vscode.window.activeTextEditor.edit(editBuilder => {
            const selectedEnd = new vscode.Position(vscode.window.activeTextEditor.document.lineCount + 1, 0); //行-列 要替换的位置 全部
            const text = '我是新替换的内容';
            editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), selectedEnd), text);
        });

    });
    context.subscriptions.push(disposable);
};



