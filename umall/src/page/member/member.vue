<template>
<div>
    <v-add></v-add>
    <v-list></v-list>
</div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import vAdd from './components/add'
import vList from './components/list'
export default {
props: [],
components: {
    vAdd,
    vList
},
data() {
return {};
},
computed: {
...mapGetters({}),
},
methods: {
...mapActions({}),
},
mounted() {},
};
</script>

<style scoped>

</style>