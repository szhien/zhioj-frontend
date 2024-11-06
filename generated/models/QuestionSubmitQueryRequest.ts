/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeInfo } from './JudgeInfo';
export type QuestionSubmitQueryRequest = {
    code?: string;
    createTime?: string;
    current?: number;
    id?: number;
    judgeInfo?: JudgeInfo;
    language?: string;
    pageSize?: number;
    questionId?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    updateTime?: string;
    userId?: number;
};

