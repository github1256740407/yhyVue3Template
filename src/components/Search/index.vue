<template>
  <el-form ref="formRef" :size="size" :inline="inline" :model="formData">
    <el-form-item
      v-for="(item, index) in formConfig"
      :key="index"
      :label="item.label"
    >
      <!-- 输入框组件 input -->
      <template v-if="item.type === 'input'">
        <el-input
          v-model="formData[item.key]"
          :placeholder="item.placeholder"
          :clearable="item.clearable"
          :disabled="item.disabled"
          @change="
            (newValue:any) => {
              change(item, newValue, editFormData);
            }
          "
        />
      </template>
      <!-- 下拉选择组件 select -->
      <template v-if="item.type === 'select'">
        <el-select
          v-model="formData[item.key]"
          :placeholder="item.placeholder"
          :clearable="item.clearable"
          :disabled="item.disabled"
          @change="
            (newValue:any) => {
              change(item, newValue, editFormData);
            }
          "
        >
          <el-option
            v-for="(items, indexs) in item.options"
            :label="items.label"
            :value="items.value"
            :key="indexs"
          />
        </el-select>
      </template>
      <!-- 日期选择组件(单体) date -->
      <template v-if="item.type === 'date'">
        <el-date-picker
          v-model="formData[item.key]"
          :type="item.dateType ? item.dateType : 'date'"
          :value-format="item.valueFormat || ''"
          :placeholder="item.placeholder"
          :clearable="item.clearable"
          :disabled="item.disabled"
          :disabled-date="item.disabledDate"
          @change="
            (newValue:any) => {
              change(item, newValue, editFormData);
            }
          "
        />
      </template>
      <!-- 日期选择组件(范围) daterange -->
      <template v-if="item.type === 'daterange'">
        <el-date-picker
          v-model="formData[item.key]"
          :type="item.dateType || 'daterange'"
          :value-format="item.valueFormat || ''"
          :clearable="item.clearable"
          :disabled="item.disabled"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="
            (newValue:any) => {
              change(item, newValue, editFormData);
            }
          "
        />
      </template>
    </el-form-item>
    <!-- 按钮区域 -->
    <el-form-item>
      <el-button type="primary" @click="handleSearchBtn">查询</el-button>
      <el-button @click="handleResetBtn()">重置</el-button>
      <slot name="button"></slot>
    </el-form-item>
    <!-- 后方按钮 -->
    <el-form-item class="lastButton">
      <!-- 按钮插槽 -->
      <slot name="lastButton"></slot>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { searchConfigItemType, searchConfigType } from "./interface.ts";
const props = defineProps({
  size: {
    type: String,
    default: () => "default",
  },
  inline: {
    type: Boolean,
    default: () => true,
  },
  searchData: {
    type: Object as PropType<any>,
    require: true,
  },
  searchConfig: {
    type: Object as PropType<searchConfigType>,
    require: true,
  },
});
const emit = defineEmits(["handleSearchBtn", "handleResetBtn"]);
const formRef = ref();

// 另设表单数据源,避免直接使用传入数据源导致非主动的子影响父
const formData = reactive<{ [key: string]: any }>({});
const formConfig = computed(() => {
  return Object.keys(props.searchConfig as searchConfigType).map((key) => {
    return {
      key,
      ...props.searchConfig[key],
    };
  });
});

// 根据类型分配值
const initValueForType = (type: string) => {
  let nullType = ["input", "select", "date"];
  let aryType = ["daterange"];
  if (nullType.includes(type)) {
    return null;
  } else if (aryType.includes(type)) {
    return [];
  }
};

// 初始化formData
watch(
  computed(() => {
    return JSON.parse(JSON.stringify(props.searchConfig));
  }),
  (newValue, oldValue) => {
    Object.keys(newValue).forEach((key) => {
      // 初始化生成组件内部使用数据源
      /*
        初始化赋值很简单,一个一个往里面套就行,但是要考虑以下情况
        1.如果options异步获取后,触发watch,从而触发初始化,发生数据覆盖的问题
          解决方案:使用undefined去判断,当对应字段现在有值时,就不去赋值了

        2.如果defaultValue和value也是异步的怎么办?虽然它们都会触发watch,但是在前面用undefined拦截掉了
          解决方案:如果值为非undefined的情况,判断defaultValue和value新旧值是否变化,如果判断出来有变化的就覆盖

        3.watch新旧值一致怎么办
          解决方案:在变异(非替换)对象或数组时,旧值将与新值相同,因为它们的引用指向同一个对象/数组。Vue 不会保留变异之前值的副本

        3.如果父组件初始化时,进行异步处理默认值后要立即查询怎么办,虽然成功监听到并进行修改,但watch本身是异步的,执行慢于立即查询
          解决方案:用flush定义为同步
      */
      if (formData[key] === undefined) {
        if (newValue[key].value !== undefined) {
          formData[key] = newValue[key].value;
        } else if (newValue[key].defaultValue !== undefined) {
          formData[key] = newValue[key].defaultValue;
        } else {
          formData[key] = initValueForType(newValue[key].type);
        }
        props.searchData[key] = formData[key];
      } else {
        if (newValue[key].value != oldValue[key].value) {
          formData[key] = newValue[key].value;
          props.searchData[key] = formData[key];
        } else if (newValue[key].defaultValue != oldValue[key].defaultValue) {
          formData[key] = newValue[key].defaultValue;
          props.searchData[key] = formData[key];
        }
      }
    });
  },
  {
    deep: true,
    immediate: true,
    flush: 'sync'
  }
);

// 按钮:查询
const handleSearchBtn = () => {
  Object.assign(props.searchData as Object, formData);
  emit("handleSearchBtn", formData);
};
// 按钮:重置(将数据重置为defaultValue或者清空)
const handleResetBtn = () => {
  formConfig.value.forEach((item) => {
    let resetValue = null;
    // 1.重置值
    if (item.defaultValue) {
      resetValue = item.defaultValue;
    } else {
      resetValue = initValueForType(item.type);
    }
    formData[item.key] = resetValue;
    // 2.调用配置中有的change函数
    typeof item.change === "function" && item.change(resetValue, editFormData);
  });
  emit("handleResetBtn", formData);
};

// 重写change函数
const change = (
  item: searchConfigItemType,
  newValue: any,
  editFormData: Function
) => {
  typeof item.change === "function" && item.change(newValue, editFormData);
};
// 提供给change修改组件内部值的函数
const editFormData = (key: string, value: any) => {
  formData[key] = value;
};

</script>

<style lang="scss" scoped>
.lastButton {
  float: right;
}
</style>
