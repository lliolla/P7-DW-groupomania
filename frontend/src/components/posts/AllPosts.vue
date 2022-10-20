<template>
    <div class="posts ">
        <h1 class="d-flex justify-center my-8">Mon mur</h1>
         <!-- btn create post -->
        <v-row justify="center">
                <CreatePost @post-created='setPost'></CreatePost>
        </v-row>
        <v-row justify="center">
            
    <!-- box see forum -->
            <v-card
                class="d-flex flex-column post-card"
                v-for='post in posts'
                :key='post.id'>
                <div class="post-header">
                    <div class="post-media">
                        <v-avatar
                            size="49"
                            class="mx-3">
                            <v-img :src="post.User.media">
                            </v-img>
                        </v-avatar>
                        <div class="media-body">
                            <div class="user-title">
                                <p class="name">{{post.User.username}} </p>
                            </div>

                        <div class="media-time">
                        <p>Publié le  {{publishedDaysAgo(post.updatedAt)}}</p>
                        </div>
                        </div>
                    </div>
                    <div class="post-dropdown">
            <!-- box menu modifier supprimer -->

                    </div>
                </div>
                <div class="post-body">
                    <v-card-subtitle >
                {{post.title}} {{post.id_users}}
                </v-card-subtitle>
                  <v-card-text>
                <v-img
                v-if ="post.media"
                class="mb-3"
                height="225"
                aspect-ratio="2"
                :src="post.media"
                ></v-img>
                 <v-divider class="pa-2"></v-divider>
                <v-chip
                color="orange"
                class="mr-2"
                
                >loisir</v-chip> <br />
                    {{post.content}} <br />
                    <a href="" @click="seePost()">Voir plus</a>
                </v-card-text>
                   <v-divider></v-divider>
                </div>

                <CmtsByUser
                  v-bind:idPost="post.id"
                 v-bind:likes="post.likes"
                v-bind:dislikes="post.dislikes"
                 @update-cmt="setPost">
                </CmtsByUser>
            </v-card>
        </v-row>
    <!-- box pagination -->
        <div class="Post-pagination text-center">
        <v-container>
            <v-row justify="center">
            <v-col cols="8">
                <v-container class="max-width">
                <v-pagination
                    class="my-4"
                    :length="10"
                ></v-pagination>
                </v-container>
            </v-col>
            </v-row>
        </v-container>
        </div>
    </div>
</template>
<script>
import CreatePost from '@/components/posts/CreatePost.vue';
import CmtsByUser from'../cmts/CmtsByUser.vue'
import { mapState } from 'vuex';
import axios from 'axios'

var moment = require('moment')
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')


export default {
    name : "AllPosts",
    components:{
            CreatePost,
            CmtsByUser
    },
    data: ()=>{
        return {
        dialog: false,
        update:false,
        updateCmt:false,
        comments:"10",
        open:false,
        alert: false,//alerte pour confirmer la suppression d'un post
        toggle :false,//faire disparaitre le btn des modif une fois l'alert de suppression lancer et le faire rapararitree a la fermeture
        //todo : ramener l'image avatar des quue multer ok

        }
    },
     computed:{
      ...mapState(['posts','user']),
     },
     watch:{
        update(newValue, oldValue){
          console.log("newValue, oldValue",newValue, oldValue);
          if(newValue != oldValue) {
             this.$store.dispatch('getAllPosts')
             setTimeout(()=>{this.update=false},1500)
          }}},

    mounted (){
     // get allposts and dispaly them
      this.$store.dispatch('getAllPosts');
    },
    methods: {
         setPost(payload){
          this.update=payload
          console.log("payload",this.update);
        },
        publishedDaysAgo (date){
           // let now = moment().moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
            let creatDate =moment(date).format("dddd D MMMM YYYY à HH mm"); 
          
         return creatDate;

      },
        updatePost(idPost){
            this.dialog = true
            localStorage.setItem('idPost',idPost)
            let id = localStorage.getItem('idPost')
           this.$router.push({name:'EditPost', params: {id: id}})
        },
        toggleDropddown(){
            this.alert = true
            this.toggle= true
        },

        delatePost(idpost){
         console.log("Post supprimé",idpost);
            axios.delete("http://localhost:3000/api/v1/post/"+idpost,{headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(res=>{ console.log("post supprimé res",res.data)})
                .catch(err=>{ console.log("err",err); })
                this.alert= false
                this.toggle= true
                this.$router.go()
        },
       seePost(){
           console.log("voir plus");
       },
       

    },



}
</script>

<style scoped>
    .posts{
    background-color:  rgb(226, 225, 223);
    }
    posts-btn__create{
     position: absolute;
     left:50px;
    }
    .post-card{
         width: 70%;
        margin:15px 5px;
        padding:  5px;
    }
    .post-header{
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        padding: 5px 0px;
    }

    .icon {
    cursor: pointer;
    background-color:#f08080;
    border-radius: 50%;
    padding: 6px;
    margin: 5px;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.18);
    list-style-type : none;

    }
    .blog-like, .blog-comments {
        list-style-type : none;
        margin: 5px;
    }

     .v-btn > .v-btn__content{
        font-size: 20px;
        color: rgb(250, 237, 237);
        vertical-align: middle;
    }
    .v-icon{
        font-size: 20px;
        color: rgb(250, 237, 237);
        vertical-align: middle;
    }
    .icon {
    cursor: pointer;
    background-color:lightcoral;
    border-radius: 50%;
    padding: 6px;
    margin: 5px;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.18);
    list-style-type : none;

    }
    .post-media{
    display: flex;
    flex-direction: row;
    }
    .media.body{
    padding: 5px 0px;
    }

    .user-title .name{
        font-weight: 700;
        margin-bottom: 3px;
    }
    .media-time{
    color: #9e9faf;
    font-size: 12px;
    }
    .v-btn > .v-btn__content .v-icon{
        color: black;
    }
    .a {
  color: #1976d2;
  cursor: pointer;
  text-decoration: underline;
}
 .blog-date{
    display: flex;
    flex-direction: row;
    align-items: center;
    }

    .click-menu{
        cursor: pointer;
    }

</style>