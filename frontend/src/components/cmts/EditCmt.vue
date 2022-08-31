<template>
    <v-dialog 
        transition="dialog-transition"
        max-width="600px"
        v-model="dialog"
    >
        <v-card
        class="card ">
                <div class="post-content">
                    <v-textarea
                        label="Modifier le commentaire"
                        prepend-icon="mdi-pen"
                        v-model="oneCmt.content">
                    </v-textarea>
                </div>
                <v-alert
                    outlined
                    type="success"
                    text
                    v-if="closeCmt==true">
                    {{message}} 
                    </v-alert>
                <v-divider></v-divider>
                <div class="post-footer">
                    <template>

                        <v-btn color="warning"
                        @click=" closePost()"
                        >Fermer</v-btn>

                        <v-btn color="success"
                        @click=" updateCmt(idCmt)"
                        >Envoyer</v-btn>
                    </template>
                </div>
        </v-card>
        <template v-slot:activator="{ on, attrs }">
            <v-icon   
            v-bind="attrs"
            v-on="on"
            class="icon">
            mdi-playlist-edit
            </v-icon >Modifier
        </template>   
    </v-dialog>
</template>

<script>
 import axios from"axios"

export default {
    name : "EditCmt",
    props:{
        idCmt: Number,
    },
    data(){
        return {
            dialog: false,
            closeCmt:false,
            update:false,
            message:"",
            media:"",
            oneCmt:{
                id:"",         
                content:"",
            },
        }
    } ,
    watch:{
        closeCmt(newcloseCmt,oldcloseCmt){
            if(newcloseCmt != oldcloseCmt)
            this.message ='Votre commentaire a bien ete modifié'
            setTimeout(() => {
            this.closeCmt = false
            this.closePostDialog()
            }, 1000)
        },
    },
    mounted () {
         this.getCmts() 
    
    },
    methods: {
        getCmts(){
            axios.get("http://localhost:3000/api/v1/cmt/"+this.idCmt,{headers: {Authorization: 'Bearer ' + localStorage.token}})
             .then(res =>{
                this.oneCmt=res.data
            })
            .catch(err=>{
                console.log("err",err);
            })
        },
        updateCmt(idCmt){
            // let idPost=this.oneCmt.id_posts
            // let idUsers=this.oneCmt.id_users
            let content =this.oneCmt.content
           
            // const updateDataCmt = new FormData;
                // updateDataCmt.append('content',content),
                // updateDataCmt.append('id_users',idUsers),
                // updateDataCmt.append('id_posts',idPost),
            console.log('updateDataCmt',idCmt,content);
            axios.put("http://localhost:3000/api/v1/cmt/"+idCmt,content,{headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response=>{
                this.closeCmt = true
                this.update = true
              console.log("cmt envoyé update=",this.update,response.data)
             this.$emit('update-cmt',this.update)
             })
             .catch(err =>{
                console.log(err);
             });
         },
         
        closePostDialog(){
               this.dialog=false
        }

    }
}
</script>
<style scoped>

.card{
  padding: 20px;
}

.post-footer{
    margin: 15px 0px;
    padding: 5px 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.post-media{
    display: flex;

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
  .v-icon.v-icon {
        font-size: 20px;
        color: rgb(250, 237, 237);
        vertical-align: middle;   
    }

</style>