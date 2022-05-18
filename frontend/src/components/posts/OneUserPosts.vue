<template>
    <div class="posts">
        
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
                        src="https://picsum.photos/id/237/200/300">
                        </v-img>
                    </v-avatar>
                    <div class="media-body">
                        <div class="user-title">
                            <p class="name">username {{ post.User.username}}  </p>
                        </div>
                    <div class="media-time">
                    <P>Publié il y a {{post.updatedAt.slice(0,10).split('-').reverse().join('.')}} jours </P> 
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
                                    <router-link :to="{name:'EditPost',params:{id:post.id}}"> <v-icon>mdi-update</v-icon>Modifier</router-link>

                                    <!-- <v-list-item-title class="click-menu" @click="updatePost(post.id)">Modifier</v-list-item-title> -->
                                    
                                    <v-list-item-title class="click-menu" @click="delatePost(post.id)"><v-icon>mdi-close</v-icon>Supprimer</v-list-item-title>
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
             <p>le: {{post.updatedAt.slice(0,10).split('-').reverse().join('.')}} </p> 
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
import { mapState } from 'vuex';
import axios from "axios"

export default {
    name : "MyPosts",
   
    data: ()=>{
        return {
        dialog:"",
        like:"0",
        dislike:"0",
        comments:"10",
        userConnectId:JSON.parse(localStorage.getItem('user')).userId,
        userPosts:[]
        
        
        //todo : ramener l'image avatar des quue multer ok
        
    }
    },
    mounted (){
    //récupèrer tous les posts pour un user

    //on récupère le token ds le storage et on extrait l'ID
    let user=JSON.parse(localStorage.getItem('user')) 
    let token = user.token
    // on récupere l'id du user connecté
    let userConnect = JSON.parse(localStorage.getItem('user')) 
    let userConnectId =userConnect.userId
    console.log("userConnectId",userConnectId);
        axios.get("http://localhost:3000/api/v1/post/user/" + userConnectId,{headers: {Authorization: 'Bearer ' + token}}) 
            .then(res=>{ this.userPosts =res.data
        })
            .catch(err=>{ console.log("err",err); })
        },
     computed:{
      ...mapState(['user']),
     },
    methods: {
        updatePost(idPost){
            this.dialog = false
            localStorage.setItem('idPost',idPost)
            let id = localStorage.getItem('idPost')
            console.log('recuperer idpost pour modif post',id)
           this.$router.push({name:'EditPost', params: {id: id}})
        },
        delatePost(idpost){
        //on récupère le token ds le storage et on extrait l'ID
        let user=JSON.parse(localStorage.getItem('user')) 
        let token=user.token
        // on recupere l'id du post
        localStorage.setItem('idpost',idpost)
        let idPost = localStorage.getItem('idpost')
        console.log("post a supprimer",idPost,token)

        // afficher un message de confirmationde supression qui devclanche le delate
            axios.delete("http://localhost:3000/api/v1/post/"+ idPost,{headers: {Authorization: 'Bearer ' + token}})
            .then(response=>{ console.log("post suprimé",response)})
            .catch(err=>{console.log("err",err)})
            this.$router.go()
        },
       seePost(){
           console.log("voir plus"); 
       },
        postLike(){
            this.like++
        },
        
    },
   
    
   
}
</script>

<style scoped>
.posts{
  background-color:  rgb(226, 225, 223);
 
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
    .like-icon {
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
     
    .v-icon.v-icon {
        font-size: 20px;
        color: rgb(250, 237, 237);
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