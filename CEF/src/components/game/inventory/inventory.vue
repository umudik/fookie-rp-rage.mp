<template>
    <div class="">
        <v-sheet
            height="800"
            width="400"
            class="flex overflow-scroll flex-wrap border"
            color="green lighten-2"
        >
            <draggable
                v-model="list"
                v-bind="dragOptions"
                @start="drag = true"
                @end="drag = false"
            >
                <transition-group
                    type="transition"
                    :name="!drag ? 'flip-list' : null"
                    class="d-flex gap-1 justify-start flex-wrap"
                >
                    <v-sheet
                        height="50"
                        width="50"
                        v-for="i in list"
                        :key="i"
                        class="m-1"
                    >
                        <div class="border">{{ i }}</div>
                    </v-sheet>
                </transition-group>
            </draggable>
        </v-sheet>
        {{ list }}
    </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
    data() {
        return {
            list: [
                1,
                2,
                3,
                4,
                5,
                4,
                4,
                4,
                4,
                5,
                8,
                9,
                6,
                2,
                1,
                0,
                2,
                5,
                7,
                8,
                3,
            ],
            drag: false,
        };
    },
    components: {
        draggable,
    },
    props: ["selectedId"],
    computed: {
        items() {
            return this.$store.state.item.pool.filter(
                (i) => i.inventory == this.selectedId
            );
        },
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost",
            };
        },
    },
};
</script>

<style>
</style>