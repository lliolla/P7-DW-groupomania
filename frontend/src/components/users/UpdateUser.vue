<template>
    <v-dialog
          v-model="dialog"
          max-width="450px"
          persistent
           scrollable
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              elevation="2"
                  small
                  class="ma-2"
                  color="success"
              v-bind="attrs"
              v-on="on"
            >
            <v-icon>mdi-pencil-outline  </v-icon>
            </v-btn>
           
          </template>
    <v-card class="card">
       <div class="post-avatar d-flex justify-space-around align-center">
          <v-avatar
              size="45"
              dark>
              <img :src="userInfos.media" alt="avatar">
          </v-avatar>
          <v-card-title  class="mx-auto">
           Modifier votre profil
          </v-card-title >
          <v-btn
            fab
            dark
            x-small
            color="red darken-1"
            @click="closePost()">
            <v-icon color="white" >
              mdi-close
            </v-icon>
         </v-btn> 
       </div>  
       <v-alert
          outlined
          type="warning"
          text
          v-if=" errMsg==true"
          >
          {{message}} 
      </v-alert>
      <v-divider></v-divider>

      <v-form class="form" >
        <!-- :rules="nameRules" -->
        <v-text-field
          v-model="userInfos.lastname"
          name="lastname" 
          label="Nom"
        ></v-text-field>
        <v-text-field
          v-model="userInfos.firstname"
           name="firstname" 
          label="Prénom"
        ></v-text-field>
           <v-text-field 
        label="Saisissez votre identifiant *"
          type="username" 
          name="username" 
          id="username" 
          v-model="userInfos.username"
          ></v-text-field>
        <v-text-field
          v-model="userInfos.email"
          label="E-mail *"
          name="email" 
          required>  
        </v-text-field>
     
      <!-- mettre des regles pour le format des images -->
        <div class="update-avatar d-flex">
            <v-file-input
                v-model="media"
                name="media"
                label="Changer de photo de profil">
            </v-file-input>
        </div>
        <v-btn 
          block
          elevation="2"
          color="success"
           @click="editUser(userInfos.media)">
          Modifier le profil 
        </v-btn>
      </v-form>
    </v-card>
    </v-dialog> 
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
   name : 'Profil',
   props:['idUser'],
   data:()=>{
       return {
         dialog :"",
         update:false,
         errMsg:"",
         message:"",
         media:[],
         userConnectId:JSON.parse(localStorage.getItem('user')),
         userInfos:{},
       }
   },
   mounted : 
   function(){
     if(this.$store.state.user.userId == -1){
      console.log('user profil', this.$store.state.user)
        this.$router.push('/')
        return;
     }
     this.getProfil()
     },
 
   computed :{
     ...mapState(['user']),// ramène les infos du user connecté: message,userId,username,token,avatar
   },
   methods :{
    getProfil(){
    axios.get("http://localhost:3000/api/v1/user/"+this.idUser +{headers: {Authorization: 'Bearer ' + localStorage.token}})
          .then(res=>{
            this.userInfos= res.data
          })
          .catch(err=>{
            console.log("err",err);
          })     
     },
    editUser(media){
    let idUsers=this.userInfos.id  

     if(!this.media){
      this.media=media }
    // create formdata to send data
    const updateDataProfil = new FormData;     
    updateDataProfil.append('username', this.userInfos.username),
    updateDataProfil.append('firstname', this.userInfos.firstname),
    updateDataProfil.append('lastname',this.userInfos.lastname),
    updateDataProfil.append('email', this.userInfos.email),
    updateDataProfil.append('media', this.media),
    updateDataProfil.append('idUsers', idUsers),
 console.log("idUser",this.idUser);
    //axios put data to database
     axios.put("http://localhost:3000/api/v1/user/"+idUsers,updateDataProfil,{headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(()=>{
              this.$emit('user-created',this.update=true)
              this.$emit('crud-msg',this.message="Mise a jour du profil réussie")
              this.dialog=false
             })
             .catch(err =>{
                console.log(err);
             });
     },
     
    closePost(){
          this.dialog=false
          this.update=false
     },
   }
     
}
</script>
<style scoped>
.card{
  padding: 20px;
}

</style>

