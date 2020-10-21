import { defineComponent, onMounted, onBeforeUnmount, ref, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import "./styles"
export default defineComponent({
    name: "BackToTop",
    props: {
        visibilityHeight: {
            type: Number,
            default: 400
        },
        backPosition: {
            type: Number,
            default: 0
        },
        customStyle: {
            type: Object,
            default: function () {
                return {
                    right: "50px",
                    bottom: "50px",
                    width: "40px",
                    height: "40px",
                    "border-radius": "4px",
                    "line-height": "45px",
                    background: "#e7eaf1"
                };
            }
        },
        transitionName: {
            type: String,
            default: "fade"
        }
    },
    setup() {
        const instance = getCurrentInstance();
        let visible = ref(false);
        let interval = ref(0);
        let isMoving = ref(false);

        const handleScroll = () => {
            if (instance) {
                visible.value = window.pageYOffset > Number(instance.props.visibilityHeight);
            }
        };
        const backToTop = () => {
            if (isMoving.value) return;
            const start = window.pageYOffset;
            let i = 0;
            isMoving.value = true;
            interval.value = setInterval(() => {
                const next = Math.floor(easeInOutQuad(10 * i, start, -start, 500));

                if (instance && next <= Number(instance.props.backPosition)) {
                    window.scrollTo(0, Number(instance.props.backPosition));
                    clearInterval(interval.value);
                    isMoving.value = false;
                } else {
                    window.scrollTo(0, next);
                }
                i++;
            }, 16.7);
        };
        const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
            if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
            return (-c / 2) * (--t * (t - 2) - 1) + b;
        };
        onMounted(() => {
            window.addEventListener("scroll", handleScroll);
        });
        onBeforeUnmount(() => {
            window.removeEventListener("scroll", handleScroll);
            if (interval) {
                clearInterval(interval.value);
            }
        });
        return {
            visible,
            interval,
            isMoving,
            backToTop
        }
    },
    render() {
        return (
            <transition name={this.transitionName}>
                <div
                    v-show="visible"
                    style="customStyle"
                    class="back-to-ceiling"
                    onClick={this.backToTop}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 17 17"
                        class="Icon Icon--backToTopArrow"
                        aria-hidden="true"
                        style="height:16px;width:16px"
                    >
                        <path
                            d="M12.036 15.59a1 1 0 0 1-.997.995H5.032a.996.996 0 0 1-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z"
                        />
                    </svg>
                </div>
            </transition>
        )
    }
})