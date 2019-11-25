import * as vscode from 'vscode';
import {window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument} from 'vscode';

// 监测markdown文件统计单词数目
module.exports = function(context:vscode.ExtensionContext) {

    // 【1 - 通过命令展示统计字符数】
    // let wordCounter = new WordCounter();
    // var disposable = commands.registerCommand('extension.wordsCountUp', () => {
    //     wordCounter.updateWordCount();
    // });
    // context.subscriptions.push(disposable);
    // context.subscriptions.push(wordCounter);
    


    // 【2 - 订阅 监测文件变化 修改统计字符数】
    let wordCounter:any = new WordCounter();
    let controller = new WordCounterController(wordCounter);
    // 所有注册类的API执行后都需要将返回结果放到 context.subscriptions中去
    context.subscriptions.push(controller);
    context.subscriptions.push(wordCounter);
};

class WordCounter {
    private _statusBarItem: StatusBarItem | any;

    public updateWordCount() {
        // 创建所需要的状态栏元素
        if(!this._statusBarItem) {
            this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
        }

        // 得到当前的文本编辑器
        let editor = window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide();
            return;
        }
        let doc = editor.document;
        if (doc.languageId === "markdown") {
            let wordCount = this._getWordCount(doc);

            // 更新状态栏
            this._statusBarItem.text = wordCount !== 1 ? `$(pencil) ${wordCount} Words` : '$(pencil) 1 Word';
            this._statusBarItem.show();
        } else { 
            this._statusBarItem.hide();
        }
    }

    public _getWordCount(doc: TextDocument): number {

        let docContent = doc.getText();

        // 去除多余的空格以方便与分割
        docContent = docContent.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ');
        docContent = docContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        let wordCount = 0;
        if (docContent != "") {
            wordCount = docContent.split(" ").length;
        }
        return wordCount;
    }
}



class WordCounterController {
    private _wordCounter: WordCounter | any;
    private _disposable: Disposable | any;

    constructor(wordCounter: WordCounter) {
        this._wordCounter = wordCounter;
        this._wordCounter.updateWordCount();

        // 订阅选择区域变化和编辑器激活事件
        let subscriptions: Disposable[] = [];
        // 当光标位置改变时触发这个事件
        window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
        // 当被激活的编辑器发生改变时触发这个事件
        window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions);

        // 更新当前文件的的单词数
        this._wordCounter.updateWordCount();

        // 从这些事件订阅中创建一个Disposable类型的集合
        this._disposable = Disposable.from(...subscriptions);
    }
    dispose() {
        this._disposable.dispose();
    }

    private _onEvent() {
        this._wordCounter.updateWordCount();
    }
}






// 注意需要修改 package.json中的触发条件 需要监测多个或者一打开就自动启动时，可使用*


