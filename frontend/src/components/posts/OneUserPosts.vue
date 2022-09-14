<template>
    <div class="posts">
         <h1 class="d-flex justify-center my-8" >Mes publications</h1>
        <v-row justify="center">
             <!-- box see My Posts -->
            <v-card
                class="d-flex flex-column post-card"
                v-for='post in userPosts'
                :key='post.id'>
                <div class="post-header">
                    <div class="post-media">
                        <v-avatar
                            color="teal"
                            size="49"
                            class="mx-3">
                            <v-img
                            :src="user.avatar">
                            </v-img>
                        </v-avatar>
                        <div class="media-body">
                            <div class="user-title">
                                <p class="name">username {{ user.username}}  </p>
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
                                <v-menu 
                                offset-y
                                > 
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        class ="dropdown-icon icon"
                                        icon
                                        v-bind="attrs"
                                        v-on="on">
                                        <v-icon 
                                            class=" white--text">
                                            mdi-dots-vertical
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item d-flex flex-column>
                                    <v-list-item-title class="a">
                                        <template>
                                            <EditPost :idPost=post.id
                                            @update-cmt="setUpdate"></EditPost>
                                        </template>
                                    </v-list-item-title>
                                    </v-list-item>
                                    <v-list-item d-flex flex-column>
                                        <v-list-item-title class="a" >
                                            <v-icon class="icon" @click="delatePost(post.id)">
                                                mdi-close</v-icon>
                                                Supprimer
                                                </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                                </v-menu>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="post-body">
                    <v-card-subtitle >
                    Titre  {{post.title}}
                    </v-card-subtitle>
                    <v-img
                    v-if="post.media "
                    class="mb-3"
                    height="225"
                    aspect-ratio="2"
                    :src="post.media"
                    ></v-img>
                    <v-card-text  >
                    <v-chip
                    class="my-2"
                    color="orange">
                    loisir</v-chip>
                   <p > {{post.content}} </p>
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
import axios from "axios"
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
        updateCmt:false,
        userConnectId:JSON.parse(localStorage.getItem('user')).userId,
        userPosts:{
        },
     
    }
    },
    watch:{
        updateCmt(newValue){
           console.log("newValue",newValue);
        }
    },
    mounted (){
    this.getAllCmts()
    console.log("monted ComponentParent update",this.updateCmt)
        },
        
    computed:{
      ...mapState(['user']),
     },
    methods: {

        setUpdate(updateCmt){
          this.updateCmt=updateCmt 
         console.log('setUpdate payload',this.updateCmt)

        },
        dateDaysAgo(date) {
            return moment(date).startOf('day').fromNow();
        },
        getAllCmts(){
            //Get all user's posts
            //get token in storage and extract ID
            let user=JSON.parse(localStorage.getItem('user'))
            let token = user.token
            // get user conected
            let userConnect = JSON.parse(localStorage.getItem('user'))
            let userConnectId =userConnect.userId
            console.log("userConnectId",userConnectId,"closeCmt");
                axios.get("http://localhost:3000/api/v1/post/user/" + userConnectId,{headers: {Authorization: 'Bearer ' + token}})
                    .then(res=>{ this.userPosts =res.data
                })
                    .catch(err=>{ console.log("err axios getouneuser",err); })
        },
        updatePost(idPost){
            this.dialog = false
            console.log('dialog',this.dialog);
            localStorage.setItem('idPost',idPost)
            let id = localStorage.getItem('idPost')
            console.log('recuperer idpost pour modif post',id)
            this.$router.push({name:'EditPost', params: {id: id}})
        },
        delatePost(idpost){
       //get token in storage and extract ID
        let user=JSON.parse(localStorage.getItem('user'))
        let token=user.token
        // get post's ID
        localStorage.setItem('idpost',idpost)
        let idPost = localStorage.getItem('idpost')
        console.log("post a supprimer",idPost,token)

        // afficher un message de confirmation de supression qui declanche le delate
            axios.delete("http://localhost:3000/api/v1/post/"+ idPost,{headers: {Authorization: 'Bearer ' + token}})
            .then(response=> { 
               
                console.log("post suprimé",response)})
            .catch(err=>{console.log("err",err)})
            this.$router.go()
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