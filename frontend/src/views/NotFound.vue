<template>
 <v-app id="dashboard">
    
    <TheSidebar></TheSidebar>
      <!--  -->
   
    <TheNavbar></TheNavbar>
    
 <div class="image">
  <h1>Vous vous etes perdus ? vous allez etre rediriger sur la page d'acceuil </h1>
  <img src="/image/404.jpg" alt="page 404">
 </div>
   
  </v-app>
</template>
<script>
  import TheSidebar from '@/components/TheSidebar'
  import TheNavbar from '@/components/TheNavbar.vue'


export default {
  name :'NotFound',
  components: {
      TheSidebar,
      TheNavbar,
      
    },
}
</script>