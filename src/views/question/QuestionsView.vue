<template>
  <div id="questionsView">
    <h2>题目管理</h2>
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="题目" style="min-width: 240px">
        <a-input v-model="searchParams.title" placeholder="请输入题目的名称" />
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 240px">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSearch">点击搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        current: searchParams.current,
        pageSize: searchParams.pageSize,
        total: total,
      }"
      @page-change="onPageChange"
    >
      <template #tagsOptional="{ record }">
        <a-space wrap>
          <a-tag v-for="tag in record.tags" :key="tag" color="green"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #acceptedRateOptional="{ record }">
        <a-space>
          <span>
            {{
              `${
                record.submitNum != 0
                  ? record.acceptedNum / record.submitNum
                  : "0"
              }% (${record.acceptedNum} / ${record.submitNum})`
            }}
          </span>
        </a-space>
      </template>
      <template #createTimeOptional="{ record }">
        <a-space>
          <span>{{ moment(record.createTime).format("YYYY-MM-DD") }}</span>
        </a-space>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="outline" @click="toViewQuestionPage(record)"
            >戳一戳
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const router = useRouter();
const show = ref(true);
const total = ref(0);
const dataList = ref([]);
const searchParams = ref<QuestionQueryRequest>({
  title: "",
  tags: [],
  current: 1,
  pageSize: 10,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error(res.message);
  }
};
const columns = [
  {
    title: "题目ID",
    dataIndex: "id",
  },
  {
    title: "题目",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tagsOptional",
  },
  {
    title: "通过率",
    slotName: "acceptedRateOptional",
  },
  {
    title: "创建者",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTimeOptional",
  },
  {
    slotName: "optional",
  },
];

/**
 * 点击搜索
 */
const doSearch = () => {
  // 重置为第一页
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
  // loadData();
};

/**
 * 跳转到做题页面
 * @param question
 */
const toViewQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
  console.log(question);
};
/**
 * 删除题目
 * @param question
 */
const doDelete = async (question: Question) => {
  console.log(question);
  // const deleteParams: DeleteRequest = { id: question.id };
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    //更新数据
    await loadData();
  } else {
    message.error(res.message);
  }
};

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

/**
 * 监听分页参数变化
 * watchEffect钩子函数的作用是: 当所执行的函数中的响应式数据发生变化是，就会触发对应函数的执行
 */
watchEffect(() => {
  loadData(); //当searchParams中的current或pageSize发生变化时，会自动执行loadData函数
});
</script>

<style scoped>
#questionsView {
  padding: 0 50px;
}
</style>
