---
title: 'HTTP 高频面试题整理 - 前端面试路线图'
description: '系统整理前端面试常见的HTTP面试题，包括HTTP状态码、报文、缓存、跨域、HTTPS等核心知识点，助你轻松应对大厂技术面试中的HTTP相关问题'
---

# 面试大厂，这些 HTTP 面试题要掌握

可根据 [HTTP 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP) 进行学习。

## http 状态码

+ 题目：[http 常见的状态码有哪些](https://q.shanyue.tech/fe/http/36)
+ 题目：[http 状态码 204 使用在什么场景](https://q.shanyue.tech/fe/http/599)
+ 题目：[http 状态码 301，302和307有什么区别](https://q.shanyue.tech/fe/http/37)
+ 题目：[http 状态码 401 和 403 有什么区别](https://q.shanyue.tech/fe/http/438)
+ 题目：[http 状态码 502 和 504 有什么区别](https://q.shanyue.tech/fe/http/51)

肯定会碰到: 101/200/201/301/302/304/400/401/404/502 需要完整说出其状态码，描述语（如 200 OK，404 Not Found, 502 Bad Gateway）以及释义。
可能会碰到: 101/200/201/204/206/301/304/307/400/401/403/404/405/413/422/429/500/501/502/503/504 尽力而为

## HTTP 报文

+ 题目：[http 的请求报文与响应报文的格式是什么](https://q.shanyue.tech/fe/http/111)
+ 题目：[http 方法 get 与 post 有何区别](https://q.shanyue.tech/fe/http/596)

GET 请求报文如下：

![](https://static.shanyue.tech/images/23-09-15/clipboard-9447.78475f.webp)

POST 请求报文如下：

![](https://static.shanyue.tech/images/23-09-15/clipboard-6319.cd1372.webp)

## HTTP 缓存

+ 题目：[简述 http 的缓存机制](https://q.shanyue.tech/fe/http/80)
+ 题目：[当服务器资源返回 304 时与那些 HTTP 响应头有关](https://q.shanyue.tech/fe/http/441)

Http 缓存分为以下两种，两者都是通过 HTTP 响应头控制缓存

1. 强制缓存
1. 协商缓存

### 强制缓存

再次请求时无需再向服务器发送请求

``` bash
              client         server
GET /a.ab389z.js ------->
                      <------- 200 OK
(再也不会发请求)
```

与之相关的 Response Headers 有以下几个

+ `Expires`

  这个头部也是丧心病狂：使用绝对时间，且有固定的格式 <https://tools.ietf.org/html/rfc822#section-5.1>

  ``` bash
  Expires: Mon, 25 Oct 2021 20:11:12 GMT
  ```

+ `Cache-Control`，具有强大的缓存控制能力

  常用的有以下两个

  + `no-cache`，每次请求需要校验服务器资源的新鲜度
  + `max-age=31536000`，浏览器在一年内都不需要向服务器请求资源

### 协商缓存

再次请求时，需要向服务器校验新鲜度，如果资源是新鲜的，返回 304，从浏览器获取资源

``` bash
           client         server
GET /a.js   ----------->
                   <----------- 200 OK
GET /a.js   ----------->
                   <----------- 304 Not Modified
```

与之相关的 Request/Response Headers 有以下几个

+ `Last-Modified`/`If-Modified-Since`
+ `Etag`/`If-None-Match`

### 缓存策略

+ 题目：[简述你们前端项目中资源的缓存配置策略](https://q.shanyue.tech/fe/http/193)
+ 题目：[现代前端应用应如何配置 HTTP 缓存机制](https://q.shanyue.tech/fe/http/600)

关于 http 缓存配置的最佳实践为以下两条：

1. 文件路径中带有 hash 值：一年的强缓存。因为该文件的内容发生变化时，会生成一个带有新的 hash 值的 URL。前端将会发起一个新的 URL 的请求。配置响应头 `Cache-Control: public,max-age=31536000,immutable`
1. 文件路径中不带有 hash 值：协商缓存。大部分为 `public` 下文件。配置响应头 `Cache-Control: no-cache` 与 `etag/last-modified`

## HTTP Header

### gzip 配置

+ 题目：[gzip 的原理是什么，如何配置](https://q.shanyue.tech/fe/http/109)

一句话：`gzip` 的核心是 `Deflate`，而它使用了 `LZ77` 算法与 `Huffman` 编码来压缩文件，重复度越高的文件可压缩的空间就越大。

因此 `gzip` 用于 HTTP 文件传输中，比如 JS、CSS 等，**但一般不会压缩图片**。在 HTTP Response 报文中，用 `Content-Encoding` 指明使用 gzip 压缩，而以下响应头在大部分生产环境的响应报文中都可以看到！

### 跨域

+ 题目：[什么情况下会发送 OPTIONS 请求](https://q.shanyue.tech/fe/http/363)
+ 题目：[关于 cors 的响应头有哪些](https://q.shanyue.tech/fe/http/328)

**当一个请求跨域且不是简单请求时就会发送 `OPTIONS` 请求**

满足以下条件就是一个简单请求:

1. `Method`: 请求的方法是 `GET`、`POST` 及 `HEAD`
1. `Header`: 请求头是 `Content-Type`、`Accept-Language`、`Content-Language` 等
1. `Content-Type`: 请求类型是 `application/x-www-form-urlencoded`、`multipart/form-data` 或 `text/plain`

而在项目中常见的 `Content-Type: application/json` 及 `Authorization: <token>` 为典型的**非简单请求**，在发送请求时往往会带上 `Options`

> 更详细内容请参考 [CORS - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

与 CORS 有以下相关的响应头

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`
- `Access-Control-Allow-Headers`
- `Access-Control-Allow-Credentials`
- `Access-Control-Expose-Headers`
- `Access-Control-Max-Age`

关于如何写一个 `cors` 的中间件可以参考 [koajs/cors](https://github.com/koajs/cors)

### Cookie/SameSite

+ [SameSite Cookie 有哪些值，是如何预防 CSRF 攻击的](https://q.shanyue.tech/fe/http/569)
【Q267】CSP 是干什么用的了

> 见文档 [SameSite Cookie - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
> 见文章 [Cookie 的 SameSite 属性](http://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)

+ None: 任何情况下都会向第三方网站请求发送 Cookie
+ Lax: 只有导航到第三方网站的 Get 链接会发送 Cookie，跨域的图片、iframe、form表单都不会发送 Cookie
+ Strict: 任何情况下都不会向第三方网站请求发送Cookie

目前，主流浏览器 Same-Site 的默认值为 `Lax`，而在以前是 `None`，将会预防大部分 CSRF 攻击，如果需要手动指定 `Same-Site` 为 `None`，需要指定 Cookie 属性 `Secure`，即在 https 下发送

## https

+ 题目：[简述下 TLS 握手过程](https://q.shanyue.tech/fe/http/393)
+ 题目：[https 中如何保证证书是可信任的](https://q.shanyue.tech/fe/http/254)
+ 题目：[在 TLS 层如何优化网站性能](https://q.shanyue.tech/fe/http/408)

TLS 握手的详细过程可参考下图：

![TLS handshake](https://www.oreilly.com/library/view/high-performance-browser/9781449344757/images/hpbn_0402.png)

> 以上图片来自 [high-performance-browser](https://www.oreilly.com/library/view/high-performance-browser/9781449344757/ch04.html)

从 `wireshark` 抓包，也可以看到握手的详细流程，建议抓包加强理解，以下是抓包 `https://q.shanyue.tech` 时的握手流程

通过 `curl -vvv --head` 来查看握手信息:

```bash
$ curl -vvv --head  https://q.shanyue.tech
*   Trying 111.6.180.235...
* TCP_NODELAY set
* Connected to q.shanyue.tech (111.6.180.235) port 443 (#0)
* ALPN, offering h2
* ALPN, offering http/1.1
* successfully set certificate verify locations:
*   CAfile: /etc/ssl/cert.pem
  CApath: none
* TLSv1.2 (OUT), TLS handshake, Client hello (1):
* TLSv1.2 (IN), TLS handshake, Server hello (2):
* TLSv1.2 (IN), TLS handshake, Certificate (11):
* TLSv1.2 (IN), TLS handshake, Server key exchange (12):
* TLSv1.2 (IN), TLS handshake, Server finished (14):
* TLSv1.2 (OUT), TLS handshake, Client key exchange (16):
* TLSv1.2 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.2 (OUT), TLS handshake, Finished (20):
* TLSv1.2 (IN), TLS change cipher, Change cipher spec (1):
* TLSv1.2 (IN), TLS handshake, Finished (20):
* SSL connection using TLSv1.2 / ECDHE-RSA-AES128-GCM-SHA256
* ALPN, server accepted to use h2
* Server certificate:
*  subject: CN=q.shanyue.tech
*  start date: Dec  2 00:00:00 2019 GMT
*  expire date: Dec  1 12:00:00 2020 GMT
*  subjectAltName: host "q.shanyue.tech" matched cert's "q.shanyue.tech"
*  issuer: C=US; O=DigiCert Inc; OU=www.digicert.com; CN=Encryption Everywhere DV TLS CA - G1
*  SSL certificate verify ok.
* Using HTTP2, server supports multi-use
* Connection state changed (HTTP/2 confirmed)
* Copying HTTP/2 data in stream buffer to connection buffer after upgrade: len=0
* Using Stream ID: 1 (easy handle 0x7f95ba80dc00)

```

### 握手过程

在 TLS 1.2 中，握手协议过程需要耗费两个 RTT，过程如下

+ [OUT] Client Hello，客户端选出自身支持的 TLS 版本号、cipher suites、Client Random、SessionId 传送给服务器端 (有可能可复用 Session)
+ [IN] Server Hello，服务器端选出双方都支持的 TLS 版本，cipher suite 、Server Random、SeesionId 给客户端
+ [IN] Certificate，服务器端给客户端发送证书，用以身份验证及提供公钥
+ [IN] Server Key Exchange，服务器端给客户端发送密钥交换算法的一些参数
+ [IN] Server Finished
+ [OUT] Client Key Exchange，客户端给服务器端发送密钥交换算法的一些参数，计算出预主密钥 (`pre master secret`)，使用密钥交换算法（一般是 ECDHE）传递给服务器端。双方根据（Client Random、Server Random、Pre Master Secret）三个随机数生成对称加密中的密钥（`master secret`）。（再根据 `master secret` 生成 `Session Keys`，包括 `Client MAC Key`、`Client Write Key`、`Server MAC Key`、`Server Write Key`。用以以后对的通信加密。）
+ [OUT] Change Cipher Spec，告知以后的消息开始对称加密通信
+ [OUT] Finished，加密消息并完整性验证，标志着握手阶段成功并结束（对握手消息使用 `Client Write Key` 加解密，并使用 `Client MAC Key` 进行完整性校验）
+ [IN] Change Cipher Spec，告知以后的消息开始对称加密通信。此时服务器端通过密钥交换算法拿到 `pre master secret`，并根据三个随机数生成 `master secret`。
+ [IN] Finished，加密消息并完整性验证，标志着握手阶段成功并结束

> 注，对于（）内容在面试中可以忽略不答

### 相关链接

- [https 握手流程详解](https://juejin.im/post/6844904135230390279#heading-10)
- [Chapter 4. Transport Layer Security (TLS)](https://www.oreilly.com/library/view/high-performance-browser/9781449344757/ch04.html)

## http2

+ 题目：[http2 与 http1.1 有什么改进](https://q.shanyue.tech/fe/http/86)
+ 题目：[http2 中的首部压缩的实现原理是什么](https://q.shanyue.tech/fe/http/275)
+ 题目：[http2 中 Stream 与 Frame 是什么关系](https://q.shanyue.tech/fe/http/670)

关于 `http2` 可以阅读谷歌 `web.dev` 的文档 [Introduction to HTTP/2](https://web.dev/performance-http2/)

关于 HTTP2 有以下改进

1. 二进制分帧
1. 请求多路复用 (Stream/Frame)
1. 头部压缩: (HPack)
1. 服务端推送: (Server Push)

## http3

+ 题目：[http3 解决了什么问题](https://q.shanyue.tech/fe/http/450)