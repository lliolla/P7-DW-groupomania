<template>
    <v-card class="cards-form d-flex flex-column " >
       <div class="post-avatar d-flex justify-space-between align-center">
          <v-avatar
              size="45"
              dark>
              <img :src="userInfos.media" alt="avatar">
          </v-avatar>
          <v-card-title  >
            Modifier mon profil
          </v-card-title >
          <v-btn
            icon
            color="red"
            outlined
            x-small
            @click="closePost()">
            <v-icon >
              mdi-close
            </v-icon>
         </v-btn> 
       </div>   
      <v-divider></v-divider>
      <v-form class="form" >
        <v-text-field
          v-model="userInfos.username"
          label="Nom d'utilisateur   "
          name="username"
          required
        ></v-text-field>
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
          v-model="userInfos.email"
          label="E-mail"
          name="email" 
          required>
        </v-text-field>
      <!-- mettre des regles pour le format des images -->
        <div class="update-avatar">
            <v-file-input
                v-model="media"
                name="media"
                label="Changer de photo de profil">
            </v-file-input>
        </div>
        <v-alert
           outlined
           type="success"
           text
           v-if=" update==true"
        >{{message}} </v-alert>
        <v-btn 
         v-if="update==false"
          block
          elevation="2"
          color="success"
          @click="updateProfil(userInfos.media)">
          Valider les changements 
        </v-btn>

          <v-btn 
          v-if="update==false"
          block
          elevation="2"
          color="error"
          @click="delateProfil(userInfos.id)">
          Supprimer le profil
        </v-btn>
      </v-form>
    </v-card>
     
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
   name : 'Profil',
   props:['id', 'mode'],
   data:()=>{
       return {
         dialog :"",
         update:false,
         message:"",
         media:[],
         lastname:"",
         userConnectId:JSON.parse(localStorage.getItem('user')).userId,
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
    console.log('update',this.update);
    this.getProfil()
   },
    watch :{
    update(newupdate, oldupdate){
     if(newupdate !=oldupdate)
     this.message ='Votre profil a bien ete modifié'
     this.getProfil()
     
     setTimeout(() => {
       this.closePost()
      }, 1500)
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
     updateProfil(media){
    //get user ID connect
    let idUsers=this.userInfos.id  
    if(!this.media){
      this.media=media  
            }
    // create formdata to send data
    const updateDataProfil = new FormData;     
    updateDataProfil.append('username', this.userInfos.username),
    updateDataProfil.append('firstname', this.userInfos.firstname),
    updateDataProfil.append('lastname',this.userInfos.lastname),
    updateDataProfil.append('email', this.userInfos.email),
    updateDataProfil.append('media', this.media),
    updateDataProfil.append('idUsers', idUsers),
 
 
    //axios put data to database
     axios.put("http://localhost:3000/api/v1/user/"+this.idPost,updateDataProfil,{headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response=>{
             console.log("profil envoyé",response)

             this.update = true
             })
             .catch(err =>{
                console.log(err);
             });
     },
     closePost(){
       this.$router.push({name: 'Wall'})
     },
     delateProfil(idUser){
        console.log("Profil pres pour suppression en db",idUser);
        axios.delete("http://localhost:3000/api/v1/user/"+idUser,{headers: {Authorization: 'Bearer ' + localStorage.token}})
        .then(()=>{ 
         // this.mode = 'register'
        
          localStorage.clear();
          this.$router.push("/")
          }
      
        )
        .catch(err=>{ console.log("err",err)} )
     
        
     }

   }
     
}
</script>
<style scoped>
.cards-form{
  padding: 15px;
}
</style>

