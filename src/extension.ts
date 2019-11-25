import * as vscode from 'vscode';

// Each extension should export from its main file a function named activate(), 
// which VS Code will invoke only once when any of the activationEvents described in the package.json file occur.
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "my-demo" is now active!');
	require('./sample/1-helloWorld')(context);
	require('./sample/api')(context);

	require('./sample/2-wordsCount')(context);
	require('./sample/3-wordCounterUp')(context);
	require('./sample/4-hoverAndToDefinition')(context);
	require('./sample/5-consoleLogger')(context);
}

// If an extension makes use of OS resources (e.g. spawns processes), 
// the extension can export from its main file a function named deactivate() where it can do clean-up work and VS Code will invoke that function on shutdown.
export function deactivate() {}

/** 1、关于销毁
 * 一个插件在激活的时候传入一个有Disposable集合类型的subscriptions的ExtensionContext对象，你的插件可以向这个集合中添加自己的可销毁对爱哪个，VS Code将在插件关闭时销毁这些对象。
 * 许多创建工作空间或者UI对象的VS Code的API(类似registerCommand)都会返回一个Disposable对象，插件可以调用这些销毁接口来从VS Code里移除这些元素。
 */
