<template>
    <div class="posts d-flex flex-column post-card justify-center">
 <h1>Mon mur</h1>
    <!-- btn create post -->
        <div class="create-post-btn">
                <CreatePost></CreatePost>  
        </div>
    <!-- box see forum -->
            <v-card 
                class="post-card"
                v-for='post in posts'
                :key='post.id'>
                <div class="post-header"> 
                    <div class="post-avatar">
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
                                <p class="name">{{user.username}} </p>
                            </div>
                        <div class="media-time">u
                        <P>Publié il y a {{post.updatedAt.slice(0,10).split('-').reverse().join('.')}} {{publishedDaysAgo}} jours </P> 
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
                                        color="red"
                                        icon
                                        v-if="!toggle"
                                        v-bind="attrs"
                                        v-on="on">
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item d-flex flex-column>
                                        <router-link :to="{name:'EditPost',params:{id:post.id}}"> <v-icon class="icon">mdi-playlist-edit</v-icon>Modifier</router-link>
                                    </v-list-item> 
                                    <v-list-item d-flex flex-column>
                                    <v-list-item-title
                                            class=" a"
                                            @click="toggleDropddown()" >
                                                <v-icon 
                                                class="icon" >mdi-close
                                                </v-icon>
                                            Supprimer
                                    </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                                
                                </v-menu>
                                <!-- box modal confirmation de supression -->
                                    <v-alert 
                                        :value="alert"
                                        type="warning"
                                        transition="scale-transition"
                                    >
                                        Etes-vous sûr de vouloir supprimer cet article?
                                        <div class="btn"> 
                                            <v-btn
                                            color="info"
                                            @click="delatePost(post.id)">
                                            Oui
                                            </v-btn>
                                            <v-btn
                                            color="info"
                                            @click="alert = false">
                                            Non
                                        </v-btn>
                                        </div>
                                    </v-alert>  
                            </div>
                        </template>
                    </div>
                </div> 
                <div class="post-body">
                    <v-card-subtitle >
                Titre  {{post.title}} {{post.id_users}}
                </v-card-subtitle>
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
                <p>le: {{post.updatedAt.slice(0,10).split('-').reverse().join('.')}} </p> 
                </div>
                <v-card-text>
                    {{post.content}} 
                    <a href="" @click="seePost()">Voir plus</a>
                </v-card-text>
                </div>   
                <v-divider></v-divider>
                <div class="blog-meta ">
                    <ul class="d-flex flex-row d-flex justify-space-between ">
                        <li class="blog-like ">
                            <div >
                                <v-icon class="icon"
                                @click="postLike()">
                                    mdi-thumb-up-outline
                                </v-icon>
                                {{like}}
                            
                            </div>
                        </li>
                        <li class="blog-comments">
                            <v-icon
                            class="icon">mdi-comment-text-outline</v-icon>
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
import CreatePost from '@/components/posts/CreatePost.vue';
import { mapState } from 'vuex';
import axios from 'axios';

export default {
    name : "AllPosts",
    components:{
            CreatePost,
    },
    data: ()=>{
        return {
        dialog:"",
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
     
      publishedDaysAgo (){
          let dateNow = "date :publie depuis"
   
          return dateNow
      }
     },
    methods: {
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
    .post-card{
        margin:15px 5px;
        padding:  px;
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
    padding: 6px;
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
    .a {
  color: #1976d2;
  cursor: pointer;
  text-decoration: underline;


}
    .v-menu__content {
    margin: 10px;
    }
    .btn{
        display: flex;
        justify-content: space-between;
        margin-bottom: 0px;
    }
    .click-menu{
        cursor: pointer;
    }

</style>