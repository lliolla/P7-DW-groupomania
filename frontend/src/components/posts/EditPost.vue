<template>
    <v-dialog 
        transition="dialog-transition"
        max-width="600px"
        v-model="dialog"
    >
        <v-card
            class="card ">
                <div class="post-title d-flex justify-space-around align-center">
                    <v-card-title
                     class="mx-auto">
                        Modifier l'article
                    </v-card-title >
                    <v-btn
                        class="post-btn ml-8"
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
                
                <div class="post-content">
                    <v-text-field
                        prepend-icon="mdi-pen"
                        v-model="onePost.title">
                    </v-text-field>
                    <v-textarea
                    :rules ="rulesContent"
                       counter="254" 
                        prepend-icon="mdi-pen"
                        v-model="onePost.content">
                    </v-textarea>
                    <div
                  
                    class="update-media">
                        <img width="25%" :src="onePost.media" alt=""  >
                        <v-file-input
                            v-model="media"
                            label="Changer de fichier">
                        </v-file-input>
                    </div>
                </div>
                <v-divider></v-divider>
                <div class="post-footer">
                    <template>
                        <v-btn 
                        block
                        color="success"
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
            rulesContent:[
                v => !!v || 'Le contenu ne doit pas être vide',
                v => v && v.length <= 254 || 'Max 254 characters'
            ],
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
    this.getPost()
           
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
            .then(()=>{
                this.$emit('update-cmt',this.update= !this.update)
                this.$emit('menu-event',this.menu=false)
                this.dialog=false
                // this.message ='Votre commentaire a bien ete modifié'
             console.log("post envoyé this.updateemit",this.menu,this.update)
             })
             .catch(err =>{
                console.log(err);
             });
        },
        closePost(){
            this.dialog=false
            this.$emit('menu-event',this.menu=false)
                
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