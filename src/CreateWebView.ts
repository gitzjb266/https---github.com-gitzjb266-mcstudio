import { ExtensionContext, ViewColumn, WebviewPanel, window, commands } from 'vscode';
// 创建一个全局变量，类型为：WebviewPanel 或者 undefined
let webviewPanel : WebviewPanel | undefined;

// 创建一个可导出的方法,并且带上参数
export function createWebView(

    context: ExtensionContext,      // 上面的代码刚介绍过，可忽略
    viewColumn: ViewColumn,         // 窗口编辑器
    label: string                   // 传递进来的一个 label 值，就是点击树视图项 showInformationMessage 的值
    
) {

    if(webviewPanel === undefined) {
    
        // 上面重点讲解了 createWebviewPanel 传递4个参数
        webviewPanel = window.createWebviewPanel(
        
            'webView',                          // 标识，随意命名
            label,                              // 面板标题
            viewColumn,                         // 展示在哪个面板上
            {
                retainContextWhenHidden: true,  // 控制是否保持webview面板的内容（iframe），即使面板不再可见。
                enableScripts: true             // 下面的 html 页可以使用 Scripts
            }
            
        )
        
        // 面板嵌入 html getIframeHtml() 方法在下面
        webviewPanel.webview.html = getIframeHtml(label);
        
    } else {
    
        // 如果面板已经存在，重新设置标题
        webviewPanel.title = label;
        webviewPanel.reveal();  // Webview面板一次只能显示在一列中。如果它已经显示，则此方法将其移动到新列。
    }

    // onDidDispose: 如果关闭该面板，将 webviewPanel 置 undefined
    webviewPanel.onDidDispose(() => {
        webviewPanel = undefined;
    });

    return webviewPanel;
}

