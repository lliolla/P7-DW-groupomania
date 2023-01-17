<template>
  <div class="post-meta ">
       <ul class="d-flex flex-row justify-space-between pl-0">
             <li class="blog-like d-flex ">
                  <div >
                  
                   
                    <v-btn
                    :disabled="!liked"
                    class="icon"
                    icon>
                        <v-badge
                        bordered
                        offset-x="5"
                        offset-y="5"
                       >
                            <span slot="badge">  {{countLikes}} </span>  <!--slot can be any component-->
                            <v-icon
                            class=" white--text"
                            dark
                            @click="postLiked(idPost)">
                            mdi-thumb-up-outline</v-icon>
                        </v-badge>
                    </v-btn>
                 </div>
                  <div >
                     <v-btn
                     :disabled="!disliked"
                        class="icon"
                        icon>
                            <v-badge
                            bordered
                            offset-x="5"
                            offset-y="5">
                                <span slot="badge">  {{countdisLikes}} </span> <!--slot can be any component-->
                                <v-icon
                                class=" white--text"
                                dark
                                @click="postDislike(idPost)">
                                mdi-thumb-down-outline</v-icon>
                            </v-badge>
                     </v-btn>
                  </div>
             </li>
             <li class="blog-comments">
                <v-btn
                   class="icon"
                   icon>
                   <v-badge
                     bordered
                     offset-x="5"
                       offset-y="5">
                            <span slot="badge"> {{cmtLength}} </span>
                             <v-icon
                                class=" white--text"
                                @click="showCmt(idPost)">
                                mdi-comment-text-outline
                            </v-icon>
                    </v-badge>
                </v-btn>
             </li>
       </ul>
       <v-expand-transition>
     
            <div v-show="show">
                 <v-divider></v-divider>
                    <v-alert
                    type= "error"
                    v-if="err ==false"
                    >{{errMsg}}
                 </v-alert>
<!-- box create comment -->
                 <div class="createComment d-flex justify-center mt-2 mr-2">
                    <v-avatar
                        color="teal"
                        size="30"
                        class="mx-3">
                        <v-img
                        :src="user.media">
                        </v-img>
                    </v-avatar>
                    <v-textarea
                    counter="254"
                    ref="cmtContent"
                     clearable
                    clear-icon="mdi-close-circle"
                            outlined
                            rows="1"
                            auto-grow
                            label="Commentez ce post"
                            v-model="content"
                            :rules ="rulesContent">
                    </v-textarea>
                    <v-btn
                    class="mx-2 "
                    fab
                    dark
                    small
                     color="success"
                     @click="submitCom(idPost)">
                     <v-icon color="light-green lighten-4">mdi-email-arrow-right</v-icon>
                    </v-btn>
                 </div >
                 <v-timeline
                 class="d-flex"
                    align-top
                    dense
                    v-for='cmt in postCmts'
                    :key='cmt.id' >
                        <v-timeline-item class="timeline-1"  >
                                <template v-slot:icon>
                                    <v-avatar size="30" class="red lighten-3">
                                  <img :src=cmt.User.media>
                                    </v-avatar>
                                </template>
                                <v-card class="red lighten-5 cmt-card">
                                <v-card-title >
                                 <span class="card-title__span"><strong>{{cmt.User.username}}</strong>
                                     à répondu {{ dateDaysAgo(cmt.updatedAt)}}</span>
                                        </v-card-title>
                                        <v-card-text>
                                            {{cmt.content}}
                                        </v-card-text>
                                </v-card>
                        </v-timeline-item>
<!-- box menu modifier supprimer -->
                        <template  v-if="seeCmt == true ">
                            <EditCmt
                            :idCmt="cmt.id"
                            :idPost="idPost"
                            :updatedCmt='update'
                            @updated-cmt='setUpdate'
                            @menu-event ='setMenu'
                            ></EditCmt>
                        </template>
                 </v-timeline>
            </div>
       </v-expand-transition>
  </div>
</template>

<script>
import axios from "axios"
import { mapState } from 'vuex';
import EditCmt from'../cmts/EditCmt.vue'

var moment = require('moment')
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')

