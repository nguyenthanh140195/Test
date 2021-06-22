
<template>
  <custom-table
    :totalData="totalData"
    :data="tableData"
    :columns="tableColumns"
    :tableProps="tableProps"
    @row-click="rowClick"
    @size-change="sizeChanged"
    @page-change="pageChanged"
    @sort-change="sortChanged"
    @filter-change="filterChanged"
    @search-change="searchChanged"
    @table-change="tableChanged"
    @is-finished="isFinished"
  />
</template>

<script>
import CustomTable from "../components/CustomTable.vue";
export default {
  components: { CustomTable },
  setup() {
    const rowClick = (row) => {
      // console.log("rowClick", row);
    };
    const sizeChanged = (size) => {
      // console.log("size-change", size);
    };
    const pageChanged = (page) => {
      // console.log("page-change", page);
    };
    const sortChanged = (sort) => {
      // console.log("sort-change", sort);
    };
    const filterChanged = (fil, filter) => {
      // console.log("filterChanged", fil, filter);
    };
    const searchChanged = (sea, search) => {
      // console.log("searchChanged", sea, search);
    };
    const tableChanged = (tableState) => {
      console.log("tableChanged", tableState);
    };
    const isFinished = (tableRef) => {
      console.log("isFinished", tableRef);
    };
    return {
      rowClick,
      sortChanged,
      sizeChanged,
      pageChanged,
      filterChanged,
      searchChanged,
      tableChanged,
      isFinished,
    };
  },
  data() {
    return {
      totalData: 30,
      tableColumns: [
        {
          width: "150",
          prop: "date",
          label: "Date",
          sortable: true,
          searchable: true,
          filters: [
            { text: "2016-05-01", value: "2016-05-01" },
            { text: "2016-05-02", value: "2016-05-02" },
            { text: "2016-05-03", value: "2016-05-03" },
            { text: "2016-05-04", value: "2016-05-04" },
          ],
        },
        {
          prop: "name",
          label: "Name",
          sortable: true,
        },
        {
          prop: "address",
          label: "Address",
          sortable: true,
          searchable: true,
        },
        {
          width: "100",
          prop: "tag",
          label: "Tag",
          filters: [
            { text: "Home", value: "Home" },
            { text: "Office", value: "Office" },
          ],
        },
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom1",
          address: "No. 189, Grove St, Los Angeles",
          tag: "Home",
        },
        {
          date: "2016-05-02",
          name: "Tom3",
          address: "No. 189, Grove St, Los Angeles",
          tag: "Office",
        },
        {
          date: "2016-05-04",
          name: "Tom2",
          address: "No. 189, Grove St, Los Angeles",
          tag: "Home",
        },
        {
          date: "2016-05-01",
          name: "Tom4",
          address: "No. 189, Grove St, Los Angeles",
          tag: "Office",
        },
      ],
      tableProps: {
        stripe: true,
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.totalData = 120;
    }, 5000);
  },
};
</script>

<style>
</style>
