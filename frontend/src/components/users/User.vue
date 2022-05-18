<template>
    <div class="users">

        <h1> Profil de l'utilisateur {{userName}} {{$route.params.id}} </h1>
            <Profile></Profile>
            <UserCom></UserCom>
    </div>
</template>
<script>
import Profile from '@/components/users/Profile.vue'
import UserCom from '@/components/users/UserCom.vue'

export default {
    Name:'User',
    components : {
        Profile,
        UserCom
    },
    data: ()=>{
        return{
            userName :'Gandalf le gris'
        }
    },
    // computed:{// on recupere l'id ds les params et on convertit le resultat en integrer ou number car les params sont des string
    //     userId(){
    //         return parseInt( $route.params.id)
    //     },
        

    
}
</script>