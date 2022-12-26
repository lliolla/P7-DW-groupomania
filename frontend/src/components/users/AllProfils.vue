<template>
    <div class="table-reponsive">
          <h2 v-if="userAdmin== true" class="d-flex justify-center my-8">Liste des utilisateurs </h2>
          <h2 class="d-flex justify-center my-8" v-else  >Gérer mon profil</h2>
        <template>
         
    <v-card-title v-if="userAdmin== true" >
          <UserForm 
            @user-created ='setUser'
            @crud-msg = 'setMsg'>
          </UserForm>
      <v-spacer></v-spacer>
     
      <v-text-field v-if="userAdmin== true"
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
  <v-simple-table v-if="userAdmin== true">
    <template v-slot:default> 
      <thead >
        <tr class="text-left">
         <th>Avatar</th>
        <th>Nom d'utilisateur</th>
        <th>Email</th>
        <th>Role</th>
        <th>Articles</th>
        <th>Commentaires</th>
        <th>Administration</th>
        </tr>
      </thead>
      <tbody >
         <tr
          v-for="person in users"
          :key="person.id"
         >
            <td> 
              <v-avatar
                size="38"
              >
                <v-img
                    :src="person.media">
                </v-img>
               </v-avatar>
            </td>
            <td>{{ person.username}}</td>
            <td>{{ person.email}}</td>
            <td>
                <v-chip
                color="#f08080">{{person.isAdmin ?'Administrateur':'Utilisateur'}}
                </v-chip>
            </td>
            <td>{{ postsLgt}}</td>
            <td>{{ cmtsLgt}}</td>
            <td class="d-flex">
               <UpdateUser 
                  @user-created ='setUser'
                  @crud-msg = 'setMsg'
                  :idUser="person.id"
               ></UpdateUser>
                <v-btn
                  elevation="2"
                  small
                  color="warning"
                  class="ma-2 "
                  @click="delateUser(person.id)"  >
                <v-icon>mdi-close-circle-outline</v-icon>
                </v-btn>
            </td>
         </tr>
      </tbody>
    </template>
  </v-simple-table>

    <v-simple-table  v-else >
    <template v-slot:default> 
      <thead >
        <tr class="text-left">
         <th>Avatar</th>
        <th>Nom d'utilisateur</th>
        <th>Email</th>
        <th>Role</th>
        <th>Articles</th>
        <th>Commentaires</th>
        <th>Administartion</th>
        </tr>
      </thead>
      <tbody >
         <tr>
            <td> 
              <v-avatar
                size="38"
              >
                <v-img
                    :src="user.media">
                </v-img>
               </v-avatar>
            </td>
            <td>{{ user.username}}</td>
            <td>{{ user.email}}  </td>
            <td>
                <v-chip
                color="#f08080">{{user.isAdmin ?'Administrateur':'Utilisateur'}}
                </v-chip>
            </td>
            <td>{{ postsLgt}}</td>
            <td>{{ cmtsLgt}}</td>
            <td class="d-flex">
               <UpdateUser 
                  @user-created ='setUser'
                  @crud-msg = 'setMsg'
                  :idUser="user.userId"
               ></UpdateUser>
          
                <v-btn
                  elevation="2"
                  small
                  color="warning"
                  class="ma-2 "
                  @click="  delateUser(user.userId)"  >
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
        setTimeout(()=>{this.update=false},2000)
          }
    }
   },
    mounted(){
       this.$store.dispatch('getAllUsers')
    },

     computed:{
      ...mapState(['users','token','user']),
       userAdmin(){
        const admin = JSON.parse(localStorage.getItem('user')).isAdmin
        if (admin == true){
          return true
        }else{
          return false
        }
       },
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

        delateUser(id){
         const admin = this.userAdmin
        axios.delete("http://localhost:3000/api/v1/user/"+id,{headers: {Authorization: 'Bearer ' + localStorage.token}})
               .then(()=>{ 
                       if(admin == true){
                      this.update=true
                     this.message ="l'utilisateur ainsi que tout son historique a bien été supprimé"

                       }else{
                   this.update=true
                   this.message ="Votre profil vient d'être supprimé  vous aller etre redirigé vers la page d'acceuil"
                    setTimeout(()=>{this.$router.push({ path: '/' })},2100)
                       }
                 })
               .catch(err=>{ console.log("err",err); })
        
        },
       
        
    }
}
</script>
<style>
h2{
    padding: 20px 0;
}
</style>