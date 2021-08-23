<template>
    <div v-if="user">
        <h1>접속한 유저</h1>
        <p>아이디 : {{ user.user_id }} </p>
        <p>비밀번호 : {{ user.password }} </p>
        <p>이름 : {{ user.user_name }} </p>
        <button class="crollBtn" @click="clickCrollBtn"> Croll btn </button>
        <h1> 크롤링 데이터 </h1>
        <div v-for="(data, index) in crollData" v-bind:key="index">
            <p> 타이틀 : {{ data.title }} </p>
            <p> 설명 : {{ data.summary }} </p>
            <p> 예약 가능시간대 : {{ splitTime(data.reservableTime) }} </p>
        </div>
    </div>
    
</template>

<script>
export default {
    data() {
        
        return {
            user: null,
            crollData : null
        };

    },
    methods  : {

        clickCrollBtn : function(){
            this.$http.get('http://localhost:80/croll')
                .then((res) => {
                    
                    console.table(res.data);

                    const crollData = res.data;
                    if (crollData) this.crollData = crollData;
                })
                .catch((err) => {
                    console.error(err);
                });
        },

         //예약시간 커팅 함수
        splitTime : function(str){
            console.log(str);
            let timeArray = [];
            let strLength = str.length;
            if(strLength > 5){
                let objectCycle = Math.floor(strLength/5);
                for(let cycle = 0 ; cycle < objectCycle; cycle++){
                    timeArray.push(str.substr(cycle*5,5));
                     console.log(str);

                }
                return timeArray;

            }else{
                return str;
            }
        }
  
    },

    created() {
        this.$http.get('http://localhost:80/account')
            .then((res) => {
                
                console.table(res.data);

                const user = res.data[0];
                if (user) this.user = user;
            })
            .catch((err) => {
                console.error(err);
            });
    },
    
   

}
</script>

<style></style>