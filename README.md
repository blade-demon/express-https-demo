# 功能

https服务器，http 协议可以自动转到https

# 生成key和crt文件

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./selfsigned.key -out selfsigned.crt
