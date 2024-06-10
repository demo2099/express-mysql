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

cd /var/local
if [ ! -d "./freenom/" ];then
  bash /root/express/docker/gitcronssh.sh
  git clone https://gitee.com/available2099/freenom.git
  echo "freenom下载完成"
else
  echo "freenom文件夹已经存在"
fi
if [ ! -d "./stock/" ];then
  git clone $giturl
  echo "stock下载完成"
else
  echo "stock文件夹已经存在"
fi
if [ ! -d "./cronsonconfig/" ];then
  git clone git@gitee.com:available2099/cronsonconfig.git
  echo "cronsonconfig下载完成"
else
  echo "cronsonconfig文件夹已经存在"
  git -C /var/local/cronsonconfig/ pull
  git -C /root/express/ pull
fi
#启动守护进程，面板和节点
if [[ "${cronmain}" == "main" ]]; then
  nohup /var/local/cronsonconfig/cronweb -conf /var/local/cronsonconfig/conf/base.json > /dev/null 2>&1 &
  nohup /var/local/cronsonconfig/cronnode -conf /var/local/cronsonconfig/conf/base.json > /dev/null 2>&1 &
	echo "cron面板和node启动成功！"
else
  nohup /var/local/cronsonconfig/cronnode -conf /var/local/cronsonconfig/conf/base.json > /dev/null 2>&1 &
  echo "node启动成功！"
fi

# 下载数据更新定时任务
git -C /var/local/stock/ pull
bash  /var/local/stock/math/cronsync.sh
cd
# cp -f /root/jd/resource/webshellbinary/ttyd.arm /root/jd/panel/ttyd && [ ! -x /root/jd/panel/ttyd ] && chmod +x /root/jd/panel/ttyd

# nohup /root/jd/panel/ttyd -p 9999 -t fontSize=14 -t disableLeaveAlert=true -t rendererType=webgl bash >/dev/null 2>&1 &

#node /root/jd/panel/server.js
node /root/express/bin/www
echo -e "\n========================  启动完成  ========================\n"

#crond -f

exec "$@"