<template>
    <div class="model" v-show="showModal">
        <div class="menu_item" @mousedown="mousedown" @mouseup="mouseup(item)" v-for="(item, index) in menuList"
            :key="index">
            <div>
                {{ item?.name }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const showModal = ref(false)

const props = defineProps({
    menuList: {
        type: Array,
        default: () => [{
            name: '',
            func: () => { },
        }]
    },
    params: {
        default: () => { return {} }
    }
})

const show = () => {
    showModal.value = true
}

// 0未按 1按下 2松开
let mouseStatus = 0
const mousedown = () => {
    mouseStatus = 1
}
const mouseup = (item) => {
    mouseStatus = 2
    item.func(props.params)
    mouseStatus = 0
    showModal.value = false
}
const hide = () => {
    if (mouseStatus === 0) {
        showModal.value = false
    }
}
defineExpose({
    show,
    hide
})
</script>

<style scoped>
.model {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 50px;
    background-color: #fcfcfc;
    z-index: 999999999 !important;
    border: 1px solid #d3d3d3;
    border-bottom: none;
    box-shadow: 8px 8px 6px 1px #acacac;
    padding: 3px;
}

.menu_item {
    display: flex;
    min-width: 150px;
    padding: 6px 18px;
    border-bottom: 1px solid #eee;
    text-align: left;
    text-wrap: nowrap;
    cursor: pointer;
    user-select: none;
    font-size: 14px;
    color: #333;
}

.menu_item:hover {
    background-color: #eeeeee;
}

.menu_item:nth-last-child(1) {
    border: none;
}
</style>