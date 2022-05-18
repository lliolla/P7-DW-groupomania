<template>
  <div class="follow">
    
    <v-navigation-drawer
      v-model="drawer"
      app >
    <TheSidebar></TheSidebar>
    </v-navigation-drawer>

    <TheNavbar></TheNavbar>
    <main>
 ici mes follewers et fichiers page sans fonctionnalitées
    </main>
      <Footer></Footer>
  </div>
</template>

<script>
 import TheSidebar from '@/components/TheSidebar.vue'
  import TheNavbar from '@/components/TheNavbar.vue'
  import Footer from '@/components/Footer.vue'


export default {
name : 'Followers',
components : {
  TheSidebar ,
  TheNavbar,
  Footer,
}
}
</script>

<style>

</style>