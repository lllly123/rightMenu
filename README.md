# rightMenu
通过vue3指令实现元素的右键菜单绑定
## 使用
- 还插件是使用vue3指令编写的全局右键菜单指令

## 安装

- 下载压缩包
- 解压到项目中
- 局部引入

``` html
<template>
<div v-contentMenu="{ menuList: menu, params: {id:1} }">
</div>
<template/>
<script setup>
// 这里使用setup语法糖 就不需要注册指令了  如果没使用语法糖 则需要单独注册指令，可参考vue官网
import vContentMenu from "@/directives/rightMenu"

const menu = [
    {
        name: '插入',  // 菜单名称
        func(params) { // 菜单点击回掉函数
           console.log('插入')
        }
    },
]
</script>
```

## 参数说明
- menuList: 菜单列表
    - name: 菜单名称
    - func: 菜单点击回掉函数 返回params 

- params: 点击之后需要返回的内容
