# Keyfinder

from https://keycode.info/

## 폴더 구조

찾아볼 것

```
dist : 배포용 (최적화 파일)
src : 
```

## npm 

- webpack / webpack-cli / webpack-dev-server
- @babel/core / @babel/preset-env / @babel/polyfill / babel-loader / core-js
- clean-webpack-plugin은 prod할 떄만 쓰면 되는 듯..?
- 바벨, 웹팩 패캐지들 역할 구분해 찾아볼 것

```js

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack-dev-server"
  },

  "dependencies": {
    "@babel/polyfill": "^7.10.4",
    "clean-webpack-plugin": "^3.0.0",
    "core-js": "^3.6.5",
    "webpack-dev-server": "^3.11.0"
  },

  "devDependencies": {
    "@babel/core": "^7.10.5",
    "@babel/plugin-proposal-class-properties": "^7.10.4",
    "@babel/preset-env": "^7.10.4",
    "babel-loader": "^8.1.0",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.12"
  }

```
## 웹팩 설정

- 클래스 문법 사용 시 웹팩이 파싱을 못 해서 바벨이 필수인 듯
- 최신 node.js는 class 문법 지원 but 모든 browser가 최신node.js 미지원
- @babel/plugin-proposal-class-properties (해결x)
- corejs (해결) - 확인해보기


```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/js/App.js",
  devtool: "inline-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist/",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { useBuiltIns: "usage", corejs: { version: 3 } },
              ],
            ],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
};
```

## sass 설정

### 컴파일하기

`dir` : 컴파일할 scss파일 위치
`dir2` : css파일 위치

`sass --watch dir:dir2`

### 파일 분리

_scss1.scss 
_scss2.scss

toCSS.scss

## keyCard 잔상 효과 제거

1. KeyCard 클릭시 Tooltip을 show & hide(setTimeout)
2. 타이머가 끝나기 전에 다른 KeyCard를 클릭 시 Tooltip이 2개가 동시에 띄워지는 문제 발생
3. Main에서 Main.keyCards와 timer를 통해 해결

## CSS transition & z-index 찾아보기

1. transition과 keyframe의 차이
2. z-index와 transition의 관계

## 이벤트핸들러에 parameter 전달하기

event는 핸들러 마지막 인자로 전달됨

```js
      const btn = document.querySelector("button");

      const eventHandler = (param, e) => {
        console.log(e.target, param);
      };
      btn.addEventListener("click", eventHandler.bind(null, "hi"));
```

## 이벤트핸들러에서 상위 컴포넌트의 this와 하위 컴포넌트의 this가 필요할 경우

변수로 this 잡아두기

```js
class Main{
    method(){
        const main = this;

        const handlerFunc = (e)=>{
            console.log(main.subComponent, this);
        }
        this.subComponent.addEventListener('click', handlerFunc.bind(null, this.subComponent));
    }
}
```

## 컴포넌트를 담는 배열에서 forEach문을 돌리며 이벤트핸들러를 추가할 떄

```js
const components = [new Comp, new Comp, new Comp];

const handlerFunc = (i, e)={
    const thisComp = components[i];
    console.log(e, thisComp);
};

components.forEach((comp, i)=>{
    comp.addEventListener('click', handlerFunc.bind(null, i));
})
```

```js
class Main{

  ....
  .....

  bindClipBoard() {
    const clickHandler = (i) => {
      const keyCard = this.keyCards[i];

      // set keyCard toolTip
      if (!keyCard.toolTip) {
        keyCard.toolTip = new Tooltip(
          keyCard.$el,
          "toolTip",
          `${keyCard.title} : ${keyCard.content} is copied!`
        );
      } else {
        keyCard.toolTip.setState(
          `${keyCard.title} : ${keyCard.content} is copied!`
        );
        keyCard.toolTip.show();
      }
    };
    this.keyCards.forEach((keyCard, i) =>
      keyCard.$el.addEventListener("click", clickHandler.bind(null, i))
    );
  }
}  
```

찾아볼 것


https://medium.com/js-dojo/modern-frontend-architecture-101-f9c88c20ea20
https://github.com/grab/front-end-guide
https://frontendmasters.com/books/front-end-handbook/2019/
https://blog.bitsrc.io/state-of-micro-frontends-9c0c604ed13a
**https://martinfowler.com/articles/micro-frontends.html**
https://medium.com/@tomsoderlund/micro-frontends-a-microservice-approach-to-front-end-web-development-f325ebdadc16
https://www.youtube.com/watch?v=SBB1YtwODT0
https://www.valentinog.com/blog/webpack/

javascript: (function() {
	var elements = document.body.getElementsByTagName('*');
	var items = [];
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].innerHTML.indexOf('* { background:#000!important;color:#0f0!important;outline:solid #f00 1px!important; background-color: rgba(255,0,0,.2) !important; }') != -1) {
			items.push(elements[i]);
		}
	}
	if (items.length > 0) {
		for (var i = 0; i < items.length; i++) {
			items[i].innerHTML = '';
		}
	} else {
		document.body.innerHTML +=
			'<style>* { background:#000!important;color:#0f0!important;outline:solid #f00 1px!important; background-color: rgba(255,0,0,.2) !important; }\
            * * { background-color: rgba(0,255,0,.2) !important; }\
            * * * { background-color: rgba(0,0,255,.2) !important; }\
            * * * * { background-color: rgba(255,0,255,.2) !important; }\
            * * * * * { background-color: rgba(0,255,255,.2) !important; }\
            * * * * * * { background-color: rgba(255,255,0,.2) !important; }\
            * * * * * * * { background-color: rgba(255,0,0,.2) !important; }\
            * * * * * * * * { background-color: rgba(0,255,0,.2) !important; }\
            * * * * * * * * * { background-color: rgba(0,0,255,.2) !important; }</style>';
	}
})();