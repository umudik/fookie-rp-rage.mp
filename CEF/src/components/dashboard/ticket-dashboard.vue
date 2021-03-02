<template>
    <div>
        <v-row>
            <v-col>
                <chart-model-status
                    model="Ticket"
                    field="status"
                    deepField="name"
            /></v-col>
            <v-col>
                <chart-model-status
                    model="Ticket"
                    field="worker"
                    deepField="name"
            /></v-col>
            <v-col>
                <chart-model-status
                    model="Ticket"
                    field="project"
                    deepField="name"
            /></v-col>
            <v-col>
                <chart-model-status
                    model="Ticket"
                    field="classification"
                    deepField="name"
            /></v-col>
        </v-row>
        <v-row>
            <v-col>
            <timeline-day-remain />
            </v-col>
            <v-col>OTHER CHART</v-col>
            <v-col>OTHER CHART</v-col>
        </v-row>
    </div>
</template>

<script>    
export default {

};
</script>

<st
TimelineDayRemainyle>
</style>