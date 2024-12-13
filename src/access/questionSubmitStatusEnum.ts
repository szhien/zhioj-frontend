/**
 * 题目提交状态枚举
 */
export enum QUESTION_SUBMIT_STATUS_ENUM {
  /**
   * 待判题
   */
  WAITING = "待判题",
  /**
   * 判题中
   */
  JUDGING = "判题中",
  /**
   * 已通过
   */
  ACCEPTED = "已通过",

  /**
   * 未通过
   */
  WRONG_ANSWER = "未通过",
}
