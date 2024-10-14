#!/bin/bash
set -e

echo -e "\n======================== 1. 准备启动 ========================\n"
#jd update
echo

#crontab /root/jd/config/crontab.list
# 保存环境变量，开启crontab服务
env >> /etc/default/locale
#/etc/init.d/cron start
service cron restart
#jd panelon

# cp -f /root/jd/resource/webshellbinary/ttyd.arm /root/jd/panel/ttyd && [ ! -x /root/jd/panel/ttyd ] && chmod +x /root/jd/panel/ttyd

# nohup /root/jd/panel/ttyd -p 9999 -t fontSize=14 -t disableLeaveAlert=true -t rendererType=webgl bash >/dev/null 2>&1 &

#node /root/jd/panel/server.js
node /root/express/bin/www
echo -e "\n========================  启动完成  ========================\n"

#crond -f

exec "$@"