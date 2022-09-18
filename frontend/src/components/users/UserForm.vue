<template>
     <v-dialog
          v-model="dialog"
          max-width="450px"
          persistent
           scrollable
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#f08080"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Créer un utilisateur
            </v-btn>
          </template>
    <v-card class="new-user" >
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
      <v-form ref="userForm" class="form" >
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
  <v-text-field label="Saisissez votre identifiant *"
          type="username" 
          name="username" 
          id="username" 
          v-model="username"
          ></v-text-field>
        <v-text-field
          v-model="email"
          label="E-mail *"
          name="email" 
          required>  
        </v-text-field>
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
          block
          elevation="2"
          color="success"
          @click="register()">
          Créer le profil 
        </v-btn>
      </v-form>
    </v-card>
    
   
     </v-dialog> 
</template>
<script>
import { mapState } from 'vuex'
// import axios from 'axios'

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
   },
 
   computed :{
     ...mapState(['user']),// ramène les infos du user connecté: message,userId,username,token,avatar
   },
   methods :{
   
    register(){
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
             this.$emit('user-created',this.update=true)
             this.$refs.userForm.reset();
             this.dialog=false
             console.log(res);
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

