modules.exports = 
{
	"name": "stacey-test-demo",
	"version": "1.0.0",
	"description": "stacey-test-demo",
	"publisher": "stacey",// 发布者，如果要发布到应用市场的话，这个名字必须与发布者一致
	// 插件的友好显示名称，用于显示在应用市场，支持中文
	"displayName": "VSCode插件demo",
	// 插件应用市场分类，可选值： [Programming Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, SCM Providers, Other, Extension Packs, Language Packs]
	"categories": [
		"Other"
	],
	// 关键字，用于应用市场搜索
	"keywords": ["vscode", "plugin", "demo"],
	"engines": { // 一个至少包含vscode键值对的对象，该键表示的是本扩展可兼容的VS Code的版本，其值不能为*
		"vscode": "^1.27.0" // 表示扩展兼容VS Code的最低版本是1.27.0
	},
	"main": "./src/extension",
	// 【*****】扩展的激活事件数组，可以被哪些事件激活扩展
	"activationEvents": [
		"onCommand:{command}", //eg: extension.sayHello 调用命令时激活
		"onLanguage:{language}", //eg: markdown 打开特定语言文件时激活
		"onDebug", // 调试会话启动前激活
		"workspaceContains:{topleevelfilename}", //eg .editorconfig 当打开一个文件夹并且该文件夹包含顶级文件时 ?
		"*", //whenever
		"。。。" //还有些其他不常用的
	],
	// 【*****】贡献点，整个插件最重要最多的配置项
	"contributes": {
		// 插件配置项 这些选项会被暴露给用户。用户能够在“用户设置”或“工作区设置”面板中设置这些配置选项
		"configuration": {
			"type": "object",
			"title": "stacey-test-demo",
			"properties": {
				// 这里我随便写了2个设置，配置你的昵称
				"staceyTestDemo.yourName": {
					"type": "string",
					"default": "stacey",
					"description": "你的名字"
				},
				// 是否在启动时显示提示
				"staceyTestDemo.showTip": {
					"type": "boolean",
					"default": true,
					"description": "是否在每次启动时显示欢迎提示！"
				}
			}
		},
		// 命令 提供了一个由 command 和 title 字段组成的条目，用于在 命令面板(⇧⌘P) 中调用。
		"commands": [
			{
				"command": "extension.sayHello",
				"title": "Hello World"
			}
		],
		// 菜单 
		"menus": {
			// 编辑器右键菜单
			"editor/context": [
				{
					// 表示只有编辑器具有焦点时才会在菜单中出现
					"when": "editorFocus",
					"command": "extension.sayHello",
					// group 属性定义了菜单项的分组与排序 navigation是一个永远置顶的分组
					"group": "navigation@6",
					// 表示没有按下alt键时，点击右键菜单执行的是command对应的命令，而按下了alt键后执行的是alt对应的命令。
					"alt": "extension.other"
				},
				{
					"when": "editorFocus",
					"command": "extension.demo.getCurrentFilePath",
					"group": "navigation@5"
				},
				{
					// 只有编辑器具有焦点，并且打开的是JS文件才会出现
					"when": "editorFocus && resourceLangId == javascript",
					"command": "extension.demo.testMenuShow",
					"group": "z_commands"
				},
				{
					"command": "extension.demo.openWebview",
					"group": "navigation"
				}
			],
			// 编辑器右上角图标，不配置图片就显示文字
			"editor/title": [
				{
					"when": "editorFocus && resourceLangId == javascript",
					"command": "extension.demo.testMenuShow",
					"group": "navigation"
				}
			],
			// 编辑器标题右键菜单
			"editor/title/context": [
				{
					"when": "resourceLangId == javascript",
					"command": "extension.demo.testMenuShow",
					"group": "navigation"
				}
			],
			// 资源管理器右键菜单
			"explorer/context": [
				{
					"command": "extension.demo.getCurrentFilePath",
					"group": "navigation"
				},
				{
					"command": "extension.demo.openWebview",
					"group": "navigation"
				}
			],
			// 全局的命令面板 当我们在 package.json 中定义命令的时候，它们就会自动显示在命令面板中(⇧⌘P).
			// commandPalette 的菜单选项。它允许你定义一个 when 条件来控制命令是否应该在 命令面板 中显示。
			"commandPalette":[{
				"command": "extension.sayHello",
        		"when": "editorHasSelection" //只有在编辑器中有选中时候才会在命令面板中显示出来。
			}]
		},
		// 快捷键绑定
		"keybindings": [
			{
				"command": "extension.sayHello",
				"key": "ctrl+f10",
				"mac": "cmd+f10",
				"when": "editorTextFocus"
			}
		],		
		// 代码片段
		"snippets": [
			{
				"language": "javascript",
				"path": "./snippets/javascript.json"
			},
			{
				"language": "html",
				"path": "./snippets/html.json"
			}
		],
		// 自定义新的activitybar图标，也就是左侧侧边栏大的图标
		"viewsContainers": {
			"activitybar": [
				{
					"id": "beautifulGirl",
					"title": "美女",
					"icon": "images/beautifulGirl.svg"
				}
			]
		},
		// 自定义侧边栏内view的实现
		"views": {
			// 和 viewsContainers 的id对应
			"beautifulGirl": [
				{
					"id": "beautifulGirl1",
					"name": "国内美女"
				},
				{
					"id": "beautifulGirl2",
					"name": "国外美女"
				},
				{
					"id": "beautifulGirl3",
					"name": "人妖"
				}
			]
		},
		// 图标主题
		"iconThemes": [
			{
				"id": "testIconTheme",
				"label": "测试图标主题",
				"path": "./theme/icon-theme.json"
			}
		]
	},




	// 插件图标，至少128x128像素
	"icon": "{imgUrl}",
	// 同 npm scripts
	"scripts": {
		"postinstall": "node ./node_modules/vscode/bin/install",
		"test": "node ./node_modules/vscode/bin/test"
	},
	// 开发依赖
	"devDependencies": {
		"typescript": "^2.6.1",
		"vscode": "^1.1.6",
		"eslint": "^4.11.0",
		"@types/node": "^7.0.43",
		"@types/mocha": "^2.2.42"
	},
	"license": "SEE LICENSE IN LICENSE.txt"
}
