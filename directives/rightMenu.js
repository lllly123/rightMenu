import { h, render } from "vue"
import menuModel from "./menuModel.vue"

function getBoxSize(el) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                boxWidth: el.offsetWidth,
                boxHeight: el.offsetHeight
            })
        })
    })
}

export default {
    mounted(el, binding) {

        // 将menuModel转为虚拟DOM
        const modal = h(menuModel, { menuList: binding.value.menuList, params: binding.value.params || {} })
        const app = document.getElementById('app')
        console.log(binding.value)
        const input = document.createElement('input')
        const box = document.createElement('div')
        // 给 根元素加一个肉眼看不见的input元素，通过控制这个input的focus 和 blur 实现 右键菜单的全局可关闭
        if (!app.contains(input)) app.appendChild(input)
        input.style.width = '0'
        input.style.position = 'absolute'
        input.style.top = "0"
        input.style.border = 'none'
        // 将弹窗挂载到box上
        render(modal, box)
        if (!app.contains(box)) app.appendChild(box)
        box.style.position = 'absolute'
        const modalRef = box.children[0]
        // 监听input获取焦点和失去焦点
        input.onfocus = function () {
            modalRef.__vueParentComponent.exposed.show()
        }
        input.onblur = function () {
            box.style.opacity = 0 // 防止闪烁
            modalRef.__vueParentComponent.exposed.hide()
        }
        el.oncontextmenu = async function (e) {
            e.preventDefault()
            input.focus()
            // 获取鼠标点击位置
            const { clientX, clientY } = e
            const { boxWidth, boxHeight } = await getBoxSize(modalRef)
            const { innerHeight, innerWidth } = window
            // 左上
            if (clientX < innerWidth / 2 && clientY < innerHeight / 2) {
                box.style.left = clientX + 'px'
                box.style.top = clientY + 'px'
            }
            // 左下
            if (clientX < innerWidth / 2 && clientY > innerHeight / 2) {

                box.style.left = clientX + 'px'
                box.style.top = (clientY - boxHeight) + 'px'
            }
            // 右上
            if (clientX > innerWidth / 2 && clientY < innerHeight / 2) {
                box.style.left = (clientX - boxWidth) + 'px'
                box.style.top = clientY + 'px'
            }

            // 右下
            if (clientX > window.innerWidth / 2 && clientY > window.innerHeight / 2) {
                box.style.left = (clientX - boxWidth) + 'px'
                box.style.top = (clientY - boxHeight) + 'px'
            }
            box.style.opacity = 1
        }
    }
}


