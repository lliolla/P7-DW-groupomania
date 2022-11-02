<template>
<div class="sidebar">
 
      <v-list>
         <div>
        <v-list-item >
          <v-list-item-avatar>
            <v-img :src="user.media" > </v-img>
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{user.username}}
            </v-list-item-title>

            <v-list-item-subtitle class="m-3">{{email}}</v-list-item-subtitle>
          </v-list-item-content>

        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
</div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name : "TheSidebar",
  props : ['drawer'],
  data: () => ({
      selectedItem: 0,
      items: [
        { text: 'Mon mur', icon: 'mdi-wall', to:"/posts"},
        { text: 'Mes publications', icon: 'mdi-forum', to:"/MyPosts"},
        { text: 'Mes commentaires', icon: 'mdi-star' , to:"/buildPage"},
        { text: 'Mes collegues', icon: 'mdi-account-multiple', to:"/buildPage" },
        { text: 'Mes fichiers', icon: 'mdi-folder', to:"/buildPage" },
        { text: 'Administration', icon: 'mdi-folder', to:"/dashboard"  },

      ],
        username:localStorage.getItem('username'),
        email :localStorage.getItem('email'),
        userId :localStorage.getItem('userId'),
       
    }),
    
 computed:{
       ...mapState(['user']),
      
     },
}

</script>
<style scoped>
.v-icon.v-icon{
  color:#E53935;
}

</style>