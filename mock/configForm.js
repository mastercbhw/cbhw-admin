
export default {
  // 支持值为 Object 和 Array
  'GET /api/getFormJson/simple': {
    code: 200,
    data: [
      {
        label: '患者姓名', // string 前端展示需要的字段
        key: 'name', // string  后台字段。保存的时候需要
        value: '周星驰', // string | number | Array<>    具体的值，后台要根据component去需要区分，input、select、checkbox、radio是不一样的
        // component和value必须协调。 例： table对应的value必须是数组
        required: false,
        options: {},
      },
    ],
    message: '查询成功',
  },
}
