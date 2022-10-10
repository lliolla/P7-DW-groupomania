<template>
 <v-app>
  <div class="wall">
 <v-navigation-drawer
      v-model="drawer"
      app
    >
    <TheSidebar></TheSidebar>
  
    </v-navigation-drawer>
    <TheNavbar></TheNavbar>
    <main>
    <AllPosts></AllPosts> 
    </main>
  </div>
   


       
        
        
<!-- todo: rendre dynamique le choix allpost my post en passant uniquement par wall -->
  
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

.wall{
  background-color: rgb(226, 225, 223);
}
</style>