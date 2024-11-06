<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 400px; width: 100%"
  />
  {{ props.value }}
  <!--  <a-button @click="fillValue">填充值</a-button>-->
</template>

<script setup lang="ts">
//引入Monaco编辑器，他需要挂载在一个节点上，需手动定义节点
import * as monaco from "monaco-editor";
import { defineProps, onMounted, ref, toRaw, withDefaults } from "vue";

//通过ref获取元素节点，codeEditorRef表示的就是id为code-editor的DOM节点，这个DOM也是我们要挂载Monaco编辑器的节点
const codeEditorRef = ref();
const codeEditorInstance = ref();

// const value = ref("hello world");

interface Props {
  value: string;
  handleChange: (v: string) => void;
}

//定义props(必须是这个名字)，用于接受父组件传递给子组件的值,设置默认值
const props = withDefaults(defineProps<Props>(), {
  value: () => "System.out.println('Hello Monaco!');",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const fillValue = () => {
  if (!codeEditorInstance.value) {
    return;
  }
  // 改变值
  toRaw(codeEditorInstance.value).setValue("新的值");
};

onMounted(() => {
  //确保该节点已经被加载了
  if (!codeEditorRef.value) {
    return;
  }
  // 创建编辑器实例（编辑器是挂载在codeEditorRef.value节点上面的）
  codeEditorInstance.value = monaco.editor.create(codeEditorRef.value, {
    // value: value.value, //显示的文本
    value: props.value, //显示的文本
    language: "java", //语言
    automaticLayout: true, //自动布局
    folding: true, //是否折叠代码
    colorDecorators: true, //是否显示内联颜色
    minimap: {
      enabled: true, // 启用或禁用 minimap
      renderCharacters: true, // 是否渲染字符，默认为 true
      scale: 5, // 调整 minimap 的缩放比例，默认值为 1
      maxColumn: 120, // 设置 minimap 显示的最大列数，默认值为 120
    },
    readOnly: false, // 是否只读
    scrollbar: {
      vertical: "auto", //垂直滚动条
      horizontal: "auto", //水平滚动条
    },
    theme: "vs-dark", //主题
    // cursorStyle: "line", //光标样式
    // cursorBlinking: "blink", //光标闪烁样式
    lineNumbers: "on",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
  });

  // 编辑 监听编辑器实例中value（代码）内容变化
  codeEditorInstance.value.onDidChangeModelContent(() => {
    console.log("目前内容为：", toRaw(codeEditorInstance.value).getValue());
  });
});
</script>

<style scoped></style>
