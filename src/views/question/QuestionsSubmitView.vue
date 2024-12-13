<template>
  <div id="questionsView">
    <h2>题目提交信息</h2>
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="questionId" label="题目ID" style="min-width: 240px">
        <a-input v-model="searchParams.questionId" placeholder="请输入题目ID" />
      </a-form-item>
      <a-form-item field="language" label="编程语言" style="min-width: 240px">
        <a-select
          v-model="searchParams.language"
          :style="{ width: '320px' }"
          default-value="java"
          placeholder="选择编程语言"
        >
          <a-option value="java">Java</a-option>
          <a-option value="cpp">C++</a-option>
          <a-option value="go">Go</a-option>
          <a-option value="html">Html</a-option>
        </a-select>
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
      <template #judgeInfoOptional="{ record }">
        <a-space>
          <span>{{ JSON.stringify(record.judgeInfo) }}</span>
        </a-space>
      </template>
      <template #statusOptional="{ record }">
        <a-space>
          <!-- 如果Status=0，则为待判题，Status=1，为判题中，Status=2，为判题成功，Status=3，为判题失败-->
          <a-tag
            size="large"
            :color="
              record.status == 0
                ? 'blue'
                : record.status == 1
                ? 'orange'
                : record.status == 2
                ? 'green'
                : 'red'
            "
            ><span>{{
              record.status == 0
                ? QUESTION_SUBMIT_STATUS_ENUM.WAITING
                : record.status == 1
                ? QUESTION_SUBMIT_STATUS_ENUM.JUDGING
                : record.status == 2
                ? QUESTION_SUBMIT_STATUS_ENUM.ACCEPTED
                : QUESTION_SUBMIT_STATUS_ENUM.WRONG_ANSWER
            }}</span></a-tag
          >
        </a-space>
      </template>
      <template #createTimeOptional="{ record }">
        <a-space>
          <span>{{ moment(record.createTime).format("YYYY-MM-DD") }}</span>
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
  QuestionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";
import { QUESTION_SUBMIT_STATUS_ENUM } from "../../access/questionSubmitStatusEnum";

const router = useRouter();
const show = ref(true);
const total = ref(0);
const dataList = ref([]);
const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: undefined,
  language: undefined,
  current: 1,
  pageSize: 10,
});

const loadData = async () => {
  const res =
    await QuestionControllerService.listQuestionSubmitVoByPageUsingPost({
      ...searchParams.value,
      sortField: "createTime",
      sortOrder: "desc",
    });
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error(res.message);
  }
};

const columns = [
  {
    title: "题目提交ID",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    slotName: "judgeInfoOptional",
  },
  {
    title: "判题状态",
    slotName: "statusOptional",
  },
  {
    title: "题目ID",
    dataIndex: "questionId",
  },
  {
    title: "创建用户ID",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTimeOptional",
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
