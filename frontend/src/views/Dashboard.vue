 <template>
 <v-app  >
    <v-navigation-drawer
      v-model="drawer"
      app >
    <TheSidebar></TheSidebar>
    </v-navigation-drawer>

    <TheNavbar></TheNavbar>


    <v-main class="main d-flex justify-center pa-4" >  
    <AllProfils v-if="isAdmin"  ></AllProfils>
    <Profil v-else ></Profil>

    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
  let user = JSON.parse(localStorage.getItem('user'))
  import { mapState } from 'vuex';

  import TheSidebar from '@/components/TheSidebar'
  import TheNavbar from '@/components/TheNavbar.vue'
  import Footer from '@/components/Footer.vue'
  import Profil from '@/components/users/Profil.vue'
  import AllProfils from '@/components/users/AllProfils.vue'


  //import axios from 'axios'
 
  export default {
    name: 'Dashboard',
    components: {
      TheSidebar,
      TheNavbar,
      Footer,  
      Profil ,
      AllProfils,
      
    },
    data: () => ({ 
      drawer: null ,
      username: "",
      lastname:"",
      firstname:"",
      email:"",
      password:"",
      userId:user.userId,
      isAdmin :true,
      OnePosts:true,
    }),
    computed:{
      ...mapState(['users'])
    },

      
   
  }
</script>

<style scoped>


.form{
  padding:0 20px;
  margin: 10px;
}
.btn{
   margin-bottom: 20px; 
}

.main{
 background-color:rgb(226, 225, 223);
  display: flex;
  flex-direction: row;
}
.cards-form{
  max-width: 370px;
}

</style>
