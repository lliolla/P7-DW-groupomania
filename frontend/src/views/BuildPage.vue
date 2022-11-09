<template>
 <v-app id="dashboard">
   <v-navigation-drawer
      v-model="drawer"
      app >  

    <TheSidebar
     @drawer-state-sidebar='setDrawerSidebar'
    ></TheSidebar>
</v-navigation-drawer>
    <TheNavbar
    @drawer-state='setDrawerState' >
    </TheNavbar>
  <h1 class="d-flex justify-center pa-4" >Désolé cette fonctionnalité n'est pas encore acccessible</h1> 
  <v-main class="main " > 
  <img src="/image/build-page.jpg" 
  width="500px"
  alt="page en construction">
  <p>vous allez être redirigé automatiquement sur la page d'acceuil </p>
  </v-main>
      <Footer></Footer>
  </v-app>
</template>
<script>
  import TheSidebar from '@/components/TheSidebar'
  import TheNavbar from '@/components/TheNavbar.vue'
export default {
  name :'NotFound',
  data: () => {
      return{
        drawer:true,
      }},
  components: {
      TheSidebar,
      TheNavbar,
    },
   mounted : 
   function(){
     setTimeout(() => {
        this.$router.push('/posts')
      }, 2500)
   },
   methods:{
      setDrawerState(payload){
          this.drawer=payload
      },
      setDrawerSidebar(payload){
          this.drawer=payload
      }
    }
}
</script>
<style scoped>

.main {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

</style>