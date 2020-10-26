import { defineComponent, ref } from 'vue';
import "@/assets/styles/errorpage/error.scss"
import _404img from "@/assets/404_images/404.png"
import _404ImgCloud from "@/assets/404_images/404_cloud.png"
export default defineComponent({
    name: "Page404",
    setup() {
        const message = ref("");
        return () => {
            return (
                <div class="wscn-http404-container">
                    <div class="wscn-http404">
                        <div class="pic-404">
                            <img class="pic-404__parent" src={_404img} alt="404" />
                            <img class="pic-404__child left" src={_404ImgCloud} alt="404" />
                            <img class="pic-404__child mid" src={_404ImgCloud} alt="404" />
                            <img class="pic-404__child right" src={_404ImgCloud} alt="404" />
                        </div>
                        <div class="bullshit">
                            <div class="bullshit__oops">哎呀！</div>
                            <div class="bullshit__headline">{{ message }}</div>
                            <div class="bullshit__info">请检查您输入的URL是否正确，或单击下面的按钮返回首页。</div>
                            <a href="/#/" class="bullshit__return-home">返回首页</a>
                        </div>
                    </div>
                </div>
            )
        }
    }
})