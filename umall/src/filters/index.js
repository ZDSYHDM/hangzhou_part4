import Vue from 'vue'

let obj = {

}

for(var key in obj){
    Vue.filter(key,obj[key])
}