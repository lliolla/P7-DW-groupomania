<template>
    <div class="posts">
         <h1 class="d-flex justify-center my-8" >Mes publications</h1>
        <v-row justify="center">
             <!-- box see My Posts -->
            <v-card
                class="d-flex flex-column post-card"
                v-for='post in posts'
                :key='post.id'>
                <div class="post-header">
                    <div class="post-media">
                        <v-avatar
                            color="teal"
                            size="49"
                            class="mx-3">
                            <v-img
                  
                            :src="user.media">
                            </v-img>
                        </v-avatar>
                        <div class="media-body">
                            <div class="user-title">
                                <p class="name text-capitalize">{{ user.username}}  </p>
                            </div>
                        <div class="media-time">
                        <p>Publié {{ dateDaysAgo(post.updatedAt)}}</p>
                        </div>
                        </div>
                    </div>
                    <div class="post-dropdown">
<!-- box menu modifier supprimer -->
                        <template>
                            <div class="text-center">
                               
                                        <template>
                                            <EditPost 
                                            :idPost=post.id
                                           :updatedPost='update'
                                             @updated-post='setUpdate'
                                             @msg-event='setMsg'
                                             @menu-event='setMenu'
                                            ></EditPost>
                                        </template>
                                   
                            </div>
                        </template>
                    </div>
                </div>
                <div class="post-body">
                    <v-card-subtitle >
                  <h3 class="text-capitalize">{{post.title}}</h3>  
                    </v-card-subtitle>
                    <v-img
                    v-if="post.media "
                    contain
                    class="mb-3 img-fit "
                    height="225"
                    :src="post.media"
                    ></v-img>
                    <v-card-text  >
                    
                   <p class="text-capitalize" > {{post.content}} </p>
                    <a href="" @click="seePost()">Voir plus</a> <br />
                    <v-chip
                    class="my-2"
                    color="orange">
                    loisir</v-chip>
                </v-card-text>
                </div>
                <v-divider></v-divider>
                <CmtsByUser
                :idPost="post.id"
                :seeCmt="true" >
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
                    :length="5"
                ></v-pagination>
                </v-container>
            </v-col>
            </v-row>
        </v-container>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';

import EditPost from'../posts/EditPost.vue'
import CmtsByUser from'../cmts/CmtsByUser.vue'

var moment = require('moment')
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')

export default {
    name : "MyPosts",
    components :{
        EditPost,
        CmtsByUser
    },
    data: ()=>{
        return {
        dialog: false,
        menu:false,
       update:false,
      
        message:"",
        userConnectId:JSON.parse(localStorage.getItem('user')).userId,
        userPosts:{},
    }
    },
    watch:{
        update(newValue,oldValue){
          console.log("update newValue, oldValue",newValue, oldValue)
           this.$store.dispatch('getAllPosts')
        },
    },
    mounted (){
     this.$store.dispatch('getAllPosts')
    },
    computed:{
      ...mapState(['user','posts']),
     },
    methods: {
        setUpdate(payload){
          this.update=payload
         console.log('setUpdate payload',this.update)
        },
         setMenu(payload){
          this.menu=payload 
        },
        setMsg(payload){
        this.message=payload
         console.log('setMsg payload',this.message)
        },
        dateDaysAgo(date) {
            return moment(date).startOf('day').fromNow();
        },
       
      
       seePost(){
           console.log("voir plus");
       },
        
    },
}
</script>

<style >

    .post-card{
        width: 70%;
        margin:15px 5px;
        padding:  5px;
    }
    .img-fit{
        object-fit: scale-down;
        
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
    background-color:lightcoral;
    border-radius: 50%;
    padding: 4px;
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
  .v-icon.v-icon{
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