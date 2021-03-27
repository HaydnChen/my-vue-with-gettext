<template>
    <div>
      <Card style="margin-bottom: 20px">
        <p slot="title">新建页面</p>
        <code>
&lt;template&gt;<br/>&nbsp;&nbsp;&lt;div&nbsp;id="demo"&gt;&lt;/div&gt;<br/>&lt;/template&gt;<br/>&lt;script&gt;<br/>
export&nbsp;default&nbsp;{<br/>
&nbsp;&nbsp;name:&nbsp;'demo'<br/>
}<br/>
&lt;/script&gt;<br/>
&lt;style&gt;<br/>
&lt;/style&gt;
        </code>
      </Card>
      <Card style="margin-bottom: 20px">
        <p slot="title">配置路由</p>
        <p>在[src]-[router]-[routers.js]文件中配置</p>
        <div style="width:50%;display:inline-block;margin:0;">
          <code>
    // a.第一种情况：只有一级菜单<br/>
    path: '/demo',  // 必填<br/>
    name: 'demo',  // 必填<br/>
    meta: {<br/>
      &nbsp;&nbsp;hideInBread: true,  //选填,设为true后此级路由将不会出现在面包屑中<br/>
      &nbsp;&nbsp;hideInMenu: false  //选填,设为true后在左侧菜单不会显示该页面选项<br/>
      &nbsp;&nbsp;//notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致<br/>
      &nbsp;&nbsp;//access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由<br/>
      &nbsp;&nbsp;//icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'<br/>
      &nbsp;&nbsp;//beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数<br/>
    },<br/>
    component: Main,  // 必填<br/>
    children: [<br/>
      &nbsp;&nbsp;{<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;path: 'demo_page',  // 必填<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;name: 'demo_page',  // 必填<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;meta: {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;icon: 'md-apps',  // 必填<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title: '示例'  // 必填<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;},<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;component: () => import('@/view/demo/demo-page.vue')  // 必填<br/>
      &nbsp;&nbsp;}<br/>
    ]<br/>
  </code>
        </div>
        <div style="width:50%;display:inline-block;margin:0;">
          <code>
    // b.第二种情况：有二级菜单<br/>
    path: '/demo',  // 必填<br/>
    name: 'demo',  // 必填<br/>
    redirect: '/demo/demo-children',  // 选填，如果不填,在地址栏输入时将默认打开此一级菜单对应的第一个二级菜单页面<br/>
    meta: {<br/>
      &nbsp;&nbsp;icon: 'ios-book',  // 必填<br/>
      &nbsp;&nbsp;title: '示例'  // 必填<br/>
    },<br/>
    component: Main,  // 必填<br/>
    children: [<br/>
      &nbsp;&nbsp;{<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;path: 'demo_page1',  // 必填<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;name: 'demo_page1',  // 必填<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;meta: {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;icon: 'logo-dropbox',  // 必填<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title: '示例页面1'  // 必填<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;},<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;component: () => import('@/view/demo/demo-page1.vue')  // 必填<br/>
      &nbsp;&nbsp;}，<br/>
      &nbsp;&nbsp;{<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;path: 'demo_page2',<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;name: 'demo_page2',<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;meta: {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;icon: 'logo-dropbox',<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title: '示例页面2'<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;}, <br/>
        &nbsp;&nbsp;&nbsp;&nbsp;component: () => import('@/view/demo/demo-page2.vue')<br/>
      &nbsp;&nbsp;}
    ]
  </code>
        </div>
      </Card>
      <Card style="margin-bottom: 20px">
        <p slot="title">是否配置页签</p>
        <p>在[src]-[config]-[config.js]文件中配置</p>
        <HightLightCode>{
export default {
    /**
      * @description 是否显示页签
      */
      pageSign: true
  }
}
        </HightLightCode>
      </Card>
      <Card style="margin-bottom: 20px">
        <p slot="title">Icon使用方式</p>
        <p>1.rainbowUI的icon使用方式</p>
        <HightLightCode>//场景1.router文件里
meta: {
  icon: 'default rainbow Plans'
},
//场景2.html文件里
&lt;Icon&nbsp;:size="14"&nbsp;class="rainbow Trash"&frasl;&gt;
        </HightLightCode>
        <p>2.Iview框架的icon使用方式(详见菜单:组件－基础组件)</p>
        <HightLightCode>&lt;Icon&nbsp;type="md-add"&frasl;&gt;
        </HightLightCode>
      </Card>
    </div>
</template>
<script>
export default {
  name: 'quick-start-page',
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
.hightLightCode{
  width: 100%;
}
code{
  background-color: transparent;
  border: none
}
</style>
