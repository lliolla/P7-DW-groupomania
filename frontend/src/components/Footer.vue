<template>
    <div class="footer">
         <v-footer class="red darken-1 " >
           
           <!-- <v-row>
             <v-col class="text-center">
                <v-icon x-large color="red lighten-5">  mdi-facebook</v-icon>
             </v-col>
        
           </v-row> -->
           <v-col
              class="text-center"
              cols="12">
              {{ new Date().getFullYear() }} — <strong>Groupomania</strong>
           </v-col>
     </v-footer>
    </div>

</template>
<script>
export default {
    name :"Footer",

}
</script>
