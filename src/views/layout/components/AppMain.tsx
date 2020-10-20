import { defineComponent, computed } from "vue";
export default defineComponent({
    name: "AppMain",
    setup() {
        const cachedViews = computed(() => {

        });
        const key = computed(() => {

        });
        return () => {
            return (
                <section class="app-main">
                    <transition name="fade-transform" mode="out-in">
                        <keep-alive include={cachedViews}>
                            <router-view key={key} />
                        </keep-alive>
                    </transition>
                </section>
            )
        }
    }
})