import { defineComponent, computed, getCurrentInstance } from "vue";
import { mapGetters } from "vuex";
import "./styles/index.scss"

export default defineComponent({
    name: "Hamburger",
    props: {
        isActive: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const instanse = getCurrentInstance();
        function toggleClick() {
            instanse && instanse.emit("toggleClick");
        }
        mapGetters(["device"]);
        return () => {
            return (
                <div style="padding: 0 15px;" onClick={toggleClick}>
                    <svg
                        class={`hamburger ${instanse?.props.isActive ? 'is-active' : ''}`}
                        // class={[style.hamburger, instanse?.props.isActive ? style.hamburger['is-active'] : null]}
                        viewBox="0 0 1024 1024"
                        width="64"
                        height="64"
                    >
                        <path
                            d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
                        ></path>
                    </svg>
                </div >
            )
        }
    }
})