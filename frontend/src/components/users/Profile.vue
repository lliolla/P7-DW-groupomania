<template>
    <v-card class="cards-form d-flex flex-column justify-center" >
       <div class="post-media">
          <v-card-title primary-title>
            Modifier mon profil
          </v-card-title >
          <v-avatar
              size="45"
              color="red">
              <img src="../../assets/images/avatar.jpg" alt="avatar">
          </v-avatar>
       </div>      
          <v-divider></v-divider>
        
          <v-form class="form">
            <v-text-field
              v-model="user.username"
              label="Nom d'utilisateur"
              required
            ></v-text-field>
            <!-- :rules="nameRules" -->

            <v-text-field
              v-model="user.lastname"
              label="Nom"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.firstname"
              label="Prénom"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.email"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.password"
              label="Mot de passe"
              required
            ></v-text-field>

            <v-file-input
                v-model="user.media"
              truncate-length="15"
              label="Charger une photo de votre avatar"
            ></v-file-input>

            <v-btn 
              block
              elevation="2"
              color="success"
              class="mr-4 btn"
              @click="postProfil()"
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
export default {
   name : 'Profil',
   data:()=>{
       return {
         username:"",
         lastname:"",
         firstname:"",
         email:"",
         password:"",
         media:"",

       }
   },
   //au chargement de la vue
   mounted : function(){
     if(this.$store.state.user.userId == -1){
 console.log('user profil', this.$store.state.user)
        this.$router.push('/')
        return;
     }
     //on recupere les infos du user
     this.$store.dispatch('getUserInfo')
   },
   computed :{
      ...mapState ({
        // on renome userinfo en user
        user: 'userInfos'
      })
   }
     
}
</script>