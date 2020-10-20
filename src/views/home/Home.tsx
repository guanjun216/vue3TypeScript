import { defineComponent, computed } from "vue";
import { mapGetters } from "vuex";
export default defineComponent({
    name: "Home",
    setup() {
        // mapGetters({});
        return () => {
            return (
                <div class="dashboard-container">
                    <h1 style="text-align: center;">今天买买全球EOC</h1>
                </div>
            )
        }
    }
})