
<template >
    <v-menu 
        offset-y 
        v-model="menu"
       :close-on-content-click="false"  
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
                    <v-dialog 
                        transition="dialog-transition"
                        max-width="600px"
                        v-model="dialog">
                        <v-card
                        class="card ">
                            <div class="post-content">
                                <v-textarea
                                    ref=upContent
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
                                        <v-btn 
                                        color="warning"
                                        @click=" closeDialog()"
                                        >Fermer</v-btn>
                                        <v-btn 
                                        color="success"
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
                </v-list-item-title>
                </v-list-item>
                    <v-list-item d-flex flex-column>
                    <v-list-item-title class="a" @click="deleteCmt(idCmt)"><v-icon class="icon" >mdi-close</v-icon>Supprimer</v-list-item-title>
                </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
 import axios from"axios"

export default {
    name : "EditCmt",
    props:{
        idCmt: Number,
        idPost: Number,
    },
    data(){
        return {
            dialog: false,
            menu: false,
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
            this.closeDialog()
            }, 1000)
        },
    },
    mounted () {
         this.getCmts() 
         console.log("mounted post" ,this.idPost,"mounted cmt",this.idCmt);
    
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
            let content =this.oneCmt.content
            axios.put("http://localhost:3000/api/v1/cmt/"+idCmt,{content},{headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(()=>{
                this.err = true
                this.closeCmt = true
                this.update = true
                this.$emit('update-cmt',this.update)
                this.$emit('show-cmt',this.show=false)
                this.$emit('menu-event',this.menu=false)
             })
             .catch(err =>{
                console.log(err);
             });
         },
        deleteCmt(idcmt){
        //get token in storage and extract ID
            let user=JSON.parse(localStorage.getItem('user'))
            let token=user.token
            
            axios.delete("http://localhost:3000/api/v1/cmt/"+idcmt,{headers: {Authorization: 'Bearer ' + token}})
                 .then( (res)=>{
                    this.$emit('menu-event',this.menu=true)
                  
                    console.log("axios.delete",res,)
                })
                 .catch(err=>{console.log("err",err);})
         },
         
        closeDialog(){
               this.dialog=false
                 this.$emit('menu-event',this.menu=false)
                 
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