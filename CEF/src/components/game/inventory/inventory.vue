<template>
    <div class="">
        <v-sheet
            height="800"
            width="400"
            class="flex overflow-scroll flex-wrap border"
            color="green lighten-2"
        >
            <transition-group
                type="transition"
                name="flip-list"
                class="d-flex gap-1 justify-start flex-wrap"
            >
                <draggable
                    @start="log"
                    @end="log"
                    v-for="i in 5"
                    :key="i + '_item'"
                    class="border h-16 w-16"
                    v-bind="{
                        animation: 300,
                        group: selectedId,
                    }"
                >
                    <div
                        v-if="list[i - 1]"
                        class="h-16 w-16 border-2 border-red-600"
                    >
                        {{ list[i - 1] }}
                    </div>
                </draggable>
            </transition-group>
        </v-sheet>
        {{ list }}
    </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
    methods: {
        onMoveCallback(evt) {
            console.log(evt);
            return true;
        },
    },
    data() {
        return {
            list: [1, 2, 3],
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
    },
};
</script>

<style>
</style>