export default {
    name : "CmtsByUser",
    props :{
        idPost : Number,
        seeCmt:Boolean,
        
    },
    components :
    {
        EditCmt
    },
    data(){
        return{
            content:"",//form'S field comments
            postId:"",//form'S field  comments
            userId:"",//form'S field comments
            rulesContent:[
                v => !!v || 'Le contenu ne doit pas être vide',
                v => v && v.length <= 254 || 'Max 254 characters'
            ],
            errMsg :"",//error's field
            err :true,//error's field
            postCmts:[],
            show: false,
            update:false,
            liked:false,
            disliked:true,
            countLikes:"",
            countdisLikes:""
        }
    },
    watch:{
        update(newValue, oldValue){
          console.log("cmtbyuser newValue, oldValue",newValue, oldValue);
          if(newValue != oldValue) {
            this.showCmt(this.idPost)
            this.show=true
          }
        }

     },
     mounted () {
     this.getAllCmts(this.idPost)
   },
   created(idPost){
   
    let user=JSON.parse(localStorage.getItem('user'))
    let token = user.token
    // get count of likes for one post
    axios 
        .get("http://localhost:3000/api/v1/post/like/"+idPost ,{
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.countLikes = res.data;
          console.log("getLike",this.countLike);
        })
        .catch((err) => {
          console.log("err", err);
        })
    // get count of dislikes for one post
    axios 
        .get("http://localhost:3000/api/v1/post/dislike/"+idPost ,{
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.countdisLikes = res.data;
        })
        .catch((err) => {
          console.log("err", err);
        })
   },
    computed:{
        ...mapState(['user','posts']),
        cmtLength(){
            return this.postCmts.length
        },
      userPostLikedId (){
        return this.user.userId
      },
      likePost(){
        return this.postLike
      },
     

    },
   
    methods : {
        setUpdate(payload){
          this.update=payload
        },
        setMenu(payload){
          this.menu=payload
        },
        postLiked(idPost){
   
        const newLike = new FormData
            newLike.append('disliked',this.disliked=true),
            newLike.append('liked',this.liked=false),
            newLike.append('UserId',this.user.userId)
        
        //get token in storage and extract ID
            let user=JSON.parse(localStorage.getItem('user'))
            let token = user.token
            this.idPost=idPost
            console.log("userlike",newLike,idPost);
             axios.post("http://localhost:3000/api/v1/post/like/",+idPost,newLike,{headers: {Authorization: 'Bearer ' + token}})
                .then((res)=>{
                   console.log("likes ajouté",res.body) 
                })
                .catch(err =>{
                    if(err !== 200){
                    this.err = false
                    this.errMsg =err.response.data.error
                    }
                });

             },
        postDislike(idPost){

        this.liked=true
        this.disliked=false
    
        const newLike = new FormData;
            newLike.append('dislike',this.dislikes),
            newLike.append('IdPost',idPost)
         console.log("newLike",newLike);

            //POST -1
//post dislike: this.dislike +>requette POST
        },
     
        dateDaysAgo(date) {
                return moment(date).startOf('day').fromNow();
                },
        getAllCmts(idPost){
            
            //get token in storage and extract ID
            let user=JSON.parse(localStorage.getItem('user'))
            let token = user.token
            axios.get("http://localhost:3000/api/v1/cmt/post/"+ idPost,{headers: {Authorization: 'Bearer ' + token}})
                .then(res=> {this.postCmts = res.data})
                .catch(err=>{ console.log("err axios getPOstCmts",err); })
        },
        showCmt(idPost){
            this.show = !this.show
            this.getAllCmts(idPost)
        },
        submitCom(idPost){
        //get user connect and  his ID in local storage
            let user=JSON.parse(localStorage.getItem('user'))
            let userId=user.userId
        //get token in storage and extract ID
            let token=user.token
            console.log("token frontend",token);
        //get id of post who want create coments
                axios.post("http://localhost:3000/api/v1/cmt",{PostId:idPost,UserId:userId ,content:this.content},{headers: {Authorization: 'Bearer ' + token}})
                .then(()=>{
                    this.err = true
                    this.$refs.cmtContent.reset();
                    this.show= false
                    this.showCmt(idPost)
                })
                .catch(err =>{
                    if(err !== 200){
                    this.err = false
                    this.errMsg =err.response.data.error
                    }
                });
            },
        }
}

</script>

<style scoped>
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