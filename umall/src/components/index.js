import Vue from 'vue'

let obj = {}

for(var key in obj){
    Vue.component(key,obj[key])
}