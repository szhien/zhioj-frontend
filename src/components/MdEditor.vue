<template>
  <MdEditor
    :model-value="text"
    :toolbars="toolbars"
    :on-change="handleChange"
  />
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
import { MdEditor, ToolbarNames } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

//自定义工具栏中的工具
const toolbars: ToolbarNames[] = [
  "bold",
  "underline",
  "italic",
  "-",
  "strikeThrough",
  "title",
  "sub",
  "sup",
  "quote",
  "unorderedList",
  "orderedList",
  "task", // ^2.4.0
  "-",
  "codeRow",
  "code",
  "link",
  "image",
  "table",
  "mermaid",
  "katex",
  "-",
  "revoke",
  "next",
  "save",
  "=",
  "pageFullscreen",
  "fullscreen",
  "preview",
  "previewOnly",
  "htmlPreview",
  "catalog",
];

interface Props {
  text: string;
  handleChange: (v: string) => void;
}

//定义props(必须是这个名字)，用于接受父组件传递给子组件的值，可以设置默认值
const props = withDefaults(defineProps<Props>(), {
  text: () => "# Hello Editor",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>

<style scoped></style>
