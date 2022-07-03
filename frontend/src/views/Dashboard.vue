 <template>
 <v-app  >
    <v-navigation-drawer
      v-model="drawer"
      app >
    <TheSidebar></TheSidebar>
    </v-navigation-drawer>

    <TheNavbar></TheNavbar>
  
    <v-main class="main d-flex justify-center pa-4" >  
    <AllProfils v-if="OnePosts"  ></AllProfils>
    <User v-else ></User>

    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
  import TheSidebar from '@/components/TheSidebar'
  import TheNavbar from '@/components/TheNavbar.vue'
  import Footer from '@/components/Footer.vue'
  import User from '@/components/users/User.vue'
  import AllProfils from '@/components/users/AllProfils.vue'


  //import axios from 'axios'
 
  export default {
    name: 'Dashboard',
    components: {
      TheSidebar,
      TheNavbar,
      Footer,  
      User ,
      AllProfils,
      
    },
    data: () => ({ 
      drawer: null ,
      username: "",
      lastname:"",
      firstname:"",
      email:"",
      password:"",
      userId:"",
      isAdmin :true,
      OnePosts:true,
    }),
      
   
  }
</script>

<style >
.form{
  padding:0 20px;
  margin: 10px;
}
.btn{
   margin-bottom: 20px; 
}

.main{
  background-color: rgb(201, 26, 26);
  display: flex;
  flex-direction: row;
}
.cards-form{
  max-width: 370px;
}

</style>
