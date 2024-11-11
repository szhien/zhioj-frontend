<template>
  <MdPreview :model-value="value" />
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
import "md-editor-v3/lib/style.css";
import { MdPreview } from "md-editor-v3";

interface Props {
  value: string;
}

//定义props(必须是这个名字)，用于接受父组件传递给子组件的值，可以设置默认值
const props = withDefaults(defineProps<Props>(), {
  value: () => "# Hello Editor",
});
</script>

<style scoped></style>
