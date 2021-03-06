import { App } from "vue";
import echarts from "echarts";
export default class GmvController {
  private _app: App | undefined;
  private static _instance: GmvController;
  constructor(app: App | undefined) {
    if (app !== undefined) {
      this._app = app;
    }
  }
  public static getInstance(app: App | undefined): GmvController {
    if (!this._instance) {
      this._instance = new GmvController(app);
    }

    return this._instance;
  }
  public async initDayEcharts(el: HTMLDivElement): Promise<any> {
    let xData: any = [],
      yData: any = [];
    await this.getChartData().then((res: any) => {
      xData = res.xData;
      yData = res.yData;
    });
    const myChart: any = echarts.init(el);
    myChart.setOption(
      {
        grid: {
          left: "13%",
          right: "8%",
          bottom: "25%",
          top: "10%",
        },
        title: {
          show: xData.length === 0,
          top: "center",
          left: "center",
          text: "暂无数据",
          textStyle: {
            color: "rgb(179, 239, 255)",
            fontSize: 12,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: (params: any[]) => {
            return params[0].name + "<br>销售额度：" + params[0].value + "万";
          },
        },
        toolbox: {
          feature: {
            dataView: {
              show: false,
            },
            magicType: {
              show: true,
              type: ["line", "bar"],
            },
            restore: {
              show: false,
            },
            saveAsImage: {
              show: true,
              name: "年销售额排名",
              pixelRatio: 2,
            },
          },
          iconStyle: {
            normal: {
              borderColor: "#1990DA",
            },
          },
          top: 0,
          right: 5,
        },
        dataZoom: [
          {
            type: "inside",
            startValue: 0,
            endValue: 10,
          },
        ],
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#397cbc",
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          //轴线上的字
          axisLabel: {
            show: true,
            textStyle: {
              color: "#cecece",
              fontSize: 12,
            },
            rotate: 15,
          },
          data: xData,
        },
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            //轴线上的字
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: "#cecece",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#397cbc",
              },
            },
            //网格线
            splitLine: {
              lineStyle: {
                color: "#11366e",
              },
            },
          },
        ],
        series: [
          {
            name: "销售额度",
            type: "bar",
            data: yData,
            barWidth: "45%",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "#01BDF4",
                  },
                  {
                    offset: 1,
                    color: "#083AF6 ",
                  },
                ],
                false
              ),
            },
          },
        ],
      },
      true
    );

    myChart.getZr().off("click");
    myChart.getZr().on("click", (params: any) => {
      const pointInPixel = [params.offsetX, params.offsetY];
      if (myChart.containPixel("grid", pointInPixel) || xData.length === 0) {
        // routerChange("/more");
      }
    });
    return myChart;
  }
  public async getChartData(): Promise<any> {
    let resultJson = [
      {
        citycode: [],
        adcode: "230000",
        name: "黑龙江省",
        center: "126.642464,45.756967",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "440000",
        name: "广东省",
        center: "113.280637,23.125178",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "410000",
        name: "河南省",
        center: "113.665412,34.757975",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "150000",
        name: "内蒙古自治区",
        center: "111.670801,40.818311",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "650000",
        name: "新疆维吾尔自治区",
        center: "87.617733,43.792818",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "210000",
        name: "辽宁省",
        center: "123.429096,41.796767",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "420000",
        name: "湖北省",
        center: "114.298572,30.584355",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "610000",
        name: "陕西省",
        center: "108.948024,34.263161",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "520000",
        name: "贵州省",
        center: "106.713478,26.578343",
        level: "province",
        districts: [],
      },
      {
        citycode: "021",
        adcode: "310000",
        name: "上海市",
        center: "121.472644,31.231706",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "370000",
        name: "山东省",
        center: "117.000923,36.675807",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "340000",
        name: "安徽省",
        center: "117.283042,31.86119",
        level: "province",
        districts: [],
      },
      {
        citycode: "023",
        adcode: "500000",
        name: "重庆市",
        center: "106.504962,29.533155",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "540000",
        name: "西藏自治区",
        center: "91.132212,29.660361",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "430000",
        name: "湖南省",
        center: "112.982279,28.19409",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "460000",
        name: "海南省",
        center: "110.33119,20.031971",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "630000",
        name: "青海省",
        center: "101.778916,36.623178",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "350000",
        name: "福建省",
        center: "119.306239,26.075302",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "640000",
        name: "宁夏回族自治区",
        center: "106.278179,38.46637",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "450000",
        name: "广西壮族自治区",
        center: "108.320004,22.82402",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "320000",
        name: "江苏省",
        center: "118.767413,32.041544",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "330000",
        name: "浙江省",
        center: "120.153576,30.287459",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "360000",
        name: "江西省",
        center: "115.892151,28.676493",
        level: "province",
        districts: [],
      },
      {
        citycode: "1886",
        adcode: "710000",
        name: "台湾省",
        center: "121.509062,25.044332",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "130000",
        name: "河北省",
        center: "114.502461,38.045474",
        level: "province",
        districts: [],
      },
      {
        citycode: "1852",
        adcode: "810000",
        name: "香港特别行政区",
        center: "114.173355,22.320048",
        level: "province",
        districts: [],
      },
      {
        citycode: "1853",
        adcode: "820000",
        name: "澳门特别行政区",
        center: "113.54909,22.198951",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "620000",
        name: "甘肃省",
        center: "103.823557,36.058039",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "510000",
        name: "四川省",
        center: "104.065735,30.659462",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "220000",
        name: "吉林省",
        center: "125.3245,43.886841",
        level: "province",
        districts: [],
      },
      {
        citycode: "022",
        adcode: "120000",
        name: "天津市",
        center: "117.190182,39.125596",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "140000",
        name: "山西省",
        center: "112.549248,37.857014",
        level: "province",
        districts: [],
      },
      {
        citycode: [],
        adcode: "530000",
        name: "云南省",
        center: "102.712251,25.040609",
        level: "province",
        districts: [],
      },
      {
        citycode: "010",
        adcode: "110000",
        name: "北京市",
        center: "116.405285,39.904989",
        level: "province",
        districts: [],
      },
    ];
    let xData: any[] = [],
      yData: any[] = [];
    const mapData = resultJson.map((item) => {
      return {
        name: item.name,
        value: (Math.random() * 3000).toFixed(2),
        adcode: item.adcode,
      };
    });

    mapData.forEach((item) => {
      xData.push(item.name);
      yData.push(item.value);
    });
    return { xData, yData };
  }
  public debounce(func: any, delay: number | undefined, immediate = false) {
    let timer: number | undefined,
      context = this;
    return (...args: any) => {
      if (immediate) {
        func.apply(context, args);
        immediate = false;
        return;
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }
}
