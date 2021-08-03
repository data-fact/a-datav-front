# a-datav纯前端

该项目用于开发调试a-datav前端组件，完整工程请参考[a-datav](https://github.com/data-fact/a-datav)

演示站：[http://dc.aleiye.cn:8899/](http://dc.aleiye.cn:8899/) \
操作手册：[http://dc.aleiye.cn:8899/help.html](http://dc.aleiye.cn:8899/help.html)

## 环境

`nodejs v10+` \
`npm v6.14+`

## 准备

1. 安装 nodejs v10+ 和 npm v6.14+ ，按照官网安装即可。
2. 进入a-datav-front项目跟目录，执行 `npm install` ，安装前端依赖。
3. 依赖安装完成后，执行 `npm run start` ，启动项目。
4. 启动完成后，浏览器访问 `http://localhost:3000/` 。

## 开发

1.`src/datav-create/components` 为组件目录，新组件在该目录创建
2.`src/datav-create/components/config` 为组件声明目录，新组件需在该目录下声明

## 集成
该项目为组件开发平台，组件最终使用需要集成到a-datav，开发完成后需要将新代码复制到主项目(a-datav)下front文件夹中相同路径下。

详情请参考 [a-datav](https://github.com/data-fact/a-datav) 中的 `README.md`