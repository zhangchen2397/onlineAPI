onlineAPI
======

在项目开发过程中，会产出大量的API，通常我们会采用wiki或文档的方式记录，产生的问题是文档比较分散，格式不统一，维护难等问题。

这个api管理小平台主要解决以上这些问题，按项目展现API，采用统一的格式，添加方式采用码农更高效的JSON方式添加，非常适合团队使用。主要功能如下：

1. api在线管理（添加、删除、修改）
2. api按项目分类管理
3. api模拟调用

### 看长什么样子

![api demo](https://github.com/zhangchen2397/doc/blob/master/onlineAPI/demo.fw.png?raw=true)

###使用说明

该平台采用`nodejs` + `mongodb`搭建，启动服务前请确保已安装好node及mongodb的环境

1. clone代码至本地

    ```
    git clone https://github.com/zhangchen2397/onlineAPI.git onlineAPI
    ```

2. 安装依赖

    ```
    npm install
    ```

3. 启动服务

    ```
    node app.js
    ```

4. 访问

    ```
    http://localhost:1337
    ```

