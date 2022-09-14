<template>
    <v-dialog 
        transition="dialog-transition"
        max-width="600px"
        v-model="dialog"
    >
        <v-card
            class="card ">
                <div class="post-media">
                    <v-avatar
                        size="45"
                        color="red">
                        <img :src="user.avatar" alt="alt">
                    </v-avatar>
                    <v-card-title>
                        Modifier le post 
                    </v-card-title >
                </div>
                
                <div class="post-content">
                    <v-text-field
                        prepend-icon="mdi-pen"
                        v-model="onePost.title">
                    </v-text-field>
                    <v-textarea
                        prepend-icon="mdi-pen"
                        v-model="onePost.content">
                    </v-textarea>
                    <div class="update-media">
                        <img width="25%" :src="onePost.media" alt="">
                        <v-file-input
                            v-model="media"
                            label="Changer de fichier">
                        </v-file-input>
                    </div>
                    <v-alert
                    outlined
                    type="success"
                    text
                    v-if=" update==true"
                    >
                    {{message}} 
                    </v-alert>
                </div>
                <v-divider></v-divider>
                <div class="post-footer">
                    <template>
                        <v-btn color="warning"
                        @click=" closePost()"
                        >Fermer</v-btn>
                        <v-btn color="success"
                        @click="editDataPost(onePost.media)"
                        > Valider</v-btn>
                    </template>
                </div>
                
        </v-card>
        <template v-slot:activator="{ on, attrs }">
            <v-icon   
            v-bind="attrs"
            v-on="on"
            class="icon"
           >
            mdi-playlist-edit
            </v-icon >Modifier
        </template>
           
    </v-dialog>
  
</template>

<script>
import axios from"axios"
import { mapState } from 'vuex';

export default {
    name : "EditPost",
    props:{
        idPost :Number,
    },
    data(){
        return {
            dialog: false,
            update:false,
            message:"",
            media:[],
            onePost:{
                id:"",
                title:"",
                content:"",
                media:[],
            },
        }
    } ,
   mounted () {
    this.idPost = this.getIdPost
    console.log("PROPSidPost et update",this.idPost,this.update)
    this.getPost()
           
   },
   watch: {
    update(newValue, oldValue){
     if(newValue, oldValue) 
     this.getPost() 
        setTimeout(() => {
         this.closePost()
        }, 1500)
    }
   },
   computed: {
       ...mapState(['user']),
       getIdPost (){
        return this.idPost
       }
   },
    methods: {
         getPost(){
          axios.get("http://localhost:3000/api/v1/post/"+this.idPost,{headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(res =>{
                this.onePost=res.data
            })
            .catch(err=>{
                console.log("err",err);
            })
         },
        editDataPost (media){
            //get user'id who wrote the post
            let id_users=this.onePost.id_users
            //on recuperer l'id du post a modifier
             this.idPost = this.getIdPost
            //on test si le media a ete changer ou pas pour ne pas envoyer un fichier vide 
            if(!this.media){
                this.media=media  
            }
            //on creer un formdata pour envoyer les données
            const updateDataPost = new FormData;
                updateDataPost.append('title', this.onePost.title),
                updateDataPost.append('content',this.onePost.content),
                updateDataPost.append('media', this.media),
                updateDataPost.append('id_users', id_users)

            console.log("post modifie pret a envoyer backend",updateDataPost,this.media)

             axios.put("http://localhost:3000/api/v1/post/"+this.idPost,updateDataPost,{headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response=>{
                this.update=true
                this.dialog=false
                this.message ='Votre commentaire a bien ete modifié'
                this.$emit('updateCmt',this.updateCmt=true)  
             console.log("post envoyé this.updateemit",this.updateCmt,response)
             })
             .catch(err =>{
                console.log(err);
             });
        },
        closePost(){
            this.dialog=false
            this.update=false
                
        }

    }
}
</script>
<style scoped>

.card{
  padding: 20px;
}

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
 .icon {
    cursor: pointer;
    background-color:lightcoral;
    border-radius: 50%;
    padding: 4px;
    margin: 5px;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.18);
    list-style-type : none;
    
    }
  .v-icon.v-icon {
        font-size: 20px;
        color: rgb(250, 237, 237);
        vertical-align: middle;   
    }
.update-media{
    display: flex;
}
.files-text {
color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
}
</style>