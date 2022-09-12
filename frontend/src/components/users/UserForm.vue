<template>

    <v-card class="new-user" v-if="newUser" >
       <div class="post-avatar d-flex justify-space-around align-center">
          <v-card-title >
            Créer un nouvel utilisateur
          </v-card-title >
          <v-btn
          icon
          color="red"   
          outlined
          x-small
          @click="closePost()"
         >
            <v-icon >
              mdi-close
            </v-icon>
         </v-btn> 
       </div>  
       <v-alert
          outlined
          type="warning"
          text
          v-if=" errMsg==true"
          width="90%"

          >
          {{message}} 
      </v-alert>
      <v-divider></v-divider>
      <v-form class="form" >
       
        <!-- :rules="nameRules" -->
        <v-text-field
          v-model="lastname"
          name="lastname" 
          label="Nom"
        ></v-text-field>
        <v-text-field
          v-model="firstname"
           name="firstname" 
          label="Prénom"
        ></v-text-field>

        <v-text-field
          v-model="email"
          label="E-mail *"
          name="email" 
          required
        >
          
        </v-text-field>
        <v-text-field label="Saisissez votre identifiant *"
          type="username" 
          name="username" 
          id="username" 
          v-model="username"
          ></v-text-field>
        <v-text-field 
           required
        label="Mot de passe *"
          type="password" 
          name="password" 
          id="password" 
          v-model="password"
          ></v-text-field>
      <!-- mettre des regles pour le format des images -->
        <v-btn 
        v-if="newUser"
          block
          elevation="2"
          color="success"
          @click="register()">
          Créer le profil 
        </v-btn>
      </v-form>
    </v-card>
    <v-card class="update-user" v-else >
       <div class="post-avatar d-flex justify-space-between align-center">
          <v-card-title >
           Modifier votre profil
          </v-card-title >
          <v-btn
          icon
          color="red"   
          outlined
          x-small
          @click="closePost()"
         >
            <v-icon >
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
          v-model="email"
          label="E-mail *"
          name="email" 
          required>  
        </v-text-field>
        <v-text-field 
        label="Saisissez votre identifiant *"
          type="username" 
          name="username" 
          id="username" 
          v-model="userInfos.username"
          ></v-text-field>
          
      <!-- mettre des regles pour le format des images -->
        <div class="update-avatar">
            <v-file-input
                v-model="userInfos.avatar"
                name="media"
                label="Changer de photo de profil">
            </v-file-input>
        </div>
        <v-btn 
          block
          elevation="2"
          color="success"
          @click="updateUser(userInfos.avatar)">
          Modifier le profil 
        </v-btn>
      </v-form>
    </v-card>
     
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
   name : 'Profil',
   props:['id', 'mode','newUser'],
   data:()=>{
       return {
         dialog :"",
         update:false,
         errMsg:"",
         message:"",
         lastname:"",
        firstname:"",
         email:"",
        username: "",
        password:"",
         media:[],
         userConnectId:JSON.parse(localStorage.getItem('user')),
         userInfos:{ },//User's info from database
       }
   },
   mounted : 
   function(){
     if(this.$store.state.user.userId == -1){
      console.log('user profil', this.$store.state.user)
        this.$router.push('/')
        return;
     }
    
    if(this.newUser==false){
      this.getProfil()
    }

   },
 
   computed :{
     ...mapState(['user']),// ramène les infos du user connecté: message,userId,username,token,avatar
   },
   methods :{
   getProfil(){
   // get user connect infos
    let userConnect = JSON.parse(localStorage.getItem('user')) 
    let userConnectId =userConnect.userId
    axios.get("http://localhost:3000/api/v1/user/"+userConnectId +{headers: {Authorization: 'Bearer ' + localStorage.token}})
          .then(res=>{
            this.userInfos= res.data
          })
          .catch(err=>{
            console.log("err",err);
          })
     },
    register(){
    console.log('register');
     // call API in the Store
     this.$store.dispatch('register',{
        //on passe les variables
           email: this.email,
           username:this.username,
           password:this.password,
           name:this.name,
           firstname : this.firstname,
           lastname : this.lastname,
           avatar:this.avatar,
           message:"",
         })
           .then(res=>{
            this.dialog="false"
             console.log('response',res.data);
           })
           .catch(err =>{
              this.errMsg=true
              this.message =err.response.data.error
         })
     },
     closePost(){
       this.dialog=false
     },
   }
     
}
</script>
<style scoped>
.cards-form{
  padding: 15px;
}
</style>

