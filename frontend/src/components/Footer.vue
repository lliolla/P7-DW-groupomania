<template>
    <div class="footer">
         <v-footer  >
         
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
<style scoped>
.theme--light.v-sheet {
background-color:#FD2D01
}
</style>