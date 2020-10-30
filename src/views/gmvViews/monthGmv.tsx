import { defineComponent, getCurrentInstance } from 'vue';
import { Form } from "ant-design-vue"
// import "@/assets/styles/gmv/gmv.scss"
export default defineComponent({
    name: "monthGMV",
    components: { Form },
    props: {
        userInfo: {
            type: String,
            default: "test"
        }
    },
    setup() {
        const { ctx } = getCurrentInstance() as any;
        return () => {
            return (
                <div>
                    <a-table columns={[{ title: '今日GMV', key: "gmv" }, { title: 'GMV日环比', key: 'gmvc' }]}></a-table>
                </div>
            )
        }
    }
})