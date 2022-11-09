<template>
    <v-app-bar app>
        <v-app-bar-nav-icon @click="changeDrawerState" ></v-app-bar-nav-icon> <!-- faire disparaitre / appararitre side bar -->
        <v-avatar
            size="avatarSize"
            color="red" >
        <img src="../assets/images/icon.svg" alt="icon groupomania">
        </v-avatar>
        <v-toolbar-title>Groupomania</v-toolbar-title> 
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
            <v-badge 
            bordered
            offset-x="10"
            offset-y="10">
                <span slot="badge">{{friendNumber}} </span> <!--slot can be any component-->
                <v-icon>mdi-emoticon-happy-outline</v-icon>
            </v-badge>
        </v-btn>
        <v-btn icon>
            <v-badge 
            bordered
            offset-x="10"
            offset-y="10">
                <span slot="badge">{{notifNumber}} </span> <!--slot can be any component-->
                <v-icon>mdi-bell</v-icon>
            </v-badge>
        </v-btn>
        <v-btn icon>
            <v-icon @click="settings ()">mdi-cog</v-icon>
        </v-btn>
        <v-btn  icon @click="logout()" >
            <v-icon >mdi-logout</v-icon>
        </v-btn>

    </v-app-bar>
</template>

<script>
export default {
  name : "TheNavbar" ,
  data (){
        return {
            notifNumber :"1",
            friendNumber :"10",
    }},
    methods : {
        changeDrawerState(){
            this.$emit('drawer-state', this.drawer = !this.drawer)
        },
        logout (){
            localStorage.clear();
            this.$router.push('/')
        },
        settings (){
          this.$router.push('/buildPage')  
        }
    }
}
</script>