# A demo client for akshare http api（aktool）

this project is based on [retron](https://github.com/jooy2/retron)

build `node v18.17.0`

本项目依赖aktool https://github.com/akfamily/aktools 端口运行在 8080

## 请使用以下配置来用nginx缓存api请求结果

主要原因是是akshare是爬虫实现，如果请求源地址多次可能会被封ip,本地缓存请求可以加快速度更加流畅。
cache8080.conf

```conf
# 用户请求端口28080,反向代理转发到8080端口,并为请求设置缓存

proxy_cache_key $host$uri$is_args$args;
# 定义缓存区域
proxy_cache_path "E:\\DEV_ENV\\nginx-1.21.6-blog\\cache4h" levels=1:2 keys_zone=cache_zone:256m max_size=2G inactive=4h use_temp_path=off;
proxy_cache_path "E:\\DEV_ENV\\nginx-1.21.6-blog\\cache1m" levels=1:2 keys_zone=cache_zone_1m:256m max_size=2G inactive=1m use_temp_path=off;
# 服务器分组,如果有多台实例可以添加实现集群
upstream backend {
  server 127.0.0.1:8080;
}
server {
  listen 28080;
  # 使用 .cache_m 的url后缀实现1分钟缓存
  # 例如：http://127.0.0.1:28080/api/public/stock_zh_index_spot.cache_m
  location ~ ^/(.*)\.cache_m$ {
    add_header X-Cache $upstream_cache_status;#将缓存是否命中的结果返回
    add_header X-Via $server_addr;#将缓存服务器IP返回
    # 启用缓存,缓存到 keys_zone 指定的区域,空间大小为 1G
    proxy_cache cache_zone_1m;
    proxy_cache_key $host$uri$is_args$args;
    expires 1m;
    add_header x-1 "cache_m";
    # 缓存时间
    proxy_cache_valid any 1m;
    proxy_ignore_headers X-Accel-Expires Expires Cache-Control Set-Cookie;
    rewrite ^/(.*)\.cache_m$ /$1 break;
    proxy_pass http://backend;
  }
  # 默认4小时缓存
  # 例如：http://127.0.0.1:28080/api/public/stock_zh_index_spot
  location / {
    add_header X-Cache $upstream_cache_status;#将缓存是否命中的结果返回
    add_header X-Via $server_addr;#将缓存服务器IP返回
    # 启用缓存,缓存到 keys_zone 指定的区域,空间大小为 1G
    proxy_cache cache_zone;
    proxy_cache_key $host$uri$is_args$args;
    expires 4h;
    add_header x-1 "/";
    # 根据响应代码设置时间
    proxy_cache_valid 200 302 4h;
    proxy_cache_valid 301 4h;
    proxy_cache_valid any 4h;
    proxy_ignore_headers X-Accel-Expires Expires Cache-Control Set-Cookie;
    proxy_pass http://backend;
  }
}
```

## 特性

- material-ui
- 深色模式

## 功能

- ak股票k线
  ![k-line.png](docs%2Fimg%2Fk-line.png)
- ak股票列表
  ![stock-list.png](docs%2Fimg%2Fstock-list.png)
- ak汇率外汇管理局
  ![currency.png](docs%2Fimg%2Fcurrency.png)
- ak 中国油价
  ![oil-price.png](docs%2Fimg%2Foil-price.png)
- ak黄金价格
  ![gold-price.png](docs%2Fimg%2Fgold-price.png)
- ak分析师排行
  ![rank-of-invest.png](docs%2Fimg%2Frank-of-invest.png)
- ak分析师报告
  ![report-of-invest.png](docs%2Fimg%2Freport-of-invest.png)
- k线图2
  ![k-line-2.png](docs%2Fimg%2Fk-line-2.png)
- 指数中心
  ![index-center.png](docs%2Fimg%2Findex-center.png)
- 银行拆借利率
  ![bank-rate-his.png](docs%2Fimg%2Fbank-rate-his.png)
- 新闻联播稿
  ![cctv-news.png](docs%2Fimg%2Fcctv-news.png)
- 进出口数据
  ![import-export.png](docs%2Fimg%2Fimport-export.png)
- 消费者信心
  ![comsumer-confidence.png](docs%2Fimg%2Fcomsumer-confidence.png)
