<template>
  <div class="profil">
    
    <v-navigation-drawer
      v-model="drawer"
      app >
    <TheSidebar drawer="false" ></TheSidebar>
    </v-navigation-drawer>

    <TheNavbar></TheNavbar>
   <main  class =" d-flex justify-center ">
      <div class="card-box">
        <Profil> </Profil>
      </div> 
   </main>
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

data:()=>{
  return {
    drawer: false,
  }
},
components : {
  TheSidebar ,
  TheNavbar,
  Footer,
  Profil,
},

}
</script>


<style scoped>
.card-box{
  padding: 20px 0px;

}

</style>