// 这个方法没什么了，就是一个 最简单的嵌入 iframe 的 html 页面
export function getIframeHtml(label: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <style type="text/css">
            * {
                box-sizing: border-box;
            }
            body {
                margin: 0;
                padding: 0;
                font: 16px/20px microsft yahei;
             }
            .wrap {
                width: 100%;
                height: 100%;
                padding: 10% 0;
                position: fixed;
                opacity: 0.8;
                background: linear-gradient(to bottom right,#000000, #656565);
                background: -webkit-linear-gradient(to bottom right,#50a3a2,#53e3a6);
            }
            .container {
                width: 60%;
                margin: 0 auto;
            }
            .container h1 {
                text-align: center;
                color: #FFFFFF;
                font-weight: 500;
            }
            .container input {
                width: 320px;
                display: block;
                height: 36px;
                border: 0;
                outline: 0;
                padding: 6px 10px;
                line-height: 24px;
                margin: 32px auto;
                -webkit-transition: all 0s ease-in 0.1ms;
                -moz-transition: all 0s ease-in 0.1ms;
                transition: all 0s ease-in 0.1ms;
            }
            .container input[type="text"] , .container input[type="password"]  {
                background-color: #FFFFFF;
                font-size: 16px;
                color: #50a3a2;
            }
            .container input[type='submit'] {
                font-size: 16px;
                letter-spacing: 2px;
                color: #666666;
                background-color: #FFFFFF;
            }
            .container input:focus {
                width: 400px;
            }
            .container input[type='submit']:hover {
                cursor: pointer;
                width: 400px;
            }
            .to_login{
                color: #a7c4c9;
            }
            .text{
                color: #e2dfe4;
            }
            .wrap ul {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -20;
            }
            .wrap ul li {
                list-style-type: none;
                display: block;
                position: absolute;
                bottom: -120px;
                width: 15px;
                height: 15px;
                z-index: -8;
                border-radius: 50%;
                box-shadow: inset -30px -30px 75px rgba(0, 0, 0, .2),
                inset 0px 0px 5px rgba(0, 0, 0, .5),
                inset -3px -3px 5px rgba(0, 0, 0, .5),
                0 0 20px rgba(255, 255, 255, .75);
                background-color:rgba(255, 255, 255, 0.15);
                animotion: square 25s infinite;
                -webkit-animation: square 25s infinite;
            }
            .wrap ul li:nth-child(1) {
                left: 0;
                animation-duration: 10s;
                -moz-animation-duration: 10s;
                -o-animation-duration: 10s;
                -webkit-animation-duration: 10s;
            }
            .wrap ul li:nth-child(2) {
                width: 40px;
                height: 40px;
                left: 10%;
                animation-duration: 15s;
                -moz-animation-duration: 15s;
                -o-animation-duration: 15s;
                -webkit-animation-duration: 11s;
            }
            .wrap ul li:nth-child(3) {
                left: 20%;
                width: 25px;
                height: 25px;
                animation-duration: 12s;
                -moz-animation-duration: 12s;
                -o-animation-duration: 12s;
                -webkit-animation-duration: 12s;
            }
            .wrap ul li:nth-child(4) {
                width: 50px;
                height: 50px;
                left: 30%;
                -webkit-animation-delay: 3s;
                -moz-animation-delay: 3s;
                -o-animation-delay: 3s;
                animation-delay: 3s;
                animation-duration: 12s;
                -moz-animation-duration: 12s;
                -o-animation-duration: 12s;
                -webkit-animation-duration: 12s;
            }
            .wrap ul li:nth-child(5) {
                width: 60px;
                height: 60px;
                left: 40%;
                animation-duration: 10s;
                -moz-animation-duration: 10s;
                -o-animation-duration: 10s;
                -webkit-animation-duration: 10s;
            }
            .wrap ul li:nth-child(6) {
                width: 75px;
                height: 75px;
                left: 50%;
                -webkit-animation-delay: 7s;
                -moz-animation-delay: 7s;
                -o-animation-delay: 7s;
                animation-delay: 7s;
            }
            .wrap ul li:nth-child(7) {
                left: 60%;
                width: 30px;
                height: 30px;
                animation-duration: 8s;
                -moz-animation-duration: 8s;
                -o-animation-duration: 8s;
                -webkit-animation-duration: 8s;
            }
            .wrap ul li:nth-child(8) {
                width: 90px;
                height: 90px;
                left: 70%;
                -webkit-animation-delay: 4s;
                -moz-animation-delay: 4s;
                -o-animation-delay: 4s;
                animation-delay: 4s;
            }
            .wrap ul li:nth-child(9) {
                width: 50px;
                height: 50px;
                left: 80%;
                animation-duration: 20s;
                -moz-animation-duration: 20s;
                -o-animation-duration: 20s;
                -webkit-animation-duration: 20s;
            }
            .wrap ul li:nth-child(10) {
                width: 75px;
                height: 75px;
                left: 90%;
                -webkit-animation-delay: 6s;
                -moz-animation-delay: 6s;
                -o-animation-delay: 6s;
                animation-delay: 6s;
                animation-duration: 30s;
                -moz-animation-duration: 30s;
                -o-animation-duration: 30s;
                -webkit-animation-duration: 30s;
            }
            @keyframes square {
                0% {
                    -webkit-transform: translateY(0);
                    transform: translateY(0)
                }
                100% {
                    bottom: 400px;
                    -webkit-transform: translateY(-500);
                    transform: translateY(-500)
                }
            }
            @-webkit-keyframes square {
                0% {
                    -webkit-transform: translateY(0);
                    transform: translateY(0)
                }
                100% {
                    bottom: 400px;
                    -webkit-transform: translateY(-500);
                    transform: translateY(-500)
                }
            }
        </style>
    </head>
    <body>
        <div class="wrap">
        <div class="container">
            <h1 style="color: white; margin: 0; text-align: center">LOGIN SERVER</h1>
            <form>
            <label><input type="text" placeholder="Server URL"/></label>
            <label><input type="text" placeholder="LOGIN NAME"/></label>
            <label><input type="password" placeholder="PASSWORD" /></label>
                <input type="submit" value="Sign up"/>
            </form>
        </div>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
    </body>
    </html>
    `;
}