<template>
  <div class="page">
    <apexchart
      type="line"
      height="400px"
      :series="series"
      :options="chartOptions"
      @click="clickChart"
      @markerClick="markerClick"
      @dataPointSelection="dataPointSelection"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
const COLOR = {
  GRID: '#666',
  TARGET: "#0ff",
  ACTUAL: "#0f0",
};
export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [
        {
          name: "Actual",
          type: "column",
          data: [
            440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160, 440,
            440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160, 440,
            752, 320, 257, 160,
          ],
        },
        {
          name: "Target",
          type: "line",
          data: [
            579, 779, 779, 999, 479, 749, 749, 879, 899, 949, 879, 596, 779,
            479, 579, 479, 699, 279, 449, 249, 379, 839, 349, 279, 196, 479,
            759, 329, 259, 169,
          ],
        },
      ],
      chartOptions: {
        title: {
          text: "Jul 2021",
        },
        labels: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
        ],
        stroke: {
          width: [1, 2],
          curve: "smooth",
        },
        legend: {
          labels: {
            useSeriesColors: true,
          },
        },
        xaxis: {
          type: "category",
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          show: true,
          min: 0,
          title: {
            text: "Min",
          },
        },
        dataLabels: {
          enabled: false,
          enabledOnSeries: [0, 1],
        },
        markers: {
          size: 3,
          strokeWidth: 1,
          hover: {
            size: 5,
            sizeOffset: 2,
          },
          // onClick: function (e) {
          //   console.log("onClick", e);
          // },
          // onDblClick: function (e) {
          //   console.log("onDblClick", e);
          // },
        },
        tooltip: {
          enabled: true,
          x: {
            formatter: function (val) {
              return val + ", Jul 2021";
            },
          },
          y: {
            formatter: function (val) {
              return val + " min.";
            },
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            columnWidth: "70%",
            dataLabels: {
              position: "top",
            },
          },
        },
        grid: {
          show: true,
          strokeDashArray: 5,
          borderColor: COLOR.GRID,
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        theme: {
          mode: "dark",
          palette: "palette1",
        },
        noData: {
          text: "NO DATA",
          align: "center",
          verticalAlign: "middle",
          style: {
            fontSize: "26px",
          },
        },
        chart: {
          toolbar: {
            show: true,
            autoSelected: "selection",
            tools: {
              zoom: false,
              selection: false,
              pan: true,
              reset: true,
              zoomin: true,
              zoomout: true,
              download: true,
              customIcons: [],
            },
          },
        },
        colors: [COLOR.ACTUAL, COLOR.TARGET],
        // fill: {
        //   type: "gradient",
        //   gradient: {
        //     gradientToColors: ["#00F"],
        //     type: "vertical",
        //     stops: [0, 75],
        //   },
        // },
      },
    };
  },
  methods: {
    clickChart: function (event, chartContext, config) {
      // console.log("clickChart", config.dataPointIndex);
    },
    markerClick: function (event, chartContext, config) {
      // console.log("markerClick", config.dataPointIndex, config.seriesIndex);
    },
    dataPointSelection: function (event, chartContext, config) {
      console.log(
        "dataPointSelection",
        config.dataPointIndex,
        config.seriesIndex
      );
    },
  },
};
</script>

<style scoped>
/* .page {
  height: calc(100vh - 50px);
  background: #242424;
} */
</style>