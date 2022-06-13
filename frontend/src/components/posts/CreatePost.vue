<template>
    <div class="create-post" width="70%">
        <v-card class="card d-flex flex-column ">
            <div class="post-media">
                 <v-avatar
                    size="45"
                    color="red">
                        <img :src="user.avatar" alt="avatar">
                </v-avatar>
                <v-card-title>
                   CREER VOTRE POST 
                </v-card-title >
 
            </div>
            <div class="post-content">        
                    <v-text-field 
                    prepend-icon="mdi-pen"
                    label="Titre"
                    v-model="title">
                    </v-text-field>
                    <v-textarea
                      prepend-icon="mdi-pen"
                        label="Ecrivez votre contenu"
                        v-model="content">
                    </v-textarea>
                    <v-file-input
                    v-model="media"
                    ref="media"
                    label="Ajouter un fichier">
                    </v-file-input>
            </div>
            <v-divider></v-divider>
            <div class="post-footer">
                <template> 
                    <v-btn color="warning"
                    @click="closePost()"
                    >Fermer</v-btn>
               
                    <v-btn color="success"
                    @click="sendDataPost()"
                    >Envoyer</v-btn>
                </template>
                
            </div>
        </v-card> 
    </div>
</template>

<script>
import axios from"axios"
import { mapState } from 'vuex';

export default {
    name : "CreatePost",
    data(){
        return {
            title : "",
            content:"",
            media:null,
            dialog :"",
        }
    } ,
    computed:{
      ...mapState(['user']),
     
      },
    methods: {
        sendDataPost (){
            //on recupere le user connecté ds le storage et on extrait l'ID
            let user=JSON.parse(localStorage.getItem('user')) 
            let userId=user.userId
          
            //on recupere le token ds le storage et on extrait l'ID
            let token=user.token

            //on creer un formdata pour envoyer les données
            const newDataPost = new FormData;
            newDataPost.append('title',this.title)
            newDataPost.append('id_users',userId)
            newDataPost.append('content',this.content)
            newDataPost.append('media',this.media)  

            console.log("post pret a envoye au back",newDataPost)
            axios.post("http://localhost:3000/api/v1/post",newDataPost,{headers: {Authorization: 'Bearer ' + token}})
            .then(response=>{
                    console.log("nouveau post créer",response)
                // voir pour faire fonctionner this.dialog=false qui devrait close le modal
                //fais en sorte que le nouveau post soit ajouté dans la liste des posts à afficher, et ensuite tu ferme le formulaire.
                 this.dialog=false
                 this.$router.push({ name: 'Wall'})
            })
            .catch(err =>{
                console.log(err);
            });
            this.dialog=false
           console.log("dialog",this.dialog )
        },
        closePost(){
          
         this.$router.push({ name: 'Wall'})
         
        }

    }
}
</script>
<style scoped>
.post-footer{
    margin: 15px 0px;
    padding: 5px 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.post-media{
    display: flex;
   
}
.card{
  padding: 10px;
}
.v-icon.v-icon{
    font-size:27px;
    padding-left: 20px;
}

.files-text {
color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
}
</style>