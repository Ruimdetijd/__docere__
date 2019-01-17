(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./node_modules/monaco-editor/esm/vs/basic-languages/powershell/powershell.js":
/*!************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/basic-languages/powershell/powershell.js ***!
  \************************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\n *  Copyright (c) Microsoft Corporation. All rights reserved.\n *  Licensed under the MIT License. See License.txt in the project root for license information.\n *--------------------------------------------------------------------------------------------*/\n\nvar conf = {\n    // the default separators except `$-`\n    wordPattern: /(-?\\d*\\.\\d\\w*)|([^\\`\\~\\!\\@\\#%\\^\\&\\*\\(\\)\\=\\+\\[\\{\\]\\}\\\\\\|\\;\\:\\'\\\"\\,\\.\\<\\>\\/\\?\\s]+)/g,\n    comments: {\n        lineComment: '#',\n        blockComment: ['<#', '#>'],\n    },\n    brackets: [\n        ['{', '}'],\n        ['[', ']'],\n        ['(', ')']\n    ],\n    autoClosingPairs: [\n        { open: '{', close: '}' },\n        { open: '[', close: ']' },\n        { open: '(', close: ')' },\n        { open: '\"', close: '\"', notIn: ['string'] },\n        { open: '\\'', close: '\\'', notIn: ['string', 'comment'] },\n    ],\n    surroundingPairs: [\n        { open: '{', close: '}' },\n        { open: '[', close: ']' },\n        { open: '(', close: ')' },\n        { open: '\"', close: '\"' },\n        { open: '\\'', close: '\\'' },\n    ],\n    folding: {\n        markers: {\n            start: new RegExp(\"^\\\\s*#region\\\\b\"),\n            end: new RegExp(\"^\\\\s*#endregion\\\\b\")\n        }\n    }\n};\nvar language = {\n    defaultToken: '',\n    ignoreCase: true,\n    tokenPostfix: '.ps1',\n    brackets: [\n        { token: 'delimiter.curly', open: '{', close: '}' },\n        { token: 'delimiter.square', open: '[', close: ']' },\n        { token: 'delimiter.parenthesis', open: '(', close: ')' }\n    ],\n    keywords: [\n        'begin', 'break', 'catch', 'class', 'continue', 'data',\n        'define', 'do', 'dynamicparam', 'else', 'elseif', 'end',\n        'exit', 'filter', 'finally', 'for', 'foreach', 'from',\n        'function', 'if', 'in', 'param', 'process', 'return',\n        'switch', 'throw', 'trap', 'try', 'until', 'using',\n        'var', 'while', 'workflow', 'parallel', 'sequence', 'inlinescript', 'configuration'\n    ],\n    helpKeywords: /SYNOPSIS|DESCRIPTION|PARAMETER|EXAMPLE|INPUTS|OUTPUTS|NOTES|LINK|COMPONENT|ROLE|FUNCTIONALITY|FORWARDHELPTARGETNAME|FORWARDHELPCATEGORY|REMOTEHELPRUNSPACE|EXTERNALHELP/,\n    // we include these common regular expressions\n    symbols: /[=><!~?&%|+\\-*\\/\\^;\\.,]+/,\n    escapes: /`(?:[abfnrtv\\\\\"'$]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\n    // The main tokenizer for our languages\n    tokenizer: {\n        root: [\n            // commands and keywords\n            [/[a-zA-Z_][\\w-]*/, {\n                    cases: {\n                        '@keywords': { token: 'keyword.$0' },\n                        '@default': ''\n                    }\n                }],\n            // whitespace\n            [/[ \\t\\r\\n]+/, ''],\n            // labels\n            [/^:\\w*/, 'metatag'],\n            // variables\n            [/\\$(\\{((global|local|private|script|using):)?[\\w]+\\}|((global|local|private|script|using):)?[\\w]+)/, 'variable'],\n            // Comments\n            [/<#/, 'comment', '@comment'],\n            [/#.*$/, 'comment'],\n            // delimiters\n            [/[{}()\\[\\]]/, '@brackets'],\n            [/@symbols/, 'delimiter'],\n            // numbers\n            [/\\d*\\.\\d+([eE][\\-+]?\\d+)?/, 'number.float'],\n            [/0[xX][0-9a-fA-F_]*[0-9a-fA-F]/, 'number.hex'],\n            [/\\d+?/, 'number'],\n            // delimiter: after number because of .\\d floats\n            [/[;,.]/, 'delimiter'],\n            // strings:\n            [/\\@\"/, 'string', '@herestring.\"'],\n            [/\\@'/, 'string', '@herestring.\\''],\n            [/\"/, {\n                    cases: {\n                        '@eos': 'string',\n                        '@default': { token: 'string', next: '@string.\"' }\n                    }\n                }],\n            [/'/, {\n                    cases: {\n                        '@eos': 'string',\n                        '@default': { token: 'string', next: '@string.\\'' }\n                    }\n                }],\n        ],\n        string: [\n            [/[^\"'\\$`]+/, {\n                    cases: {\n                        '@eos': { token: 'string', next: '@popall' },\n                        '@default': 'string'\n                    }\n                }],\n            [/@escapes/, {\n                    cases: {\n                        '@eos': { token: 'string.escape', next: '@popall' },\n                        '@default': 'string.escape'\n                    }\n                }],\n            [/`./, {\n                    cases: {\n                        '@eos': { token: 'string.escape.invalid', next: '@popall' },\n                        '@default': 'string.escape.invalid'\n                    }\n                }],\n            [/\\$[\\w]+$/, {\n                    cases: {\n                        '$S2==\"': { token: 'variable', next: '@popall' },\n                        '@default': { token: 'string', next: '@popall' }\n                    }\n                }],\n            [/\\$[\\w]+/, {\n                    cases: {\n                        '$S2==\"': 'variable',\n                        '@default': 'string'\n                    }\n                }],\n            [/[\"']/, {\n                    cases: {\n                        '$#==$S2': { token: 'string', next: '@pop' },\n                        '@default': {\n                            cases: {\n                                '@eos': { token: 'string', next: '@popall' },\n                                '@default': 'string'\n                            }\n                        }\n                    }\n                }],\n        ],\n        herestring: [\n            [/^\\s*([\"'])@/, {\n                    cases: {\n                        '$1==$S2': { token: 'string', next: '@pop' },\n                        '@default': 'string'\n                    }\n                }],\n            [/[^\\$`]+/, 'string'],\n            [/@escapes/, 'string.escape'],\n            [/`./, 'string.escape.invalid'],\n            [/\\$[\\w]+/, {\n                    cases: {\n                        '$S2==\"': 'variable',\n                        '@default': 'string'\n                    }\n                }],\n        ],\n        comment: [\n            [/[^#\\.]+/, 'comment'],\n            [/#>/, 'comment', '@pop'],\n            [/(\\.)(@helpKeywords)(?!\\w)/, { token: 'comment.keyword.$2' }],\n            [/[\\.#]/, 'comment']\n        ],\n    },\n};\n\n\n//# sourceURL=webpack:///./node_modules/monaco-editor/esm/vs/basic-languages/powershell/powershell.js?");

/***/ })

}]);