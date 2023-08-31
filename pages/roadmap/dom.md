# 面试大厂，这些 DOM 相关操作要掌握

在前端中，我将与浏览器环境以及操作相关的统称为 DOM 相关，大致可分为各种 DOM 操作以及 Web API。

DOM 操作如 DOM 的增删改查操作以及事件监听等，见 [DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)。

Web API 包括 Fetch API、Canvas API、Web Worker、WebRTC、WebGL 等，见 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API)。

## 统计当前页面出现次数最多的标签

+ 题目：[如何找到当前页面出现的所有标签](https://q.shanyue.tech/fe/dom/573)
+ 题目：[如何找到当前页面出现次数最多的 HTML 标签](https://q.shanyue.tech/fe/dom/418)

这是一道前端基础与编程功底具备的面试题：

+ 如果你前端基础强会了解 `document.querySelector(*)` 能够列出页面内所有标签
+ 如果你编程能力强能够用**递归**/**正则**快速实现同等的效果

有三种 API 可以列出页面所有标签：

1. `document.querySelector('*')`，标准规范实现
1. `$$('*')`，devtools 实现
1. `document.all`，非标准规范实现

如果你已经快速答了上来，那么还有两道拓展的面试题在等着你

1. 如何找到当前页面出现次数前三多的 HTML 标签
2. 如过多个标签出现次数同样多，则取多个标签

## 跨域

+ 题目：[什么是跨域，如何解决](https://q.shanyue.tech/fe/dom/216)

**协议**，**域名**，**端口**，三者有一不一样，就是跨域

案例一：`www.baidu.com` 与 `zhidao.baidu.com` 是跨域

目前有两种最常见的解决方案：

1. CORS，在服务器端设置几个响应头，如 `Access-Control-Allow-Origin: *`
1. Reverse Proxy，在 nginx/traefik/haproxy 等反向代理服务器中设置为同一域名
1. JSONP，详解见 [JSONP 的原理是什么，如何实现](https://github.com/shfshanyue/Daily-Question/issues/447)

## 图片懒加载

+ 题目：[网站开发中，如何实现图片的懒加载](https://q.shanyue.tech/fe/dom/1)

最新的实现方案是使用 [IntersectionObserver API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)。

``` js
const observer = new IntersectionObserver((changes) => {
  changes.forEach((change) => {
    // intersectionRatio
    if (change.isIntersecting) {
      const img = change.target
      img.src = img.dataset.src
      observer.unobserve(img)
    }
  })
})

observer.observe(img)
```

## sessionStorage 与 localStorage 有何区别

+ 题目：[sessionStorage 与 localStorage 有何区别](https://q.shanyue.tech/fe/dom/570)

略

## 如何设置一个支持过期时间的 localStorage

+ 题目：[如何设置一个支持过期时间的 localStorage](https://q.shanyue.tech/fe/dom/571)

设置如下数据结构，当用户存储数据时，存储至 `__value` 字段。并将过期时间存储至 `__expires` 字段。

``` js
{  __value, __expires }
```

而当每次获取数据时，判断当前时间是否已超过 `__expires` 过期时间，如果超过，则返回 `undefined`，并删除该数据。

## Cookie 属性

+ 题目：[浏览器中 cookie 有哪些字段](https://q.shanyue.tech/fe/dom/560)

Cookie 有以下属性

+ Domain
+ Path
+ Expire/MaxAge
+ HttpOnly: 是否允许被 JavaScript 操作
+ Secure: 只能在 HTTPS 连接中配置
+ SameSite

## Cookie maxAge

+ 题目：[当 cookie 没有设置 maxage 时，cookie 会存在多久](https://q.shanyue.tech/fe/dom/313)

如果没有 maxAge，则 cookie 的有效时间为会话时间。

## Cookie SameSite

+ 题目：[SameSite Cookie 有哪些值，是如何预防 CSRF 攻击的？](https://q.shanyue.tech/fe/dom/569)

> 见文档 [SameSite Cookie - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
> 见文章 [Cookie 的 SameSite 属性](http://www.ruanyifeng.com/blog/2019/09/cookie-samesite)

+ None: 任何情况下都会向第三方网站请求发送 Cookie
+ Lax: 只有导航到第三方网站的 Get 链接会发送 Cookie，跨域的图片、iframe、form表单都不会发送 Cookie
+ Strict: 任何情况下都不会向第三方网站请求发送Cookie

目前，主流浏览器 Same-Site 的默认值为 `Lax`，而在以前是 `None`，将会预防大部分 CSRF 攻击，如果需要手动指定 `Same-Site` 为 `None`，需要指定 Cookie 属性 `Secure`，即在 https 下发送

## Cookie 增删改查

+ 题目：[如何设置一个 Cookie](https://q.shanyue.tech/fe/dom/161)
+ 题目：[如何删除一个 Cookie](https://q.shanyue.tech/fe/dom/162)

通过把该 `cookie` 的过期时间改为过去时即可删除成功，具体操作的话可以通过操作两个字段来完成

1. `max-age`: 将要过期的最大秒数，设置为 `-1` 即可删除
1. `expires`: 将要过期的绝对时间，存储到 `cookies` 中需要通过 `date.toUTCString()` 处理，设置为过期时间即可删除

很明显，`max-age` 更为简单，以下代码可在命令行控制台中进行测试

``` js
// max-age 设置为 -1 即可成功
document.cookie = 'a=3; max-age=-1'
```

``` js
> document.cookie
< ""

> document.cookie = 'a=3'
< "a=3"

> document.cookie
< "a=3"

// 把该字段的 max-age 设置为 -1
> document.cookie = 'a=3; max-age=-1'
< "a=3; max-age=-1"

// 删除成功
> document.cookie
< ""
```

同时，也可以使用最新关于 cookie 操作的 API: [CookieStore API](https://developer.mozilla.org/en-US/docs/Web/API/CookieStore) 其中的 `cookieStore.delete(name)` 删除某个 cookie

## addEventListener()

+ 题目：[浏览器中监听事件函数 addEventListener 第三个参数有那些值](https://q.shanyue.tech/fe/dom/689)

详见 MDN https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener

## 什么是事件冒泡和事件捕获

+ 题目：[什么是事件冒泡和事件捕获](https://q.shanyue.tech/fe/dom/557)
+ 题目：[关于事件捕获和冒泡，以下代码输出多少](https://q.shanyue.tech/fe/dom/559)

可以使用一道代码题，完全理解事件冒泡和事件捕获。

> 代码见: [事件捕获和冒泡 - Codepen](https://codepen.io/shanyue/pen/gOmxmqw?editors=1011)

以下代码输出多少:

``` html
<div class="container" id="container">
  <div class="item" id="item">
    <div class="btn" id="btn">
      Click me
    </div>
  </div>
</div>
```

``` js
document.addEventListener('click', (e) => {
  console.log('Document click')
}, {
  capture: true
})

container.addEventListener('click', (e) => {
  console.log('Container click')
  // e.stopPropagation()
}, {
  capture: true
})

item.addEventListener('click', () => {
  console.log('Item click')
})

btn.addEventListener('click', () => {
  console.log('Btn click')
})

btn.addEventListener('click', () => {
  console.log('Btn click When Capture')
}, {
  capture: true
})

```

## 什么是事件委托，e.currentTarget 与 e.target 有何区别

+ 题目：[什么是事件委托，e.currentTarget 与 e.target 有何区别](https://q.shanyue.tech/fe/dom/558)

![](https://static.shanyue.tech/images/23-02-11/clipboard-0095.c66057.webp)

事件委托指当有大量子元素触发事件时，将事件监听器绑定在父元素进行监听，此时数百个事件监听器变为了一个监听器，提升了网页性能。

另外，React 把所有事件委托在 Root Element，用以提升性能。

## e.preventDefault

+ 题目：[DOM 中如何阻止事件默认行为，如何判断事件否可阻止？](https://q.shanyue.tech/fe/dom/556)

如下：

+ `e.preventDefault()`: 取消事件
+ `e.cancelable`: 事件是否可取消

如果 `addEventListener` 第三个参数 `{ passive: true}`，`preventDefault` 将会会无效


## input 事件

+ 题目：[React 中监听 input 的 onChange 事件的原生事件是什么](https://q.shanyue.tech/fe/dom/611)
+ 题目：[input 中监听值的变化是在监听什么事件](https://q.shanyue.tech/fe/dom/215)

重点要了解下 `input` 事件，比如 React 的 `onChange` 在底层实现时，就是用了原生的 `input` 事件，可观察以下代码输出。

``` js
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <input
        onChange={(e) => {
          console.log("Event: ", e);
          console.log("NativeEvent: ", e.nativeEvent);
          console.log("CurrentTarget: ", e.nativeEvent.currentTarget);
          console.log("NativeEvent Type: ", e.nativeEvent.type);
        }}
      />
    </div>
  );
}
```

## ClipBoard API

+ 题目：[在浏览器中如何获取剪切板中内容](https://q.shanyue.tech/fe/dom/315)
+ 题目：[浏览器的剪切板中如何监听复制事件](https://q.shanyue.tech/fe/dom/444)
+ 题目：[如何实现页面文本不可复制](https://q.shanyue.tech/fe/dom/454)

通过 `Clipboard API` 可以获取剪切板中内容，但需要获取到 `clipboard-read` 的权限，以下是关于读取剪贴板内容的代码：

``` js
// 是否能够有读取剪贴板的权限
// result.state == "granted" || result.state == "prompt"
const result = await navigator.permissions.query({ name: "clipboard-read" })

// 获取剪贴板内容
const text = await navigator.clipboard.readText()
```

> 注: 该方法在 `devtools` 中不生效

有 CSS 和 JS 两种方法禁止复制，以下任选其一或结合使用

使用 CSS 如下：

``` css
user-select: none;
```

或使用 JS 如下，监听 `selectstart` 事件，禁止选中。

当用户选中一片区域时，将触发 `selectstart` 事件，Selection API 将会选中一片区域。禁止选中区域即可实现页面文本不可复制。

``` js
document.body.onselectstart = e => {  
  e.preventDefault();
}

document.body.oncopy = e => {  
  e.preventDefault();
}
```


## fetch 中 credentials 指什么意思

+ 题目：[fetch 中 credentials 指什么意思](https://q.shanyue.tech/fe/dom/297)

`credentials` 指在使用 `fetch` 发送请求时是否应当发送 `cookie`

+ `omit`: 从不发送 `cookie`.
+ `same-origin`: 同源时发送 `cookie`  (浏览器默认值)
+ `include`: 同源与跨域时都发送 `cookie`

## 如何取消请求的发送

+ 题目：[如何取消请求的发送](https://q.shanyue.tech/fe/dom/502)

以下两种 API 的方式如下

+ XHR 使用 `xhr.abort()`
+ fetch 使用 `AbortController` 

## 如何判断在移动端

+ 题目：[如何判断当前环境是移动端还是 PC 端](https://q.shanyue.tech/fe/dom/211)

判断 `navigator.userAgent`，对于 Android/iPhone 可以匹配以下正则

``` js
const appleIphone = /iPhone/i;
const appleIpod = /iPod/i;
const appleTablet = /iPad/i;
const androidPhone = /\bAndroid(?:.+)Mobile\b/i; // Match 'Android' AND 'Mobile'
const androidTablet = /Android/i;
```

当然，不要重复造轮子，推荐一个库: <https://github.com/kaimallea/isMobile>

``` js
import isMobile from 'ismobilejs'

const mobile = isMobile()
```

## requestIdleCallback

+ 题目：[简单介绍 requestIdleCallback 及使用场景](https://q.shanyue.tech/fe/dom/379)

`requestIdleCallback` 维护一个队列，将在浏览器空闲时间内执行。它属于 [Background Tasks API](https://developer.mozilla.org/zh-CN/docs/Web/API/Background_Tasks_API)，你可以使用 `setTimeout` 来模拟实现

``` js
window.requestIdleCallback = window.requestIdleCallback || function(handler) {
  let startTime = Date.now();
 
  return setTimeout(function() {
    handler({
      didTimeout: false,
      timeRemaining: function() {
        return Math.max(0, 50.0 - (Date.now() - startTime));
      }
    });
  }, 1);
}
```

以上实现过于复杂以及细节化，也可以像 [swr](https://github.com/vercel/swr) 一样做一个简单的模拟实现，以下代码见 <https://github.com/vercel/swr/blob/8670be8072b0c223bc1c040deccd2e69e8978aad/src/use-swr.ts#L33>

``` js
const rIC = window['requestIdleCallback'] || (f => setTimeout(f, 1))
```

在 `rIC` 中执行任务时需要注意以下几点：

1. 执行重计算而非紧急任务
1. 空闲回调执行时间应该小于 50ms，最好更少
1. 空闲回调中不要操作 DOM，因为它本来就是利用的重排重绘后的间隙空闲时间，重新操作 DOM 又会造成重排重绘

## 如何把 DOM 转化为图片

+ 题目：[如何把 DOM 转化为图片](https://q.shanyue.tech/fe/dom/437)

简单总结：DOM -> SVG -> Canvas -> JPEG/PNG

## JSONP 的原理是什么，如何实现

+ 题目：[JSONP 的原理是什么，如何实现](https://q.shanyue.tech/fe/dom/447)

`JSONP`，全称 `JSON with Padding`，为了解决跨域的问题而出现。虽然它只能处理 GET 跨域，虽然现在基本上都使用 CORS 跨域，但仍然要知道它，毕竟**面试会问**。

`JSONP` 基于两个原理:

1. 动态创建 `script`，使用 `script.src` 加载请求跨过跨域
1. `script.src` 加载的脚本内容为 JSONP: 即 `PADDING(JSON)` 格式

## 异步加载 JS 脚本时，async 与 defer 有何区别

+ 题目：[异步加载 JS 脚本时，async 与 defer 有何区别](https://q.shanyue.tech/fe/dom/456)

> 以下图片取自 whatwg 的规范，可以说是最权威的图文解释了，详细参考[原文](https://html.spec.whatwg.org/multipage/scripting#the-script-element)

![async 与 defer 区别](https://html.spec.whatwg.org/images/asyncdefer.svg)

在*正常情况下*，即 `<script>` 没有任何额外属性标记的情况下，有几点共识

1. JS 的脚本分为**加载、解析、执行**几个步骤，简单对应到图中就是 `fetch` (加载) 和 `execution` (解析并执行)
2. **JS 的脚本加载(fetch)且执行(execution)会阻塞 DOM 的渲染**，因此 JS 一般放到最后头

而 `defer` 与 `async` 的区别如下:

+ 相同点: **异步加载 (fetch)** 
+ 不同点:
  + async 加载(fetch)完成后立即执行 (execution)，因此可能会阻塞 DOM 解析；
  + defer 加载(fetch)完成后延迟到 DOM 解析完成后才会执行(execution)**，但会在事件 `DomContentLoaded` 之前

## React/Vue 中的 router 实现原理如何

+ 题目：[React/Vue 中的 router 实现原理如何](https://q.shanyue.tech/fe/dom/463)

前端路由有两种实现方式:

history API

+ 通过 `history.pushState()` 跳转路由
+ 通过 `popstate event` 监听路由变化，但无法监听到 `history.pushState()` 时的路由变化

hash

+ 通过 `location.hash` 跳转路由
+ 通过 `hashchange event` 监听路由变化

## 浏览器中如何读取二进制信息

+ 题目：[浏览器中如何读取二进制信息](https://q.shanyue.tech/fe/dom/585)

![](https://shanyue.tech/assets/img/transform.77175c26.jpg)

可在 MDN 中熟读以下 API

+ File/Blob API
+ TypedArray/ArrayBuffer API
+ FileReader API
