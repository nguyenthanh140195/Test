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
      <slot>
        <template v-for="col in columns" :key="col.prop">
          <el-table-column
            v-if="!col.searchable"
            :column-key="col.prop"
            :filters="col.filters || []"
            :sortable="col.sortable"
            :sort-method="(f) => f"
            :label-class-name="`${col.filters ? 'filters' : 'no-filters'} ${
              col.sortable ? 'sortable' : 'no-sortable'
            }`"
            v-bind="col"
          />
          <el-table-column
            v-else
            :label="col.label"
            :column-key="col.prop"
            :filters="col.filters || []"
            :sortable="col.sortable"
            :label-class-name="`${col.filters ? 'filters' : 'no-filters'} ${
              col.sortable ? 'sortable' : 'no-sortable'
            }`"
            :sort-method="(f) => f"
          >
            <el-table-column :prop="col.prop" :width="col.width">
              <template #header="{ column }">
                <el-input
                  clearable
                  v-model.lazy="state.searched[column.property]"
                  @change="searchChanged(column.property, $event)"
                >
                  <template #append>
                    <el-button icon="el-icon-search"></el-button>
                  </template>
                </el-input>
              </template>
            </el-table-column>
          </el-table-column>
        </template>
      </slot>
    </el-table>
    <el-pagination
      :total="totalData"
      :hide-on-single-page="hidePagination"
      v-bind="paginationProps"
      v-model:pageSize="state.size"
      v-model:currentPage="state.page"
      @size-change="sizeChanged"
      @current-change="pageChanged"
      class="custom-table__pagination"
    />
  </div>
</template>

<script>
import { nextTick, watch } from "@vue/runtime-core";
import { reactive, ref } from "@vue/reactivity";
import {
  ElTable,
  ElTableColumn,
  ElInput,
  ElButton,
  ElPagination,
} from "element-plus";
export default {
  name: "CustomTable",
  components: { ElTable, ElTableColumn, ElInput, ElButton, ElPagination },
  emits: [
    "row-click",
    "is-finished",
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
      emit("sort-change", { ...newSort });
    };
    const filterChanged = (filter) => {
      const [key] = Object.keys(filter);
      const value = filter[key];
      if (typeof value !== "object") return;
      const newFilterd = { ...state.filtered };
      if (!value.length) {
        delete newFilterd[key];
      } else {
        newFilterd[key] = value;
      }
      state.filtered = newFilterd;
      emit("filter-change", { key, value }, { ...newFilterd });
    };
    const searchChanged = (key, value) => {
      const newSearched = { ...state.searched };
      if (!value) {
        delete newSearched[key];
      } else {
        newSearched[key] = value;
      }
      state.searched = newSearched;
      emit("search-change", { key, value }, { ...newSearched });
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
      () => props.data,
      () => {
        nextTick(function () {
          emit("is-finished", tableRef.value);
        });
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
      resetTable,
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
        border-bottom: 0;
        .cell {
          display: flex;
          align-items: center;
          .caret-wrapper {
            margin-left: auto;
          }
          .el-table__column-filter-trigger {
            display: none;
          }
        }
        .cell.no-sortable {
          .el-table__column-filter-trigger {
            margin-left: auto;
          }
        }
        .cell.filters {
          .el-table__column-filter-trigger {
            display: inline-block;
          }
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
<style lang="scss" scoped>
</style>
