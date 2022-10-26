<template>
    <v-dialog
        v-model="dialog"
          max-width="450px"
          persistent
          scrollable>
        <v-card class="new-post ">
            <div class="post-media d-flex justify-space-around align-center">
                <v-card-title  class="mx-auto">
                   NOUVEL ARTICLE 
                </v-card-title >
                <v-btn
                  fab
                  dark
                  x-small
                  color="red darken-1"  
              
                @click="closePost()" >
            <v-icon  color="white" >
              mdi-close
            </v-icon>
                </v-btn>
            </div>
            
             <v-divider></v-divider>
              <v-form ref="postForm" class="form" >       
                    <v-text-field 
                    label="Titre"
                    v-model="title">
                    </v-text-field>
                    <v-textarea
                        label="Ecrivez votre contenu"
                        counter="254" 
                        v-model="content"
                        :rules ="rulesContent">
                    </v-textarea>
                    <v-file-input
                    v-model="media"
                    ref="media"
                    label="Ajouter un fichier">
                    </v-file-input>
        
            <v-divider></v-divider>
            <div class="post-footer">
                <template> 
                    <v-btn 
                    block
                    elevation="2"
                    color="success"
                    @click="sendDataPost()"
                    >Créer l'article</v-btn>
                </template>
            </div>
             </v-form>
        </v-card>
         <template v-slot:activator="{ on, attrs }">
           <v-btn 
            color="red"
            fab top
            v-bind="attrs"
            v-on="on"
            >
                <v-icon color="white">mdi-plus</v-icon>
            </v-btn> 
        </template>   
    </v-dialog>
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
            media:[],
            dialog :false,
            update:false,
            errMsg:"",
            rulesContent:[
                v => !!v || 'Le contenu ne doit pas être vide',
                v => v && v.length <= 254 || 'Max 254 charactères'
            ],
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
            newDataPost.append('UserId',userId)
            newDataPost.append('content',this.content)
            newDataPost.append('media',this.media)  

            console.log("post pret a envoye au back",newDataPost)
            axios.post("http://localhost:3000/api/v1/post",newDataPost,{headers: {Authorization: 'Bearer ' + token}})
            .then(()=>{
                 this.$emit('post-created',this.update=true)
                this.$refs.postForm.reset();
                 this.dialog=false
            })
            .catch(err =>{
                console.log(err);
            });
        },
        closePost(){
         this.dialog=false 
         
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
.v-icon.v-icon {
  font-size: 30px;
  color: rgb(250, 237, 237);
  vertical-align: middle;   
}

.files-text {
color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
}
</style>