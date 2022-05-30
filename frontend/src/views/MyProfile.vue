<template>
  <div class="profil">
    
    <v-navigation-drawer
      v-model="drawer"
      app >
    <TheSidebar></TheSidebar>
    </v-navigation-drawer>

    <TheNavbar></TheNavbar>
   <v-main>
       <Profil> </Profil>
   </v-main>
      <Footer></Footer>
  </div>
</template>

<script>
 import TheSidebar from '@/components/TheSidebar.vue'
  import TheNavbar from '@/components/TheNavbar.vue'
  import Footer from '@/components/Footer.vue'
  import Profil from '@/components/users/Profil.vue'


export default {
name : 'Followers',
components : {
  TheSidebar ,
  TheNavbar,
  Footer,
  Profil,
},
data: ()=>{
    return{
    drawer: null ,
    
    }
}
}
</script>

<style>

</style>