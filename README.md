# A demo client for akshare http api（aktool）

this project is based on [retron](https://github.com/jooy2/retron)

build `node v18.17.0`

本项目依赖aktool https://github.com/akfamily/aktools 端口运行在 8080

## 请使用以下配置来用nginx缓存api请求结果

cache8080.conf

```conf
# 用户请求端口28080,代理转发到8080端口
server {
  listen 28080;

  location / {
    proxy_pass http://localhost:8080;

    # 启用缓存,缓存到 keys_zone 指定的区域,空间大小为 1G
    proxy_cache cache_zone;
    proxy_cache_key $host$uri$is_args$args;
    expires 1d;
    # 缓存时间为1天
    proxy_cache_valid 200 302 1d;
    proxy_cache_valid 301 1d;
    proxy_cache_valid any 1d;
    proxy_ignore_headers X-Accel-Expires Expires Cache-Control Set-Cookie;
  }
}

# 定义缓存区域
proxy_cache_path "E:\\DEV_ENV\\nginx-1.21.6-blog\\cache" levels=1:2 keys_zone=cache_zone:1024m max_size=10G inactive=60m use_temp_path=off;
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
