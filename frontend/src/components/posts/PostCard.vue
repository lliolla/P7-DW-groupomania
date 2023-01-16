<template>
    <div class="post-card" >
        <v-card 
        class="d-flex flex-column"
        v-for='post in posts'
        :key='post.id'>
            <div class="post-header"> 
                <div class="post-media">
                    <v-avatar
                        color="teal"
                        size="49"
                        class="mx-3">
                        <v-img
                        src="../../assets/images/avatar.jpg">
                        </v-img>
                    </v-avatar>
                    <div class="media-body">
                        <div class="user-title">
                            <p class="name">{{username}}</p>
                        </div>
                    <div class="media-time">
                        il y a 3 heures
                    </div>
                    </div>
                </div>
                <div class="post-dropdown">
                    <!-- box menu modifier supprimer -->
                    <template>
                        <div class="text-center">
                            <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    class ="dropdown-icon"
                                    color="red"
                                    icon
                                    v-bind="attrs"
                                    v-on="on">
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item d-flex flex-column>
                                    <v-list-item-title class="click-menu" @click="goToPost(post.id)">Modifier</v-list-item-title>
                                    <v-list-item-title class="click-menu" @click="delatePost()">Supprimer</v-list-item-title>
                                </v-list-item>    
                            </v-list>
                            </v-menu>
                            <v-dialog
                                v-model="dialog"
                                max-width="600px"
                                transition="dialog-transition">
                                <EditPost></EditPost>  
                            </v-dialog>
                        </div>
                        </template>
                       
                         
                    
                </div>
            </div> 
            <div class="post-body">
                <v-card-subtitle >
              Titre  {{post.title}} 
            </v-card-subtitle>
            <v-img 
            class="mb-3"
            height="225" 
            aspect-ratio="2"
            src="../../assets/images/home.jpg"
            ></v-img>
            <v-chip
            color="orange"
            >loisir</v-chip>
            <div >
                <v-icon class="blog-date"> mdi-calendar-month</v-icon>
                15 sept 2021
            </div>
            <v-card-text>
                {{post.content}}
                <a href="" @click="seePost()">Voir plus</a>
            </v-card-text>
            </div>   
            <!--  -->
            
            <v-divider></v-divider>
            <div class="blog-meta ">
                <ul class="d-flex flex-row d-flex justify-space-between ">
                    <li class="blog-like ">
                        <div >
                            <v-icon class="like-icon"
                            @click="postLike()">
                                mdi-thumb-up-outline
                            </v-icon>
                             {{like}}
                            <v-icon class="like-icon"
                            @click="postDislike()">
                                mdi-thumb-down-outline
                            </v-icon>
                            {{dislike}}
                        </div>
                    </li>
                    <li class="blog-comments">
                        <v-icon
                        class="like-icon">mdi-comment-text-outline</v-icon>
                        {{post.comments}}
                    </li>
                </ul> 
            </div>
        </v-card>
    </div>
</template>
<script>
import EditPost from '@/components/posts/EditPost.vue'
import { mapState } from 'vuex';

export default {
    name : "PostCard",
    components:{
       EditPost,
    },
    data: ()=>{
        return {
        dialog:"",
        like:"0",
        dislike:"0",
        comments:"10",
      
    }
    },
   
    methods: {
        goToPost(idPost){
            this.dialog = true
             localStorage.setItem('idPost',idPost)
        },
        delatePost(){
            console.log("delatePost");
        },
       seePost(){
           console.log("voir plus",); 
       },
        postLike(){
            this.like++

        },
        postDislike(){
          this.dislike++ 
        }

    },
    computed:{
      ...mapState(['posts'])
    },
    mounted (){
      this.username = localStorage.username;
      this.$store.dispatch('getAllPosts');
    }
   
}
</script>
<style scoped>

    .post-header{
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        padding: 5px 0px;
    }
    ul {
        padding: 10PX 0 0 0;
    }
    .like-icon {
    cursor: pointer;
    background-color:#FD2D01;
    border-radius: 50%;
    padding: 4px;
    margin: 5px;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.18)
    }
    .v-icon.v-icon {
        font-size: 20px;
        color: #FFD7D7;
        vertical-align: middle;   
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
    .click-menu{
        cursor: pointer;
    }

</style>
