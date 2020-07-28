# 1. Common 

## 1.1 class Component

### 파라미터
- element tag
  - 인스턴스가 생성할 element의 tag명
- config `{}`
  - $parent `DOM element`
    - 부모 element
  - classes `{}`
    - classes가 String일 경우 ( 1개일 경우) : 
    - sub classes가 필요할 떄 애매해짐
  - attributes `{}`
    - name
    - value
  - position `String`
    - insertAdjacentElement()의 parameter
    - 'beforebegin',
    - 'beforeend',
    - 'afterbegin',
    - 'afterend'
- shouldRender `Boolean`

```js
  constructor(tag, config, shouldRender = true) {
    this.$el = document.createElement(tag);
    const { $parent, classes, attributes, position } = config;

    this.setConfig(classes, attributes);

    if (shouldRender) this.setPosition($parent, position);
  }
```

### 필드

- $el
  - 인스턴스의 element를 저장

### 메소드

- setConfig
  - classes, attributes 필드를 선언
- setPosition
  - 인스턴스의 DOM element(child DOM element)를 $parent에 append
  - 각 인스턴스는 단 하나의 DOM element만을 가지게 됨.
  - $child는 content가 없는 상태이며
  - child 컴포넌트 구성자에서 render()를 실행할 경우 $child의 content box가 형성됨.
  - 인스턴스 생성 시 shouldRender는 default로 true이며 parent에 곧바로 append됨
  - 인스턴스에서 data처리를 위해 render를 나중에 해야되는 경우, shouldRender를 false로 설정
  - 인스턴스의 render()가 늦은 시점에 실행될 경우, shouldRender를 flase로.
  - why? css에 의해 content-box 밖의 border, padding, margin이 display될 수 있음.

```js

  setConfig(classes, attributes) {
    if (typeof classes === "string") {
      console.log(classes);
      this.$el.className = classes;
    }

    if (attributes && attributes.length > 0) {
      attributes.forEach(({ name, value }) =>
        this.$el.setAttribute(name, value)
      );
    }
  }

  setPosition($parent, position) {
    position
      ? $parent.insertAdjacentElement(position, this.$el)
      : $parent.append(this.$el);
  }

```

## 1.2 class Tooltip

### 파라미터

- config `{}`
  - super() : $parent, classes
  - text `String` : tooltip의 text로 사용  
  
```js
  constructor(config) {
    const { $parent, classes = "tooltip", text = "" } = config;
    super("p", { $parent, classes });

    this.text = text;
    this.render();
  }
```

### 필드

- text
  - 새로운 text를 setState하기 위해

### 메소드

- render 
  - text를 content박스에 전달
- setState
  - text를 재설정 후 reRender
- hide
- show
  
```js

  render() {
    this.$el.textContent = this.text;
  }

  setState(text) {
    this.text = text;
    this.render();
  }

  hide() {
    this.$el.classList.add("hide");
  }

  show() {
    this.$el.classList.remove("hide");
  }

```

## 1.3 class Modal

### 파라미터

- config
    - super()
    - contentHTML
      - 모달 div 내에 들어갈 마크업

```js
    constructor(config) {
    const { $parent = document.body, classes = "modal", contentHTML } = config;

    super("div", { $parent, classes, position: "afterbegin" });

    this.isOn = true;
    this.contentHTML = contentHTML;

    this.render();
  }
```

### 필드

- isOn
  - 모달의 hide/show state 확인 
- contentHTML
  - 새로운 HTML으로 setState하기 위해 저장

### 메소드

- render
  - 수정할 부분.
  - transition과 :not 선택자 사용해서 다시 짜볼 것
- setState
  - 마크업과 state를 재설정 후 render

```js
async render() {
    if (this.isOn) {
      this.$el.innerHTML = this.contentHTML;
    } else {
      this.$el.classList.add("modal--fade");
      await setTimer(1000);
      this.$el.classList.add("hide");
    }
  }

  setState(isOn, contentHTML) {
    if (contentHTML) {
      this.contentHTML = contentHTML;
    }
    this.isOn = isOn;
    this.render();
  }
```

# 2. main

## 2.1 class KeyCard

keyCard block은

```html
<div>keyCard
    <div>title</div>
    <div>content</div>
</div>
```
keyCard [Block]
  - keyCard__title [Element]
  - keyCard__content [Element]

