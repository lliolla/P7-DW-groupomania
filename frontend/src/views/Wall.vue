<template>
 <v-app id="dashboard">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
    <TheSidebar></TheSidebar>
  
    </v-navigation-drawer>
    <TheNavbar></TheNavbar>
    <v-main>
        <AllPosts></AllPosts>
        
<!-- todo: rendre dynamique le choix allpost my post en passant uniquement par wall -->
    </v-main>
     <Footer></Footer>
  </v-app>
</template>

<script>
  import TheSidebar from '@/components/TheSidebar'
  import TheNavbar from '@/components/TheNavbar.vue'
  import AllPosts from '@/components/posts/AllPosts.vue'
  import Footer from '@/components/Footer.vue'


  export default {
    name: 'Wall',

    components: {
      TheSidebar,
      TheNavbar,
      AllPosts,
      Footer
     
    },

    data: () => ({ 
      drawer:null, 
      username: "",
      userId:"",
      dialog:"",
      seePostUser:true,
    }),
 }
</script>
<style>

main{
  background-color: rgb(226, 225, 223);
  display: flex;
  flex-direction: row;
}

</style>