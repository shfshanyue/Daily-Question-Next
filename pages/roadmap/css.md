# 面试大厂，这些 CSS 问题一定要掌握

在现代前端中，面试对于 CSS 的考察要求较低，几乎无法与 JavaScript 相提并论，甚至无法与 JavaScript 的某一细分专题相提并论。

本文中列举了若干 CSS 面试题，可应付大部分公司的 CSS 面试。

关于更多 CSS 面试题，可查看 [CSS 面试题大全](https://github.com/shfshanyue/Daily-Question/labels/css)

## 盒模型

+ 题目：[简述 CSS 的盒模型](https://q.shanyue.tech/fe/css/626)

CSS 的盒模型主要包括以下两种，可通过 [box-sizing](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing) 属性进行配置：

+ `content-box`：默认属性。width 只包含 content
+ `border-box`：width 包含 (content、padding、border)

## CSS specificity (权重)

+ 题目：[简述下 css specificity](https://github.com/fe/css/311)

`css specificity` 即 css 中关于选择器的权重，以下三种类型的选择器依次下降

1. `id` 选择器，如 `#app`
1. `class`、`attribute` 与 `pseudo-classes` 选择器，如 `.header`、`[type="radio"]` 与 `:hover`
1. `type` 标签选择器和伪元素选择器，如 `h1`、`p` 和 `::before`

其中通配符选择器 `*`，组合选择器 `+ ~ >`，否定伪类选择器 `:not()` 对优先级无影响

另有内联样式 `<div class="foo" style="color: red;"></div>` 及 `!important`(最高) 具有更高的权重

> [`:not` 的优先级影响 - codepen](https://codepen.io/shanyue/pen/dyGQqBe) 可以看出 `:not` 对选择器的优先级无任何影响

> [CSS Specificity - codepen](https://codepen.io/shanyue/pen/XWMRQOw) 可以看出十几个 class 选择器也没有一个 id 选择器权重高

补充问题:

1. 100 个 class 选择器和 id 选择器那个比较高
1. [属性选择器和类选择器哪个权重较高](https://q.shanyue.tech/fe/css/323)
1. 通配符选择器和元素选择器哪个权重教高

## '+' 与 '~' 选择器有什么不同

+ [【Q315】'+' 与 '~' 选择器有什么不同](https://q.shanyue.tech/fe/css/317)

+ `+` 选择器匹配紧邻的兄弟元素
+ `~` 选择器匹配随后的所有兄弟元素

## z-index 与层叠上下文

+ 题目：[如何更好地给元素设置 z-index](https://q.shanyue.tech/fe/css/505)
+ 题目：[z-index: 999 元素一定会置于 z-index: 0 元素之上吗](https://q.shanyue.tech/fe/css/579)

`z-index` 高数值一定在低数值前边吗，div 层级如下所示

+ A -> 3
  + AA -> 1000
+ B -> 4
  + BB -> 10

代码见 [zindex - codepen](https://codepen.io/shanyue/pen/XWMVpxJ)

不一定，更复杂的示例见 [层叠上下文 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)

## 水平垂直居中

+ 题目: [如何实现一个元素的水平垂直居中](https://q.shanyue.tech/fe/css/10)
+ 代码: [absolute/translate](https://codepen.io/shanyue/pen/XWMdabg?editors=1100)

宽高不定的块状元素水平垂直居中，可见以下示例

+ [absolute/translate](https://codepen.io/shanyue/pen/XWMdabg?editors=1100)

同时提供几种不同的思路：

+ flex:
  + `justify-content: center`
  + `align-content: center`
+ grid
  + `place-items: center`
+ absolute/translate
  + `position: absolute`
  + `left/top: 50%`
  + `transform: translate(50%)`
+ ##absolute/inset##

## 左侧固定、右侧自适应

+ 题目: [css 如何实现左侧固定300px，右侧自适应的布局](https://q.shanyue.tech/fe/css/18)
+ 代码: [代码](https://codepen.io/shanyue/pen/GRWmbyb?editors=1100)

提供 `flex` 与 `grid` 布局的两种思路

+ flex:
  + 左侧: `flex-basis: 200px`
  + 右侧: `flex-grow: 1; flex-shrink: 0;`
+ grid
  + 父容器: `grid-template-columns: 200px 1fr;`

``` pug
.container
  .left
  .main
```

``` css
.container {
  display: grid;
  grid-template-columns: 300px 1fr;
}
```
  
## 三栏均分布局

+ 题目: [如何实现三列均分布局](https://q.shanyue.tech/fe/css/572)
+ 代码: [如何实现三列均分布局](https://codepen.io/shanyue/pen/yLMzxqX)

同样提供 `flex` 与 `grid` 的两种方案

+ flex:
  + 方案一: `flex: 1;`
  + 方案二: `flex-basis: calc(100% / 3)`
+ grid:
  + 父容器: `grid-template-columns: 1fr 1fr 1fr`

进一步问题：如何实现十六列均分布局？
  
## 如何画一个正方形/长宽固定的长方形

+ 问题：[如何画一个正方形/长宽固定的长方形](https://q.shanyue.tech/fe/css/547)

过去的解决方案是使用 `padding`。一个元素的 `padding` 如若设置为百分比，则代表的是以父元素宽度为基准，根据这个原理，可设置长宽比。但实际上意义有限，毕竟你把 padding 给占了，content 无任何区域。

现代化的解决方案是使用长宽比的 CSS 属性: `aspect-ratio`。

## CSS 如何避免样式冲突

+ 题目：[写 CSS 时如何避免命名样式冲突](https://q.shanyue.tech/fe/css/493)

### 1. BEM 式: `.home-page .home-page-btn`

``` css
.home-page {
  .home-page-btn {}
}
```

BEM 有一个缺点，就是有些太长，可适当简化，只包裹该页面组件的根类名，但有可能增加样式冲突的风险

``` css
.home-page {
  .btn {}
}
```

### 2. CSS Scoped

`scoped css` 会对当前组件(scope)下所有元素生成唯一的属性或类名，对所有 CSS 规则将携带唯一属性实现作用域的命名保护

``` css
// 手动写
.btn {}

// 编译后
.btn .jsx-1287234 {}

```

![css scoped demo](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c0676b0f8cc4f40b925dcb983778dd8~tplv-k3u1fbpfcp-watermark.image)

### 3. CSS Module

+ [css-modules repo](https://github.com/css-modules/css-modules)
+ [css-modules demo](https://css-modules.github.io/webpack-demo/)

`module css` 会对类名进行 hash 化

![css modules demo](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/072649f56f8f4f80afa226879b94a6bf~tplv-k3u1fbpfcp-watermark.image)

## CSS 变量

+ 题目：[有没有使用过 css variable，它解决了哪些问题](https://q.shanyue.tech/fe/css/185)

``` css
:root{
  --bgcolor: #aaa;
  --color: #000;
}
```

## CSS 配置暗黑模式

+ 题目：[如何使用 CSS 实现网站的暗黑模式 (Dark Mode)](https://q.shanyue.tech/fe/css/375)

最简单来讲，可通过媒体查询 `@media (prefers-color-scheme: dark)` 与 CSS 变量实现。

``` css
@media (prefers-color-scheme: dark) {
    :root{
    }
}
```