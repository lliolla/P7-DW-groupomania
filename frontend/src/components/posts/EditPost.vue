<template>

    <div class="edit-post" width="70%">
        <div class="card-overlay">
        </div>
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
                            ref="media"
                            label="Changer de fichier">
                        </v-file-input>
                    </div>

                </div>
                <v-divider></v-divider>
                <div class="post-footer">
                    <template>

                        <v-btn color="warning"
                        @click="closePost()"
                        >Fermer</v-btn>

                        <v-btn color="success"
                        @click="editDataPost(onePost.media)"
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
    name : "EditPost",
    props:['id'],
    components: {},
    data(){
        return {
            dialog :"false",
            media:"",
            onePost:{
                id:"",
                title:"",
                content:"",
                media:"",
            },
        }
    } ,
   mounted () {
    this.idPost = this.$route.params.id
    console.log("this.idPost",this.idPost);
           axios.get("http://localhost:3000/api/v1/post/"+this.idPost,{headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(res =>{
                this.onePost=res.data
            })
            .catch(err=>{
                console.log("err",err);
            })
   },
   computed: {
       ...mapState(['user']),
   },
    methods: {
        editDataPost (media){
            //on recupere le user qui a ecrit le post
            let id_users=this.onePost.id_users
            //on recuperer l'id du post a modifier
            this.idPost = this.$route.params.id
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
             console.log("post envoyé",response)
               this.dialog=false
                this.$router.push({ name: 'Wall'})
             })
             .catch(err =>{
                console.log(err);
             });
        },
        closePost(){
            this.$router.push({ name: 'Wall'})
        }

    }
}
</script>
<style scoped>
.edit-post{
    position: fixed;
/* on prend tt l'espace dispo ds la navigateur */
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  
/* on centre le modal en X et Y */
    display: flex;
    justify-content: center;
    align-items: center;

}
.card-overlay{
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;


}
.card{
  position: fixed;
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
.v-icon.v-icon{
    font-size:27px;
    padding-left: 20px;
}
.update-media{
    display: flex;
}
.files-text {
color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
}
</style>