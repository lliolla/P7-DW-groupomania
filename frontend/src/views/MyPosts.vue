<template>
   <v-app>
    <div class="posts">
        <v-navigation-drawer
        v-model="drawer"
        app >
        <TheSidebar></TheSidebar>
        </v-navigation-drawer>
        <TheNavbar ></TheNavbar>
             <main >
        <OneUserPosts></OneUserPosts>
             </main> 
   </div>
   </v-app>
 </template>
 
 <script>
  import TheSidebar from '@/components/TheSidebar.vue';
  import TheNavbar from '@/components/TheNavbar.vue';
  import OneUserPosts from '@/components/posts/OneUserPosts.vue';
  import { mapState} from 'vuex';
  import axios from 'axios';
 
 
  export default {
    name: "MyPosts",
    components: {
      TheSidebar,
      TheNavbar,
      OneUserPosts
    },
    data: () => {
      return{
        drawer: null ,
        username: "",
        userId:"",
        dialog:"",
        open:false,
        alert: false,//alerte pour confirmer la suppression d'un post
        toggle :false,//faire disparaitre le btn des modif une fois l'alert de suppression lancer et le faire rapararitree a la fermeture
        
      }
    },
    computed:{
      ...mapState(['posts','user']),
      publishedDaysAgo (){
          let dateNow = "date :publie depuis"
          return dateNow
      }
    },
    methods:{
      updatePost(idPost){
            this.dialog = true
            localStorage.setItem('idPost',idPost)
            let id = localStorage.getItem('idPost')
           this.$router.push({name:'EditPost', params: {id: id}})
      },
     delatePost(idpost){
         console.log("POst supprimé",idpost);
            axios.delete("http://localhost:3000/api/v1/post/"+idpost,{headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(res=>{ console.log("post supprimé res",res.data)})
                .catch(err=>{ console.log("err",err); })
                this.alert= false 
                this.toggle= true
                this.$router.push({ name: 'Wall'})
     },
     toggleDropddown(){
            this.alert = true
            this.toggle= true
        },
    },
  
  }

 </script>
 
 <style>
 .posts{
   background-color:rgb(226, 225, 223);
 }

 
 
 </style>