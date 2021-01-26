var app = new Vue({
    el:'#app',
    data : {
        text:'asdasd',
        data:[],
        currentPage:0,
        locations:[],
        currentLocation:'',
    },
    methods: {
        getUniqueList(){
            const locations =new Set();//陣列不得重複
            const vm =this;
            vm.data.forEach((item,i)=>{
                locations.add(item.Zone)
            })
            console.log(locations);
            vm.locations = Array.from(locations);
        }
    },
    computed:{
    filterData(){
        const vm = this; 
        //newData = [[],[],[]]
        let items = [];
        if(vm.currentLocation !==''){
            items = vm.data.filter((item,i)=>{
                console.log(item)
                return item.Zone == vm.currentLocation
            })
        }else{
            items = vm.data;
        }
        const newData = [];
        items.forEach((item,i) => {
            if( i % 10 === 0){
                newData.push([])
            }
            const page = parseInt(i/10);
            newData[page].push(item)
        })
        console.log(newData)
        return newData
    }
    },
    created() {
        const vm = this;
        axios.get('https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json')
        .then(res => {
           vm.data = res.data.result.records;
           vm.getUniqueList();
           console.log(res);
        })
        .catch(err => {
            console.error(err); 
        })
    },
})