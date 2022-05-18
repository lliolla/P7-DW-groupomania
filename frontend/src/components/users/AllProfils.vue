<template>
    <div class="table-reponsive">
        <h2>Liste des utilisateurs userid: {{userId}} token: {{token}} </h2>
        <template>
  <v-simple-table >
    <template v-slot:default>
      <thead >
        <tr class="text-left">
         <th>Avatar</th>
        <th>Nom d'utilisateur</th>
        <th>Email</th>
        <th>Role</th>
        <th>Articles</th>
        <th>Commentaires</th>
        <th>Administartion</th>
        </tr>
      </thead>
      <tbody>
         <tr
          v-for="user in users"
          :key="user.id">
            <td>{{ user.avatar }}</td>
            <td>{{ user.username}}</td>
            <td>{{ user.email}}</td>
            <td>
                <v-chip
                color="green">utilisateur
                </v-chip>
            </td>
            <td>{{ user.postsQte}}</td>
            <td>{{ user.comQte}}</td>
            <td class="d-flex">
                <v-btn
                elevation="2"
                small
                color="success"
                @click="editUser(user.id)"
                class="ma-2">
                <v-icon>mdi-pencil-outline  </v-icon>
                </v-btn>
                <v-btn
                elevation="2"
                small
                color="warning"
                class="ma-2 "
                @click="delateUser(user.id)"  >
                <v-icon>mdi-close-circle-outline</v-icon>
                </v-btn>
            </td>
         </tr>


      </tbody>
    </template>
  </v-simple-table>
</template>

    </div>
</template>
<script>
let user = JSON.parse(localStorage.getItem('user'))
import { mapState } from 'vuex';

export default {
   name:"AllProfils",
   props:['idUser'],

    data:()=> {
        return{
           userId :user.userId,// on recupere l'id du userconnecté
            // users:[
            //     // {
            //     // id:1,
            //     // avatar:"  ",
            //     // username:"gandalf",
            //     // email:"gandalf@gmail",
            //     // isadmin:"true",
            //     // postsQte:"5",
            //     // comQte:"10"
            //     // },
            //     // {
            //     //  id:2,
            //     // avatar:" ",
            //     // username:"harry",
            //     // email:"harry@gmail",
            //     // isadmin:"false",
            //     // postsQte:"5",
            //     // comQte:"10"
            //     // },
            //     // {
            //     //  id:3,
            //     // avatar:"  ",
            //     // username:"bilbon",
            //     // email:"bilbon@gmail",
            //     // isadmin:"false",
            //     // postsQte:"5",
            //     // comQte:"10"
            //     // },
            //     // {
            //     // id:4,
            //     // avatar:"  ",
            //     // username:"geraltdeRiv",
            //     // email:"geraltdeRiv@gmail",
            //     // isadmin:"false",
            //     // postsQte:"5",
            //     // comQte:"10"
            //     // },
            //     // {
            //     // id:5,
            //     // avatar:"  ",
            //     // username:"jasquier",
            //     // email:"jasquier@gmail",
            //     // isadmin:"false",
            //     // postsQte:"5",
            //     // comQte:"5"
            //     // }
            // ],
           
        }

    },
    mounted(){
       this.$store.dispatch('getAllUsers');
    },
     computed:{
      ...mapState(['users','token'])
    },

    methods:{
        delateUser(id){
        console.log('supprimer utilisateur =>',id)
        },
        editUser(id){
        console.log('modifier utilisateur =>',id,'user connecté =>', user.userId  )
        this.$router.push({name:'User',params:{id:id }})
        // fonctionne mais voir pour recuperer les donnees dans le store. voir la route userID car ne s'afficvhe pas 

        }
    }
}
</script>
<style>
h2{
    padding: 20px 0;
}
</style>