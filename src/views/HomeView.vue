<template>
  <div class="home">
    <code-editor :value="codeValue" :handle-change="handleCodeChange" />
    <md-editor :text="mdValue" :handle-change="handleMdChange" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const codeValue = ref();
const mdValue = ref();

const handleCodeChange = (v: string) => {
  codeValue.value = v;
};
const handleMdChange = (v: string) => {
  mdValue.value = v;
};
</script>
