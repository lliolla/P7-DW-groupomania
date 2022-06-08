<template>
    <v-card class="cards-form d-flex flex-column justify-center" >
       <div class="post-avatar d-flex ">
          <v-avatar
              size="45"
              color="red">
              <img :src="userInfos.avatar" :alt="avatar">
          </v-avatar>
          <v-card-title  >
            Modifier mon profil 
          </v-card-title >
       </div>      
      <v-divider></v-divider>
      <v-form class="form">
        <v-text-field
          v-model="userInfos.username"
          label="Nom d'utilisateur"
          required
        ></v-text-field>
        <!-- :rules="nameRules" -->

        <v-text-field
          v-model="userInfos.lastname"
          label="Nom"
          required
        ></v-text-field>

        <v-text-field
          v-model="userInfos.firstname"
          label="Prénom"
          required
        ></v-text-field>

        <v-text-field
          v-model="userInfos.email"
          label="E-mail"
          required
        ></v-text-field>

      <!-- mettre des regles pour le format des images -->
        <div class="update-avatar">
            <v-file-input
                v-model="avatar"
                ref="avatar"
                label="Changer de photo de profil">
            </v-file-input>
        </div>


        <v-btn 
          block
          elevation="2"
          color="success"
          class="mr-4 btn"
          @click="updatePost()"
        >
          Valider les changements 
        </v-btn>
          <v-btn 
          block
          elevation="2"
          color="red"
          class="mr-4 btn"
          @click="delateProfil()"
        >
          Supprimer le profil
        </v-btn>
      </v-form>
    
    </v-card>
      <!--  -->
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
   name : 'Profil',
   props:['id'],
   data:()=>{
       return {
         dialog :"",
         avatar:"",
         userConnectId:JSON.parse(localStorage.getItem('user')).userId,
        //  userInfos:[],
         userInfos:{
            idUser:"",
            username:"",
            lastname:"",
            firstname:"",
            email:"",
            password:"",
            avatar:"",
         },
       }
   },
  
   mounted : 
   function(){
     if(this.$store.state.user.userId == -1){
      console.log('user profil', this.$store.state.user)
        this.$router.push('/')
        return;
     }
    // get user connect infos
    
  
    // on récupere l'id du user connecté
    let userConnect = JSON.parse(localStorage.getItem('user')) 
    let userConnectId =userConnect.userId
    console.log("userConnectId",userConnectId);

    axios.get("http://localhost:3000/api/v1/user/"+userConnectId +{headers: {Authorization: 'Bearer ' + localStorage.token}})
    .then(res=>{
      this.userInfos= res.data
    })
    .catch(err=>{
      console.log("err",err);
    })
   },
   computed :{
     ...mapState(['user']),// ramène les infos du user connecté: message,userId,username,token,avatar
   },
   methods :{
     updatePost(){
    //get user ID connect
    let idUsers=this.userInfos.id  

    //test if media file exist
      //  if(!this.avatar){
      //       this.avatar=avatar  
      //     }
    // create formdata to send data
    const updateDataProfil = new FormData;     
    updateDataProfil.append('username', this.userInfos.username),
    updateDataProfil.append('firstname', this.userInfos.firstname),
    updateDataProfil.append('lastname',this.userInfos.lastname),
    updateDataProfil.append('email', this.email),
    updateDataProfil.append('avatar', this.avatar),
    updateDataProfil.append('idUsers', idUsers),
 
 
    console.log("post modifie pret a envoyer backend",updateDataProfil,idUsers)
    //axios put data to database
     }
   }
     
}
</script>
<style scoped>
.cards-form{
  padding: 15px;
}
</style>