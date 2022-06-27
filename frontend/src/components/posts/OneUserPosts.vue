<template>
    <div class="posts">
        <h1>Mes publications</h1>
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
                        src="user.avatar">
                        </v-img>
                    </v-avatar>
                    <div class="media-body">
                        <div class="user-title">
                            <p class="name">username {{ user.username}}  </p>
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
                                    class ="dropdown-icon icon"
                                    icon
                                    v-if="!toggle"
                                    v-bind="attrs"
                                    v-on="on">
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item d-flex flex-column>
                                   <v-list-item-title class="a">
                                    <template>
                                            <v-dialog
                                            v-model="dialog"
                                            persistent
                                            max-width="600px">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-icon   
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    class="icon">
                                                    mdi-playlist-edit
                                                    </v-icon >Modifier
                                                </template>
                                            <EditPost :iduser=post.id></EditPost>
                                            </v-dialog>
                                    </template>
                                    </v-list-item-title> 
                               </v-list-item> 
                              <v-list-item d-flex flex-column>
                                  <v-list-item-title class="a" @click="delatePost(post.id)"><v-icon class="icon" >mdi-close</v-icon>Supprimer</v-list-item-title>
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
import { mapState } from 'vuex';
import axios from "axios"
import EditPost from'../posts/EditPost.vue'

export default {
    name : "MyPosts",
    components :{
        EditPost,
    },
    data: ()=>{
        return {
        iduser:"",
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
            .catch(err=>{ console.log("err axios get oune user",err); })
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
     
    .v-icon.v-icon {
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

    .click-menu{
        cursor: pointer;
    }

</style>