<template>
    <div class="table-reponsive">
          <h2>Mes posts</h2>
        <template>
         
    <v-card-title>
          <UserForm 
            @user-created ='setUser'>
          </UserForm>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
          </v-card-title> 
        <v-alert
        type="success"
        v-if=" update==true"
        >
        {{message}} 
       </v-alert>    
  <v-simple-table >
    <template v-slot:default> 
      <thead >
        <tr class="text-left">
        <th>Date</th>
        <th>Titre</th>
        <th>Media</th>
        <th>Commentaires</th>
        <th>Like</th>
         <th>Dislike</th>
        <th>Administration</th>
        </tr>
      </thead>
      {{posts}}
      <tbody>
         <tr
          v-for="post in posts"
          :key="post.id">
            <td>{{post.updatedAt}} </td>
            <td>{{post.title}}</td>
            <td>{{post.media}}</td>
            <td>10</td>
            <td>{{post.dislike}}</td>
            <td>{{post.like}}</td>
            <td class="d-flex">
               <UpdateUser 
                  @user-created ='setUser'
                  @crud-msg = 'setMsg'
                  :idUser="user.id"
               ></UpdateUser>
                <v-btn
                  elevation="2"
                  small
                  color="warning"
                  class="ma-2 "
                  @click="delateUser(user.id)"  >
                <v-icon>mdi-close-circle-outline</v-icon>
                </v-btn>
            </td>
         </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

    </div>
</template>
<script>
let user = JSON.parse(localStorage.getItem('user'))
import { mapState } from 'vuex';
import axios from 'axios';

import UserForm from '@/components/users/UserForm.vue'
import UpdateUser from '@/components/users/UpdateUser.vue'


export default {
   name:"AllProfils",
   props:['idUser'],
   components:{
      UserForm,
      UpdateUser,
   },
   data:()=> {
        return{
           userId :user.userId,// on recupere l'id du userconnecté
           postsLgt:1,
           cmtsLgt:10,
           message:"",
           update:false,
           dialog: false,
        }

    },
     watch: {
    update(newValue, oldValue){
      console.log("newValue, oldValue",newValue, oldValue);
      if(newValue != oldValue){
       this.$store.dispatch('getAllUsers')
      setTimeout(()=>{this.update=false},1500)
    }
    }
   },
    mounted(){
       this.$store.dispatch('getAllUsers')
    },

     computed:{
      ...mapState(['posts','token'])
    
    },

    methods:{ 
        setMsg(payload){
          this.message=payload
          console.log("payload",this.message);
        },
        setUser(payload){
          this.update=payload
          console.log("payload",this.update);
        },
        updatePost(idPost){
            this.dialog = true
            localStorage.setItem('idPost',idPost)
            let id = localStorage.getItem('idPost')
           this.$router.push({name:'EditPost', params: {id: id}})
        },
        delatePost(idpost){
             //get token in storage and extract ID
            let user=JSON.parse(localStorage.getItem('user'))
            let token = user.token
         console.log("POst supprimé",idpost);
            axios.delete("http://localhost:3000/api/v1/post/"+idpost,{headers: {Authorization: 'Bearer ' + token}})
                .then(res=>{ console.log("post supprimé res",res.data)})
                .catch(err=>{ console.log("err",err); })
                this.alert= false 
                this.toggle= true
                this.$router.push({ name: 'Wall'})
        },
    }
}
</script>
<style>
h2{
    padding: 20px 0;
}
</style>