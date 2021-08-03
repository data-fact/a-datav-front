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

## 定制

我们已经开源了几十个功能丰富的大屏组件，支持静态数据和api两种数据源，如果这些无法满足您的需求，我们还对组件做了合理的解偶，使您可以简单学习就能定制自己的组件。

### 组件定制开发

下面我会和您一起定制一个简单的背景组件，在这之前，您需要了解React的基本语法。

- 每个组件至少包含3个文件(文件名随便)：
  1.state.js：组件状态。
  2.Renderer.js：组件渲染器。
  3.Configer.js：组件配置器。
- 在 datav-create/components 下创建文件夹 demo，在demo中创建文件夹 background-demo，这是我们存放组件代码的地方。
- 新建组件状态文件 datav-create/components/demo/background-demo/state.js ：
  ```jsx
  import common_state from "../../common/common_state";
  const state = {
      ...common_state,  //继承通用组件状态，包含组件位置、大小、数据等信息
      w: 1000,          //重写组件默认宽度
      h: 600,           //重写组件默认高度
      backgroundColor: 'rgba(21,163,132,1)'  //自定义字段，Configer中对该值的修改会触发Renderer重新渲染
  }
  export default state;
  ```
- 新建组件渲染器 datav-create/components/demo/background-demo/Renderer.js：
  ```jsx
  import React from 'react'
  
  export default function Renderer({component}){
  
      //component为组件状态，组件状态改变会触发渲染器重新渲染
      let {i: id,_ready,backgroundColor,w,h} = component
      //这里是固定写法，组件非ready时很多属性为空值，如果继续执行可能导致空指针
      if(!_ready)
          return null
      //返回一个简单的div，背景色是在state.js中定义的backgroundColor属性，Configer中可以对该属性进行修改
      return <div style={{backgroundColor:backgroundColor,width: w,height: h}}></div>
  }
  ```
- 新建组件配置器 datav-create/components/demo/background-demo/Configer.js：
  ```jsx
  import React from 'react'
  import { Row,Col } from 'antd4'
  import state from "./state";
  import useUpdateComponent from "../../../hooks/useUpdateComponent";
  import useInitComponent from "../../../hooks/useInitComponent";
  import Palette from "../../../../lib/palette/Palette";
  
  export default function Configer({component}){
      //component为组件状态
      let {i: id,backgroundColor} = component
      //更新组件数据的hooks
      let updateComponent = useUpdateComponent()
      //固定写法，初始化state，执行结束会将组件_ready状态置为true
      let ready = useInitComponent(component,state)
      //固定写法，组件非ready时很多属性为空值，如果继续执行可能导致空指针
      if(!ready)
          return null
      //处理背景色改变事件，调用updateComponent函数提交指定组件的变化
      function handleColorChange(color) {
          //参数1是组件id，组件初始化后，会自动生成唯一id保存到组件状态中
          //参数2是组件状态的改变部分，这些改变会触发渲染器的重新渲染
          updateComponent(id,{backgroundColor: color})
      }
      //页面显示一个调色盘，允许用户修改背景色
      return (
          <>
              <Row style={{marginBottom: 4}}>
                  <Col span={6}>背景颜色</Col>
                  <Col span={18}>
                      <Palette color={backgroundColor} onChange={handleColorChange}/>
                  </Col>
              </Row>
          </>
      )
  }
  ```
- 在框架中定义我们的组件：
  datav-create/components/config/index.js中定义了所有组件，为保证可读性，每个大类单独拆分成单个文件。
  ```jsx
  import React from 'react'
  import general from "./general";
  import antv from "./antv";
  import word from "./word";
  import material from "./material";
  import interactive from "./interactive";
  import custom from "./custom";
  import demo from "./demo";
  import geo from "./geo";
  import hidden from "./hidden";
  
  export default {
      general: general,
      antv: antv,
      geo: geo,
      word: word,
      material: material,
      interactive: interactive,
      custom: custom,
      demo: demo,    //在这里定义demo组件
  
      hidden: hidden //该目录下组件不在列表中显示，可作为子组件使用
  }
  ```

  在datav-create/components/config/demo.js中定义我们的背景组件。
  ```jsx
  import loadable from '@loadable/component'
  import {BarChartOutlined, LineChartOutlined, PictureOutlined} from '@ant-design/icons';
  
  const demo = {
      //一级名称和图标
      icon: BarChartOutlined,
      descr: 'demo',
      children: {
          //二级名称和图标，如果是deft，则页面不显示二级
          deft: {
              icon: LineChartOutlined,
              descr: '折线图',
              children: {
                  //三级名称和图标，包括具体组件的配置器和渲染器，也可以用图片代替图标，参考其他组件
                  background1: {
                      icon: PictureOutlined,
                      descr: '我的背景组件',
                      //我们定制背景组件的配置器，loadable保证组件懒加载，节省带宽
                      configer: loadable(() => import(`../demo/background-demo/Configer`)),
                      //我们定制背景组件的渲染器
                      renderer: loadable(() => import(`../demo/background-demo/Renderer`))
                  }
              }
          },
      }
  }
  export default demo;
  ```
- 完成后，项目改变部分文件结构如下：
  ```
  a-datav
    |_front
      |_datav-create
        |_components
          |_config
            |_demo.js
            |_index.js
          |_demo
            |_background-demo
              |_Configer.js
              |_Renderer.js
              |_state.js
  ```
- 至此，我们的背景组件就开发成功了，可以刷新页面看到成果。组件虽然简单，但包含了最基本的组件开发思路。我们可以举一反三，参考其他组件定制更多更高级更复杂的组件。
- 当然，一个强大的组件还需要更多高级特性，比如组件交互、数据结构定义、显示隐藏控制、父子组件等。您可以参考其他组件定制，或联系我们。

## 集成
该项目为组件开发平台，组件最终使用需要集成到a-datav，开发完成后需要将新代码复制到主项目(a-datav)下front文件夹中相同路径下。

详情请参考 [a-datav](https://github.com/data-fact/a-datav) 中的 `README.md`