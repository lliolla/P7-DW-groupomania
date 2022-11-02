<template>
 <v-app id="dashboard">
    
    <TheSidebar></TheSidebar>

   
    <TheNavbar></TheNavbar>
  
  <div class="build-page">
  <h1>Désolé cette fonctionnalité n'est pas acccessible" vous allez etre rediriger sur la page d'acceuil </h1>

  <img src="/image/build-page.jpg" 
  width="300px"
  alt="page 404">
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