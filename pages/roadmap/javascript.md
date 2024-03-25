---
sidebarDepth: 4
---

# 面试大厂，这些 JavaScript 问题一定要掌握

在此之前，可以先过一遍 MDN，了解一些基础的 API，见 [JavaScript Reference](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference)

特别是 Array、Object、Promise 的 API，在面试以及实际工作中，都很实用。

+ [Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
+ [Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)
+ [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

另外，对最新的 EcmaScript 特性，也需要了解一下，如 ES2021、ES2022、ES2023 等。

## API

### JS 中基本数据类型有哪些

+ 题目：[JS 中基础数据类型有哪些](https://q.shanyue.tech/fe/js/515)

七种，文档见 [基本数据类型 - MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)

+ number
+ bigint: **这个常常会忽略，最新加入的**
+ string
+ undefined
+ null
+ symbol
+ bool

### Number、String、Array、Object、Promise API

+ 题目：[列举 Number、String、Array、Object、Promise 有哪些 API](https://q.shanyue.tech/fe/js/636#array)

开放性题目，掌握 JavaScript 中此类最常用的 API 对于面试以及工作都很重要。

### 类数组转化为数组

+ 题目：[js 中如何把类数组转化为数组](https://q.shanyue.tech/fe/js/169)

``` js
Array.from(arrayLike);
Array.apply(null, arrayLike);
Array.prototype.concat.apply([], arrayLike);
```

### 可选链操作符，如何访问数组与函数

+ 题目：[js 中什么是可选链操作符，如何访问数组](https://q.shanyue.tech/fe/js/202)

> 文档见 [可选链操作符 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining) 


`?.` 操作符，可以嵌套获取对象的属性值。通过获取对象属性获得的值可能是 undefined 或 null 时，可选链操作符提供了一种方法来简化被连接对象的值访问。

``` javascript
const o = {}

// 添加可选链之前
o && o.a && o.a.b && o.a.b.c && o.a.b.c.d

// 添加可选链之后
o?.a?.b?.c?.d
```

### 前端中遇到过处理二进制的场景吗

+ 题目：[前端中遇到过处理二进制的场景吗](https://q.shanyue.tech/fe/js/197)

### TypedArray

+ 题目：[什么是 TypedArray](https://q.shanyue.tech/fe/js/198)

见 MDN

### Promise.allSettled() 场景

+ 题目：[有没有用过 Promise.allSettled() ，它是干什么的](https://q.shanyue.tech/fe/js/247)

见 MDN

### 什么是 Iterable 对象，与 Array 有什么区别

+ 题目：[什么是 Iterable 对象，与 Array 有什么区别](https://q.shanyue.tech/fe/js/358)

实现了 `[Symbol.iterator]` 属性的对象即是 `Iterable` 对象，然后可以使用操作符 `for...of` 进行迭代

``` js
> l = [1, 2, 3, 4]
< (4) [1, 2, 3, 4]
> l[Symbol.iterator]
< ƒ values() { [native code] }
```

详细参考 <https://javascript.info/iterable>

### 解构赋值以下对象，他们的值是多少

``` js
const {a: aa, b } = {a: 3, b: 4} 
```

分别打印 `a`、`aa`、`b`，他们的值是多少

+ 题目：[解构赋值对象，他们的值是多少](https://q.shanyue.tech/fe/js/541)

``` js
const { a: aa, b } = { a: 3, b: 4 };

// 其中 a 报错、aa 为3, b 为 4
```

### Map 与 WeakMap 有何区别

+ 题目：[Map 与 WeakMap 有何区别](https://q.shanyue.tech/fe/js/542)

答：

+ `Map`: 可使用任何数据类型作为 key，但因其在内部实现原理中需要维护两个数组，存储 key/value，因此垃圾回收机制无法回收
+ `WeakMap`: 只能使用引用数据类型作为 key。弱引用，不在内部维护两个数组，可被垃圾回收，但因此无法被遍历！即没有与枚举相关的 API，如 `keys`、`values`、`entries` 等

### 如何判断某一个值是数组

+ 题目：[如何判断某一个值是数组](https://q.shanyue.tech/fe/js/563)

``` js
const isArray = Array.isArray || list => ({}).toString.call(list) === '[object Array]'
```

### 简述 Object.defineProperty

+ 题目：[简述 Object.defineProperty](https://q.shanyue.tech/fe/js/564)

与直接为一个对象的属性赋值(o.a = 3)不同，`Object.defineProperty` 可更为精确，拥有更多选项地为对象属性赋值

属性描述符拥有两种: 数据描述符与存取描述符

### Object.keys 与 Object.getOwnPropertyNames() 有何区别

+ 题目：[Object.keys 与 Object.getOwnPropertyNames() 有何区别](https://q.shanyue.tech/fe/js/565)

答：

+ `Object.keys`: 列出可枚举的属性值
+ `Object.getOwnPropertyNames`: 列出所有属性值(包括可枚举与不可枚举)

同时 `Object.defineProperty` 中的选项  `enumerable` 可定义属性是否可枚举

### 如何创建一个数组大小为100，每个值都为0的数组

+ 题目：[如何创建一个数组大小为100，每个值都为0的数组](https://q.shanyue.tech/fe/js/520)

``` js
// 方法一:
Array(100).fill(0);

// 方法二:
// 注: 如果直接使用 map，会出现稀疏数组
Array.from(Array(100), (x) => 0);

// 方法二变体:
Array.from({ length: 100 }, (x) => 0);
```

### Number 中最大数、最大安全整数、EPSILON 都是多少，原理是什么

+ 题目：[Number 中最大数、最大安全整数、EPSILON 都是多少，原理是什么](https://github.com/shfshanyue/Daily-Question/issues/679)

> https://zh.wikipedia.org/zh-cn/%E9%9B%99%E7%B2%BE%E5%BA%A6%E6%B5%AE%E9%BB%9E%E6%95%B8

![](https://upload.wikimedia.org/wikipedia/commons/7/76/General_double_precision_float.png)

### JS 如何检测到对象中有循环引用
### JS 深克隆时如何处理循环引用

## 基础

### 防抖和节流

+ 题目：[什么是防抖和节流，他们的应用场景有哪些](https://q.shanyue.tech/fe/js/3)

答：

+ 防抖：防止抖动，单位时间内事件触发会被重置，避免事件被误伤触发多次。**代码实现重在清零 `clearTimeout`**。防抖可以比作等电梯，只要有一个人进来，就需要再等一会儿。业务场景有避免登录按钮多次点击的重复提交。
+ 节流：控制流量，单位时间内事件只能触发一次，与服务器端的限流 (Rate Limit) 类似。**代码实现重在开锁关锁 `timer=timeout; timer=null`**。节流可以比作过红绿灯，每等一个红灯时间就可以过一批。

### typeof 与 instanceof 的区别

+ 题目：[typeof 与 instanceof 的区别](https://q.shanyue.tech/fe/js/461)

如下：

+ typeof 用以判断基础数据类型 (null 除外)
+ instanceOf 借助原型链判断复杂数据类型

### bind 与 call/apply 的区别是什么

+ 题目：[bind 与 call/apply 的区别是什么](https://q.shanyue.tech/fe/js/268)

他们都是绑定 this 的，但是

1. `bind` 返回函数
1. `call/apply` 直接执行函数

### 在 js 中如何实现继承

+ 题目：[在 js 中如何实现继承](https://q.shanyue.tech/fe/js/382)

有两种方法：

+ `class/extends`
+ `function/new`

### js 中在 new 的时候发生了什么

+ 题目：[js 中在 new 的时候发生了什么](https://q.shanyue.tech/fe/js/341)

如下：

1. 创建一个新的对象
1. this 指向实例，并且执行函数
1. 如果没有显式返回，则默认返回这个实例


### 以下输出顺序多少 (setTimeout 与 promise 顺序)

``` js
setTimeout(() => console.log(0));
new Promise((resolve) => {
  console.log(1);
  resolve(2);
  console.log(3);
}).then((o) => console.log(o));

new Promise((resolve) => {
  console.log(4);
  resolve(5);
})
  .then((o) => console.log(o))
  .then(() => console.log(6));
```

+ 题目：[以下输出顺序多少 (setTimeout 与 promise 顺序)](https://q.shanyue.tech/fe/js/396)

### 请简述一下 event loop

+ 题目：[请简述一下 event loop](https://q.shanyue.tech/fe/js/221)

### 简述 node/v8 中的垃圾回收机制

+ 题目：[简述 node/v8 中的垃圾回收机制](https://q.shanyue.tech/fe/js/293)

### v8 是如何执行一段 JS 代码的

+ 题目：[v8 是如何执行一段 JS 代码的](https://q.shanyue.tech/fe/js/449)

参考几篇文章

+ [V8是如何执行JavaScript代码的？](https://zhuanlan.zhihu.com/p/96502646)
+ [[译]JavaScript是如何工作的：深入V8引擎&编写优化代码的5个技巧](https://zhuanlan.zhihu.com/p/57898561)
+ [JavaScript 引擎 V8 执行流程概述](https://zhuanlan.zhihu.com/p/111386872)

### 关于块级作用域，以下代码输出多少，在何时间输出

``` js
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 1000);
}
```

+ 题目：[关于块级作用域，以下代码输出多少，在何时间输出](https://q.shanyue.tech/fe/js/581)

### 什么是闭包，闭包的应用有哪些地方

+ 题目：[什么是闭包，闭包的应用有哪些地方](https://q.shanyue.tech/fe/js/527)

### 关于简单的事件循环，判断以下代码输出

``` js
setTimeout(() => console.log("A"));

Promise.resolve().then(() => console.log("B"));

console.log("C");
```

+ 题目：[关于简单的事件循环，判断以下代码输出](https://q.shanyue.tech/fe/js/592)

### 关于事件循环，一道异步代码执行输出顺序问题

``` js
setTimeout(() => {
  console.log("A");
  Promise.resolve().then(() => {
    console.log("B");
  });
}, 1000);

Promise.resolve().then(() => {
  console.log("C");
});

new Promise((resolve) => {
  console.log("D");
  resolve("");
}).then(() => {
  console.log("E");
});

async function sum(a, b) {
  console.log("F");
}

async function asyncSum(a, b) {
  await Promise.resolve();
  console.log("G");
  return Promise.resolve(a + b);
}

sum(3, 4);
asyncSum(3, 4);
console.log("H");
```

+ 题目：[关于事件循环，一道异步代码执行输出顺序问题](https://q.shanyue.tech/fe/js/528)

### 关于 Promise，判断以下代码的输出

``` js
Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });
```

+ 题目：[关于 Promise，判断以下代码的输出](https://q.shanyue.tech/fe/js/727)

### 为何 0.1 + 0.2 不等于 0.3，应如何做相等比较

+ 题目：[为何 0.1+0.2 不等于 0.3，应如何做相等比较](https://q.shanyue.tech/fe/js/583)

0.1，0.2 表示为二进制会有精度的损失，比较时可引入一个很小的数值 `Number.EPSILON` 容忍误差，其值为 2^-52。

``` js
function equal (a, b) {
  return Math.abs(a - b) < Number.EPSILON
}
```

### 关于 this 与包装对象，以下输出多少

``` js
function foo() {
  console.log(this);
}

foo.call(3);
```

+ 题目：[关于 this 与包装对象，以下输出多少](https://q.shanyue.tech/fe/js/584)

### 关于类型转化，判断以下代码输出

``` js
Boolean(new Boolean(false));
Boolean(document.all);

[] == "";
[3] == 3;
[] == false;
42 == true;
```

+ 题目：[关于类型转化，判断以下代码输出](https://q.shanyue.tech/fe/js/586)

### 关于暂时性死域，判断以下代码输出

**第一段代码如下**

``` js
var a = 3;
let a;
```

**第二段代码如下**

``` js
var x = 3;

function foo (x=x) {
    // ..
}

foo()
```

+ 题目：[关于暂时性死域，判断以下代码输出](https://q.shanyue.tech/fe/js/587)

### 关于词法作用域，判断以下代码输出

``` js
var scope = "global scope";
function checkScope() {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f;
}

checkScope()();
```

+ 题目：[关于词法作用域，判断以下代码输出](https://q.shanyue.tech/fe/js/588)

### 关于 new，判断以下代码输出

``` js
function F () {
 this.a = 3;
 return {
   a: 4;
 }
}

const f = new F();
console.log(f.a);
```

+ 题目：[关于 new，判断以下代码输出](https://q.shanyue.tech/fe/js/590)