title과 content element로 구성됨.

### 파라미터

- config
  - super()
    - $parent 
    - classes `{}`
      - keyCard
      - title
      - content
  - title `String`
  - content `String`
  - removeClipboardPopups 메소드 `function`
    - cliboardPopup은 toolTip으로 구현됨
    - keyCard가 toolTip을 가지고 있으며,
    - event에 따라 세 개의 keyCards에 대한 toolTip의 state를 동시에 처리하기 위해 
    - KeyCards를 관리하는 Main.js에서 removeClipboardPopups 메소드를 가지며 이 callback함수를 keyCard로 전달.
  
```js
constructor(config) {
    const {
      $parent,
      classes = {
        keyCard: "keyCard",
        title: "keyCard__title",
        content: "keyCard__content",
      },
      title,
      content = "",
      removeClipboardPopups,
    } = config;

    super("div", { $parent, classes: classes.keyCard });

    this.classes = { title: classes.title, content: classes.content };
    this.title = title;
    this.content = content;
    this.removeClipboardPopups = removeClipboardPopups;

    this.render();
    this.bindEvent();
  }

```

### 필드

- classes
  - 하위 element에 대한 class명
- title
- content
- removeClipboardPopups
  - 상위 컴포넌트인 Main.js에 정의된 callback함수를 전달받아 저장


### 메소드

- render
- setState
  - content 재설정 후 render
- bindEvent
  - 상위 컴포넌트에서 전달받은 callback 함수 handler와 메소드로 선언된 handler를 결합한
  - clickHandler를 eventListener의 handler로 등록
- clickHandler
  - KeyCard 클릭 시
  - Main이 갖는 모든 keyCards의 toolTip을 제거하고
  - 클릭된 KeyCard의 toolTip만 show.
  - Main에서 removeClipBoards를 통해 setTimeout을 제거할 수 있도록 timer를 저장
- copyToClipboard
  - navigator API를 이용해 clipboard에 keyCard의 content를 저장
- showToolTip
  - toolTip 필드에 toolTip 인스턴스 저장
  - 한 개의 toolTip 인스턴스만을 지니며
  - setState를 통해 state를 재설정해 렌더하고
  - show를 통해 show클래스를 add함.
  
```js
  render() {
    this.$el.innerHTML = `
      <h2 class=${this.classes.title}>${this.title}</h2>
      <div class=${this.classes.content}>${this.content}</div>
    `;
  }

  setState(content) {
    this.content = content;
    this.render();
  }

  bindEvent() {
    this.$el.addEventListener("click", () => this.clickHandler());
  }

  clickHandler() {
    // remove all keyCard popups
    // prevent showing popups more than one.
    this.removeClipboardPopups();
    this.copyToClipboard();
    this.showToolTip();

    this.toolTipTimer = setTimeout(() => this.toolTip.hide(), 700);
  }

  copyToClipboard() {
    if (!navigator.clipboard) {
      alert("your broser doesn't support clipboard API!");
    }
    const copiedText = this.content;
    navigator.clipboard.writeText(copiedText);
  }

  showToolTip() {
    if (!this.toolTip) {
      this.toolTip = new Tooltip({
        $parent: this.$el,
        classes: "toolTip",
        text: `${this.title} : ${this.content} is copied!`,
      });
    } else {
      this.toolTip.setState(`${this.title} : ${this.content} is copied!`);
      this.toolTip.show();
    }
  }
```

## 2.2 class Main

### 파라미터

- config
  - supre()
    - $parent
    - classes `{}`
  
```js
constructor(config) {
    const {
      $parent,
      classes = {
        main: "main",
        keyCode: "keyCode",
        keyCards: "keyCards",
      },
    } = config;
    const { main, keyCode, keyCards } = classes;
    super("div", { $parent, classes: main });
    this.classes = { keyCode, keyCards };
  }
```

### 필드

- classes

### 메소드

- render
- fetchKeyCards
  - keyCards 데이터를 fetch하고
    - DB에서 불러올 경우, fetchKeyCardsData 메소드를 추가해 title에 할당
  - config를 전달해 (classes는 default값)
  - keyCards를 생성하는 역할
  - toolTips의 timer를 일괄 처리하기 위해 keyCards를 main에서 관리
