import { defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue';
import { Form } from "ant-design-vue"
import "@/assets/styles/gmv/daygmv.scss"

import GmvController from '@/model/controller/gmv/GmvController';
export default defineComponent({
    name: "GMV",
    components: { Form },
    props: {
        userInfo: {
            type: String,
            default: "test"
        }
    },
    setup() {
        const instance = getCurrentInstance();
        const { ctx } = instance as any
        const cityCount = ref(null);
        const data = [
            {
                productName: '1',
                saleAmount: Math.round(Math.random() * 1000),
                balance: Math.round(Math.random() * 1000),
            },
            {
                productName: '2',
                saleAmount: Math.round(Math.random() * 1000),
                balance: Math.round(Math.random() * 1000),
            },
            {
                productName: '3',
                saleAmount: Math.round(Math.random() * 1000),
                balance: Math.round(Math.random() * 1000),
            },
        ];

        let myChart: any = ref(null);
        const resizeHandler = GmvController.getInstance(instance?.appContext.app).debounce(() => {
            if (myChart) {
                myChart.resize();
            }
        }, 200);
        onMounted(() => {
            GmvController.getInstance(instance?.appContext.app).initDayEcharts(ctx.$refs.cityCount).then((res) => {
                myChart = res
                window.addEventListener("resize", resizeHandler);
            })

        })
        onBeforeUnmount(() => {
            window.removeEventListener("resize", resizeHandler);
        });
        return () => {
            return (
                <div style="padding:10px 10px">
                    <a-table data-source={data} columns={[{ title: '商品名称', dataIndex: 'productName', key: "productName" }, { title: '销量', dataIndex: 'saleAmount', key: 'saleAmount' }, { title: '金额', dataIndex: 'balance', key: 'balance' }]}></a-table>
                    <div class="chart-wrapper" ref="cityCount"></div>
                </div>
            )
        }
    }
})