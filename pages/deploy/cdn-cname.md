## CDN 厂商常见 CNAME

## 网站

总结下常见网站，但是目前仅仅只有十几个网站

> 在哪里可以获取到中国的排名前一万的域名呢？

``` json
{ "name": "掘金", "host": "juejin.cn" }
{ "name": "抖音", "host": "www.douyin.com" }
{ "name": "知乎", "host": "www.zhihu.com" }
{ "name": "淘宝", "host": "www.taobao.com" }
{ "name": "腾讯", "host": "www.qq.com" }
{ "name": "豆瓣", "host": "www.douban.com" }
{ "name": "微博", "host": "weibo.com" }
{ "name": "贴吧", "host": "tieba.baidu.com" }
{ "name": "网易云", "host": "music.163.com" }
{ "name": "哔哩哔哩", "host": "www.bilibili.com" }
{ "name": "我的博客", "host": "shanyue.tech" }
```

通过以下命令对以上 JSON 中的域名逐个进行解析，可获得其所有的 CNAME 与 A 记录

``` bash
$ cat domain.jsonl | jq ".host" | xargs -I {} sh -c "echo {}; dig +short -t cname {}; echo " | less
```

## 总结

+ 阿里云
  + `w.cdngslb.com`
  + `w.kunlunca.com`
+ 腾讯云
  + `dsa.dnsv1.com`
