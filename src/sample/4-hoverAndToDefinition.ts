import * as vscode from 'vscode'
import * as path from 'path'
import * as fs from 'fs'

/**
 * 鼠标悬停提示，当鼠标停在package.json的dependencies或者devDependencies时，
 * 【1 - 功能：跳转到定义】
 * 【2 - 功能：鼠标悬浮展示自定义信息】
 */

module.exports = function(context:vscode.ExtensionContext) {
    
    // 【1 - 功能：跳转到定义】
    context.subscriptions.push(vscode.languages.registerDefinitionProvider('json', {
        provideDefinition:eventTest
    }));


    // 【2 - 功能：鼠标悬浮展示自定义信息】
    // context.subscriptions.push(vscode.languages.registerHoverProvider('json', {
    //     provideHover:eventTest
    // }));

};

function eventTest(document: vscode.TextDocument, position: vscode.Position) {
    const fileName   = document.fileName; // 当前文件名
    const workDir = path.dirname(fileName); // 当前文件所在目录
    const word = document.getText(document.getWordRangeAtPosition(position));// 当前光标所在单词

    if (/\/package\.json$/.test(fileName)) {
        const json = document.getText();
        if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
            let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;
            if (fs.existsSync(destPath)) {
                const content = require(destPath);
                console.log('hover已生效');
                // 【1 - 功能：跳转到定义】
                return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));

                // 【2 - 功能：鼠标悬浮展示自定义信息】
                // hover内容支持markdown语法
                // return new vscode.Hover(`* **名称**：${content.name}\n* **版本**：${content.version}\n* **许可协议**：${content.license}`);
            }
        }
    }
}
// [注：有时候某个字段可能本身已经有提示内容了，如果我们仍然给他注册了hover的话，那么vscode会自动将多个hover内容合并一起显示。]