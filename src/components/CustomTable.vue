<template>
  <div class="custom-table">
    <el-table
      :data="data"
      :row-key="rowKey"
      :default-sort="defaultSort"
      v-bind="tableProps"
      @filter-change="filterChanged"
      @sort-change="sortChanged"
      @row-click="rowClick"
      ref="tableRef"
      class="custom-table__table"
      :row-class-name="(f) => 'table__row'"
      :cell-class-name="(f) => 'table__row__cell'"
      :header-row-class-name="(f) => 'table__header'"
      :header-cell-class-name="(f) => 'table__header__cell'"
    >
      <template v-for="col in columns" :key="col.prop">
        <el-table-column
          v-if="!col.searchable"
          :column-key="col.prop"
          v-bind="col"
        />
        <el-table-column
          v-else
          :label="col.label"
          :column-key="col.prop"
          :filters="col.filters"
          :sortable="col.sortable"
        >
          <el-table-column :prop="col.prop" :width="col.width">
            <template #header="{ column }">
              <input
                type="text"
                class="header-search-text"
                :value="state.searched[column.columnKey]"
                @change="searchChanged(column, $event)"
              />
            </template>
          </el-table-column>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      :total="totalData"
      :hide-on-single-page="hidePagination"
      v-bind="paginationProps"
      v-model:currentSize="state.size"
      v-model:currentPage="state.page"
      @size-change="sizeChanged"
      @current-change="pageChanged"
      class="custom-table__pagination"
    />
  </div>
</template>

<script>
import { watch } from "@vue/runtime-core";
import { reactive, ref } from "@vue/reactivity";
import { ElTable, ElTableColumn, ElPagination } from "element-plus";
export default {
  name: "CustomTable",
  components: { ElTable, ElTableColumn, ElPagination },
  emits: [
    "row-click",
    "table-change",
    "sort-change",
    "size-change",
    "page-change",
    "filter-change",
    "search-change",
  ],
  setup(props, context) {
    const { emit } = context;
    const tableRef = ref(null);
    const state = reactive({
      page: 1,
      size: 10,
      sorted: {},
      filtered: {},
      searched: {},
    });

    const resetTable = () => {
      if (!tableRef || !tableRef.value) return;
      state.searched = {};
      tableRef.value.clearSort();
      tableRef.value.clearFilter();
    };
    const rowClick = (row, column, event) => {
      emit("row-click", { ...row });
      resetTable();
    };
    const pageChanged = (page) => {
      emit("page-change", page);
    };
    const sizeChanged = (size) => {
      emit("size-change", size);
    };
    const sortChanged = (sort) => {
      const { column, order } = sort;
      const newSort = !column ? {} : { key: column.columnKey, order };
      state.sorted = newSort;
      emit("sort-change", { ...state.sorted });
    };
    const filterChanged = (filter) => {
      const [key] = Object.keys(filter);
      const value = filter[key];
      if (typeof value !== "object") return;
      if (!value.length) {
        delete state.filtered[key];
      } else {
        state.filtered[key] = value;
      }
      emit("filter-change", { key, value }, { ...state.filtered });
    };
    const searchChanged = (column, event) => {
      const { property: key } = column;
      const { value } = event.target;
      state.searched[key] = value;
      emit("search-change", { key, value }, { ...state.searched });
    };

    watch(
      () => [
        state.page,
        state.size,
        state.sorted,
        state.filtered,
        state.searched,
      ],
      () => {
        emit("table-change", { ...state });
      }
    );

    watch(
      () => props.forceUpdate,
      () => {
        resetTable();
      }
    );

    return {
      tableRef,
      state,
      rowClick,
      pageChanged,
      sizeChanged,
      sortChanged,
      filterChanged,
      searchChanged,
    };
  },
  props: {
    defaultSort: Object,
    hidePagination: Boolean,
    rowKey: [Function, String],
    columns: {
      type: Array,
      default: [],
    },
    data: {
      type: Array,
      default: [],
    },
    totalData: {
      type: Number,
      default: 0,
    },
    tableProps: {
      type: Object,
      default: {},
    },
    paginationProps: {
      type: Object,
      default: {
        pagerCount: 5,
        pageSizes: [10, 20, 50],
        layout: "total, sizes, jumper, ->, prev, pager, next",
      },
    },
    forceUpdate: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.custom-table {
  &__table {
    .table__header {
      &__cell {
        .cell {
          display: flex;
          align-items: center;
          align-content: center;
          justify-content: space-between;
        }
      }
      .header-search-text {
        width: 100%;
      }
    }
    .table__row {
      &__cell {
        .cell {
        }
      }
    }
  }
  &__pagination {
  }
}
</style>