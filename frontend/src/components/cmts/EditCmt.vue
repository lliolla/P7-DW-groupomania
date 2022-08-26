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
                    v-if=" closeMessage==true">
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
        idCmt :String,
    },
    data(){
        return {
            dialog: false,
            closeMessage:false,
            message:"",
            media:"",
            oneCmt:{
                id:"",         
                content:"",
            },
        }
    } ,
    watch:{
        closeMessage(newcloseMessage,oldcloseMessage){
            if(newcloseMessage != oldcloseMessage)
            console.log('watchuCloseMessage',newcloseMessage,oldcloseMessage);
            this.message ='Votre commentaire a bien ete modifié'
            setTimeout(() => {
            this.closeMessage = false
            this.closePost()
            console.log("Retardée d'une seconde = closeMessage", this.closeMessage);
            }, 1000)
        }
        
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
    
            //get comment's id
            
            //on creer un formdata pour envoyer les données
            const updateDataCmt = new FormData;
            updateDataCmt.append('content',this.oneCmt.content),
         
            axios.put("http://localhost:3000/api/v1/post/"+idCmt,updateDataCmt,{headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response=>{
             console.log("cmt envoyé",response,this.dialog)
           this.closeMessage = true
              })
              .catch(err =>{
                console.log(err);
             });
         },

        closePost(){
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