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
  
  <div class="d-flex flex-column text-center pa-8 mx-auto " > 
    
    <h2 >  OUPS !!  </h2> 
    <h2>Cette page est en construction</h2>
   <img class
   src="/image/build-page.jpg" 
  width="500px"
  alt="page en construction">
   <p >vous allez être redirigé automatiquement sur la page d'acceuil </p>
  </div>
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
        drawer:false,
      }},
  components: {
      TheSidebar,
      TheNavbar,
    },
  //  mounted : 
  //  function(){
  //    setTimeout(() => {
  //       this.$router.push('/posts')
  //     }, 2500)
  //  },
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