- removeClipboardPopups
  - keyCards의 모든 toolTip을 hide()시키고 
  - 모든 timer를 제거
- updateKeyCode
  - main 중앙에 보이는 keyCode의 content 업데이트
- updateKeyCards
  - App.js에서 event발생 시 
  - Main의 keyCards의 state를 변경하기 위해 handler함수 정의


```js
  render() {
    const { keyCode, keyCards } = this.classes;
    this.$el.innerHTML = `
      <p class="${keyCode}"></p>
      <div class="${keyCards}"></div>
    `;
  }

  fetchKeyCards() {
    const titles = ["e.key", "e.keyCode", "e.code"];
    const config = {
      $parent: this.$el.querySelector(".keyCards"),
      removeClipboardPopups: this.removeClipboardPopups.bind(this),
    };

    this.keyCards = titles.map((title) => new KeyCard({ title, ...config }));
  }

  // remove all keyCard popups
  // prevent showing popups more than one.
  removeClipboardPopups() {
    this.keyCards.forEach((keyCard) => {
      keyCard.toolTip && keyCard.toolTip.hide();
      clearTimeout(keyCard.toolTipTimer);
    });
  }

  // handler functions used in App.js
  updateKeyCode(e) {
    this.keyCode = this.$el.querySelector(".keyCode");
    this.keyCode.textContent = e.keyCode;
  }

  updateKeyCards(e) {
    const [key, keyCode, code] = this.keyCards;

    key.setState(e.keyCode === 32 ? "(Space character)" : e.key);
    keyCode.setState(e.keyCode);
    code.setState(e.code);
  }
  ```

# 3. Utility

## 3.1 setTimer

- promise 기반의 비동기 처리를 위해 
- 지정한 duration 후 resolve하는 Promise를 반환하는 setTimer 함수 정의
  
```js
const setTimer = (duration) =>
  new Promise((res, rej) => setTimeout(() => res(), duration));
```

# 3. App

## class App

- App의 역할에 대해 다시 생각해볼 것
- App.init() 역할
- Modal이 App에 위치하는 게 맞는지

### 필드

- Modal
  - 첫 모달은 paragraph 모달
  - header 클릭 시 모달의 마크업을 변경해 table 모달로 setState
- header
- main
- footer


```js
  constructor() {
    this.render();
    this.Modal = this.paragraphModal();
    this.main;
    this.bindEvents();
  }
```

## 메소드

- render
- bindEvents
  - 각 type의 eventListener에 handler 함수들을 등록
- paragraphModal
  - App 구성자에서 <p> modal 생성
- hideModalOnKeyDown
  - 첫 키보드 입력 시, main을 render하고
  - keyCards를 가져온 후
  - modal을 hide해 main을 노출시킴
  - 1회 실행을 위해 handler를 handler내에서 remove

```js

  render() {
    this.$el = document.getElementById("App");
    this.$el.innerHTML = `
      <header id="header"></header>
      <main id="main"></main>
      <footer id="footer"></footer>
      `;
  }

  bindEvents() {
    this.hideModalOnKeyDown();
    window.addEventListener("keydown", (e) => {
      this.main.updateKeyCode(e);
      this.main.updateKeyCards(e);
    });
  }

  paragraphModal() {
    const paragraph = `<p class="modal__message">Enter any key to get keyCode</p>`;
    return new Modal({
      parent: this.$el,
      classes: "modal",
      contentHTML: paragraph,
    });
  }

  hideModalOnKeyDown() {
    const handler = (e) => {
      this.main = new Main({
        $parent: this.$el.querySelector("#main"),
        classes: {
          main: "main",
          keyCode: "keyCode",
          keyCards: "keyCards",
        },
      });

      this.main.render();
      this.main.fetchKeyCards();

      this.Modal.setState(false);
      window.removeEventListener("keydown", handler);
    };
    window.addEventListener("keydown", handler);
  }

```

# Todo

- App 역할 재정의
- Template.js 컴포넌트?? 

# issue

1. getElementById() vs querySelector()

- getElementById를 메소드로 갖지 않는 경우?
- element를 create하고 append하기 전에, querySelector는 되는데 geElemeentById는 안 되네?
