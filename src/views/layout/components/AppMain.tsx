import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import "../styles/app-main"
export default defineComponent({
    name: "AppMain",
    setup() {
        const store = useStore();
        const route = useRoute();
        const cachedViews = computed(() => {
            return store.state.tagsView.cachedViews;
        });
        const key = computed(() => {
            return route.path;
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