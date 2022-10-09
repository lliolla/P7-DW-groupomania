<template>
    <div class="posts ">
        <h1 class="d-flex justify-center my-8">Mon mur</h1>
         <!-- btn create post -->
        <v-row justify="center">
                <CreatePost></CreatePost>  
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
                        <p>Publié {{publishedDaysAgo(post.updatedAt)}}</p> 
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
                <v-chip
                color="orange"
                >loisir</v-chip>
                <div >
                    <v-icon class="blog-date"> mdi-calendar-month</v-icon>
                </div>
              
                    {{post.content}} 
                    <a href="" @click="seePost()">Voir plus</a>
                </v-card-text>
                </div>   
                <v-divider></v-divider>
                <CmtsByUser
                :idPost="post.id" 
                @update-cmt="setUpdate">
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
        updateCmt:false,
        like:"0",
        dislike:"0",
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
    methods: {
        publishedDaysAgo (date){
        return moment(date).startOf('day').fromNow();
         
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
         console.log("POst supprimé",idpost);
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
        postLike(){
            this.like++
        },
        
    },
   
    mounted (){
     // get allposts and dispaly them 
      this.$store.dispatch('getAllPosts');
     
    }
   
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
    ul {
        padding: 10PX 0 0 0;
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