<template>
   <v-app id ="connection">
       <v-main>
          <section class="header-wrapper red darken-1 ">
            <h1 class="text-center pa-5"> {{welcomMsg}} </h1>
          </section>
          <section class="auth-wrapper" max-width="500">
            <v-img src="../assets/images/home-img.jpg">
            <div class="d-flex align-center"
            height ="100%" > 
              <v-card 
                  class="d-flex flex-column  mx-auto red lighten-5 pa-5 ma-10" 
                  max-width="344">
                  <v-card-title v-if="mode=='register'" >
                    Creer votre compte
                  </v-card-title>
                  <v-card-title v-else >
                    Connectez vous
                  </v-card-title>
                   <!-- see backend's messages if connexion fail -->
               
                   <v-alert type="error" v-if="auth=='false'" >
                     {{errMsg}} 
                   </v-alert>
                    <v-card-subtitle v-if="mode=='login'">
                      Vous n'avez pas encore de compte ? 
                      <router-link to=""> <span @click="switchRegister()" >Créer votre compte</span> </router-link> 
                    </v-card-subtitle>
                    <v-card-subtitle v-else >
                      Votre compte est déjà créer ? 
                        <router-link to=""> <span @click="switchLogin()"> Connectez vous</span></router-link> 
                    </v-card-subtitle>
                  <v-card-text>
                    <div class="register" v-if="mode=='register'">
                        <v-text-field label="Saisissez votre Nom"
                        type="firstname" 
                        name="firstname" 
                        id="firstname" 
                        v-model="firstname"
                        ></v-text-field> 
                        <v-text-field label="Saisissez votre Prénom"
                        type="lastname" 
                        name="lastname" 
                        id="lastname" 
                        v-model="lastname"
                        ></v-text-field> 
                      <v-text-field label="Saisissez votre identifiant *"
                        type="username" 
                        name="username" 
                        id="username" 
                        v-model="username"
                        ></v-text-field>
                        
                    </div>
                      <v-text-field label="Saisissez votre mail *"
                        type="email" 
                        name="email" 
                        id="email" 
                        v-model="email"></v-text-field> 
                        
                        <v-text-field label="Saisissez votre Mot de passe *"
                        type="password" 
                        name="password" 
                        id="password" 
                        v-model="password"
                        ></v-text-field>
                        <p>
                          les champs suivis d'un * sont obligatoires
                        </p>
                    <v-btn color="green" class="btnForm " :disabled="!validatedFields" block @click="login()" v-if="mode=='login'" >
                      <span class="connect" v-if="status == 'loading'">  Connexion en cours ...</span>
                      <span v-else>connexion</span>
                     </v-btn>
                    <v-btn color="green" class="btnForm" :disabled="!validatedFields" block @click="register()" v-else ><span class="connect" v-if="status == 'loading'">  Inscription en cours ...</span>
                      <span v-else>Inscription</span></v-btn>
                   <router-link  to=""> <span v-if="mode=='login'" @click="forgotPasseword()" >Mot de passe oublié?</span> </router-link> 

                  </v-card-text>
              </v-card>    </div>
             
            </v-img>
             
          </section>
          <Footer></Footer>
       </v-main>
    
   </v-app>

</template>

<script>

import Footer from '@/components/Footer.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
   components: {
      Footer,    
    },
    data (){
      return{
        welcomMsg: "Bienvenue sur votre réseau social",
        mode : "login",
        email:"",
        username: "",
        password:"",
        firstname:"",
        lastname:"",
        avatar:"",
        token:"",
        errMsg:"",
        auth:""
      }
    },
    watch:{
     mode(newValue,oldValue){
      console.log("mode newValue",newValue, "mode oldValue", oldValue)
     }
    },
     computed:{
       validatedFields: function(){
        if( this.mode == 'register'){
            if(this.email !=""&& this.username !=""&& this.password !=""){
              return true
            }else{
             return false 
            }
        }else{
          if(this.email !=""&& this.password !=""){
              return true
            }else{
             return false 
            }
        }
       },
      ...mapState(['status'])
     },
     methods: {
        switchRegister(){
            this.mode = "register"
        },
        switchLogin(){
            this.mode = "login"
        },
      forgotPasseword(){
        console.log("renvoi sur la fonction mot de passe oublié");
      },
       register(){
       // create an API call in the store
         this.$store.dispatch('register',{
        //passing variables
           email: this.email,
           username:this.username,
           password:this.password,
           name:this.name,
           firstname : this.firstname,
           lastname : this.lastname,
           avatar:this.avatar,
           message:"",
         })
           .then(()=>{
             this.switchLogin()
             this.auth="true"
             console.log('response log ', this.mode,this.auth);
           })
           .catch(err =>{
               if(err!== 200){
                 this.auth="false"
                 this.errMsg =err.response.data.error
               }
         })
      },
      login (){
       // create an API call in the store
         this.$store.dispatch('login',{
        //passing variables
            email: this.email,
            password:this.password,
            message:"",
         })
         .then(res=>{
          console.log('response',res.data);
           this.$router.push({name:'Wall'})
          })
          .catch(err => {
            if (err.status !== 200 ) {
                   this.auth="false"
                   this.errMsg =err.response.data.error
               }
          });
        } 
      },
   
}
</script>
<style  scoped>

  span .connect{
  font-size: 10px;
  }
  .header-wrapper{
    height: 100px;
   background-color:bisque;
  }
 .btnForm{
   margin-bottom: 16px;
 }
</style>