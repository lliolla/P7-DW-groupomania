<template>
  <div class="post-meta ">
       <ul class="d-flex flex-row d-flex justify-space-between ">
             <li class="blog-like ">
                            <div >
                                <v-btn
                                class="icon"
                                icon>
                                    <v-badge
                                    bordered
                                    offset-x="5"
                                    offset-y="5">
                                        <span slot="badge">  {{like}} </span> <!--slot can be any component-->
                                        <v-icon
                                        class=" white--text"
                                        dark
                                        @click="postLike()">
                                        mdi-thumb-up-outline</v-icon>
                                    </v-badge>
                            </v-btn>
                            </div>
             </li>
             <li class="blog-comments">
                            id du post {{idPost}}
                            <v-btn
                            class="icon"
                            icon>
                                <v-badge
                                bordered
                                offset-x="5"
                                offset-y="5">
                                    <span slot="badge"> {{postCmts.length}} </span> <!--TODO mettre la loguer de tableaux de commentaires-->
                                    <v-icon
                                    class=" white--text"
                                    @click.self="showCmt(idPost)">
                                    mdi-comment-text-outline</v-icon>
                                </v-badge>
                            </v-btn>
                             <!-- <p> {{userPosts.comments}}</p>  -->
             </li>
       </ul>
       <v-expand-transition>
            <div v-show="show">
                 <v-divider></v-divider>
                 <v-timeline
                 class="d-flex"
                    align-top
                    dense
                    v-for='cmt in postCmts'
                    :key='cmt.id' >
                        <v-timeline-item class="timeline-1"  >
                                <template v-slot:icon>
                                            <v-avatar size="30" class="red lighten-3">
                                            <img :src=cmt.User.avatar>
                                            </v-avatar>
                                </template>
                                <v-card class="red lighten-5 cmt-card">
                                        <v-card-title >
                                    <!-- todo recupere le nom du user qui a ecrit le post -->
                                    {{cmt.User.username}} <span class="card-title__span">à répondu {{ dateDaysAgo(cmt.updatedAt)}}</span>
                                        </v-card-title>
                                        <v-card-text>
                                            {{cmt.content}}
                                        </v-card-text>
                                        <!-- box menu modifier supprimer -->
                                </v-card> 
                        </v-timeline-item>
                        <template  >
                             <div >
                                                <v-menu offset-y>
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
                                                            <!-- <EditPost :idPost=post.id></EditPost> -->
                                                        </template>
                                                        </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item d-flex flex-column>
                                                    <v-list-item-title class="a" @click="delateCmt()"><v-icon class="icon" >mdi-close</v-icon>Supprimer</v-list-item-title>
                                                </v-list-item>
                                                </v-list>
                                                </v-menu>
                              </div>
                        </template> 
                
                 </v-timeline>
                 <v-divider></v-divider>
                <div class="createComment d-flex justify-center mt-2 mr-2">
                    <v-avatar
                        color="teal"
                        size="30"
                        class="mx-3">
                        <v-img
                        :src="user.avatar">
                        </v-img>
                    </v-avatar>
                    <v-textarea
                            outlined
                            rows="1"
                            auto-grow
                            label="Commentez ce post"
                            v-model="content">
                    </v-textarea>
                    <v-btn
                    class="send-Cmt_Btn"
                     color="success"
                     @click="submitCom(idPost)">
                     Envoyer
                    </v-btn>
                </div >
            </div>
       </v-expand-transition>
  </div>
</template>

<script>
import axios from "axios"
import { mapState } from 'vuex';

var moment = require('moment')
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')

export default {
name : "CmtsByUser",
props :{
    idPost : Number
},
data(){
    return{
        content:"",//form'S field comments
        postId:"",//form'S field  comments
        userId:"",//form'S field comments
        postCmts:[],
        show: false,
        like:"0",
        dislike:"0",
    }
},
computed:{
      ...mapState(['user']),
     },
methods : {
postLike(){
this.like++
},
dateDaysAgo(date) {
        return moment(date).startOf('day').fromNow();
        },
showCmt(idPost){
    this.show = !this.show
    this.$router.go
    //Get all posts's cmts
    //get token in storage and extract ID
    let user=JSON.parse(localStorage.getItem('user'))
    let token = user.token
    axios.get("http://localhost:3000/api/v1/cmt/post/"+ idPost,{headers: {Authorization: 'Bearer ' + token}})
        .then(res=> {this.postCmts = res.data})
        .catch(err=>{ console.log("err axios getPOstCmts",err); })
        },

submitCom(idPost){
//get user connect and  his ID in local storage
     let user=JSON.parse(localStorage.getItem('user'))
     let userId=user.userId
//get token in storage and extract ID
     let token=user.token
//get id of post who want create coments
console.log('idPost',idPost,userId,this.content);
//create form to send comment datas
    //   const newDataCmt = new FormData();
    //   newDataCmt.append('id_posts',idPost)
    //   newDataCmt.append('id_users',userId)
    //   newDataCmt.append('content',this.content)
     console.log('submitCom')
         axios.post("http://localhost:3000/api/v1/cmt",{id_posts:idPost,id_users:userId ,content:this.content},{headers: {Authorization: 'Bearer ' + token}})
         .then(response=>{
            console.log("nouveau com créer",response)
            document.location.reload();
         })
         .catch(err =>{
            console.log(err);
         });

    },
}

}

</script>

<style>
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
    .v-btn > .v-btn__content .v-icon{
    color: black;
    }
    .v-card__title {
        font-size: 15px;
    }
    .card-title__span{
       color: #9e9faf;
       font-size: 12px;
    }
    .send-Cmt_Btn{
     margin: 0px 5px;
    }
    .v-timeline-item{
       width: 90%;
    }
    div.v-timeline:nth-child(2) > div:nth-child(2) {
    margin-left: 5px;
}

 

</style>