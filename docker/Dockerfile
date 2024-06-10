FROM python:3-slim-buster
LABEL maintainer="Highdimen"
ARG JS_TOOL_URLR=http://124.223.11.108:13000/demo2099/express-mysql.git
ARG JS_TOOL_BRANCH=master
# 设置非交互式前端，避免安装google-chrome-stable时出现问题
ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
    LC_ALL=C \
    LANG=zh_CN.UTF-8 \
    SHELL=/bin/bash \
    PS1='\u@\h:\w $ ' \
    JD_DIR=/root/express \
    ENABLE_TG_BOT=false \
    ENABLE_WEB_PANEL=true \
    DEBIAN_FRONTEND=noninteractiv
# RUN pip install --upgrade pip
# RUN pip3 install --upgrade pip && pip3 install pipenv
RUN apt-get update \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y   nodejs \
    && apt-get update -y \
    &&  pip3 install pipenv \
    && apt-get install -y  apt-utils npm procps gnupg
RUN npm install -g pnpm \
    && apt-get install -y vim cron git wget curl\
    && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && rm -rf /var/lib/apt/lists/*
# Copy hello-cron file to the cron.d directory
RUN service cron start
WORKDIR $JD_DIR
RUN    git clone -b $JS_TOOL_BRANCH $JS_TOOL_URLR $JD_DIR \
    && chmod -R 777 ${JD_DIR}/ \
    && cd ${JD_DIR}/ \
    && npm install -g pnpm \
    && cd ${JD_DIR} \
    && npm install \
    #&& jd panelon \
    && rm -rf /root/.npm
#COPY requirements.txt ./

RUN pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple \
    && pip3 config set global.timeout  6000 \
    && pip3 config set install.trusted-host pypi.tuna.tsinghua.edu.cn \
    && pip3 install --upgrade pip \
    && pip install akshare --upgrade
#RUN pip install selenium requests redis PyMySQL
#RUN pip install akshare --user
#RUN cd /var/local
#RUN git clone https://gitee.com/available2099/freenom.git
#RUN pip install --ignore-installed packaging
#RUN pip3 install --no-cache-dir -r requirements.txt
ENTRYPOINT bash $JD_DIR/docker/docker-entrypoint.sh
# CMD ["tail", "-f", "/dev/null"]
#CMD node /root/jd/panel/server.js
# docker run -d -p 2900:5678 -p 2999:9999 -e ENABLE_HANGUP=true -e ENABLE_WEB_PANEL=true available2099/crontool:slim
# 清除docker 缓存 docker system prune --volumes
# docker run -d -p 2900:5678 -p 2999:9999 -e ENABLE_HANGUP=true -e ENABLE_WEB_PANEL=true available2099/crontool:slim
# docker run -d -p 9900:5678 -p 9999:9999 -e ENABLE_HANGUP=true -e ENABLE_WEB_PANEL=true available2099/crontool:slim

#docker run -d --net=host --hostname hk   -e crontype=false -e cronsspanel=sspanel -e cronmain=false -e giturl=http://124.223.11.108:13000/demo2099/stock.git --name crontool --restart=always -v /usr/bin/docker:/usr/bin/docker -v /var/run/docker.sock:/var/run/docker.sock -v /var/local/crondata:/var/local/crondata  -v /root/.acme.sh:/root/.acme.sh -v /etc/v2ray-agent/tls/:/etc/v2ray-agent/tls/  -e ENABLE_HANGUP=true -e ENABLE_WEB_PANEL=true available2099/crontool:2024