<template>
    <div class="singel-post">
        <v-card 
          class="mx-auto"
           max-width="600">
          <div class="post-avatar">
            <v-avatar
            size="56"
            color="red" >
            <img src="https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y" alt="icon groupomania">
            </v-avatar>
            <p class="post-avatar-name">gandalf</p>

          </div>
          <div class="user-post">
            <h3 class="user-post-title"> Ici le titre du POst</h3>
            <span class="clock">
              <v-icon>mdi-clock</v-icon>
              il y a 3 min
            </span>
            <ul class="react-link">
              <li>
                <v-icon>mdi-heart</v-icon>
                150 votes
              </li>
              <li>
                <v-icon>mdi-share-variant</v-icon>
                partager
              </li>
            </ul>
            <p class ="user-post-content">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. In sed optio minus saepe totam. Repudiandae porro molestias in. Vitae accusantium iusto soluta quis facere magnam doloremque alias! Molestiae, ducimus eaque.
            </p>
            <span>... read more</span>

            <ul class="show-comments">
              <li> <v-icon>mdi-eye</v-icon>
              Voir les 4 commentaires 
              </li>
            </ul>
            <v-divider class="mx-4"></v-divider>
            <div class="post-comment">
              <v-avatar
              size="avatarSize"
              color="red" >
              <img src="https://i.picsum.photos/id/1021/2048/1206.jpg?hmac=fqT2NWHx783Pily1V_39ug_GFH1A4GlbmOMu8NWB3Ts" alt="icon groupomania">
              </v-avatar>
              <div class="post-comment-section">
                <form action="">
                  <v-textarea
                    solo
                    name="input-7-4"
                    label="Solo textarea"
                  ></v-textarea>
                  <v-btn
                    elevation="2"
                  >Envoyer votre réponse</v-btn>
                </form>
              </div>
            </div>
            
          </div>
       </v-card>
    </div>
</template>
<script>

</script>
<style scoped>
main .v-main{

  background-color: rgb(241, 148, 187);
}

.v-card{
   display: flex;
  flex-direction: row;
 padding: 20px;
}
.post-avatar{
  margin: 0 20px;
}
.user-post-title{
  color: #000000;
  font-size: 17px;
  font-weight: 600;
}
.user-post-content{
  float: left;
width: 100%;
color: #686868;
font-size: 14px;
line-height: 24px;
margin-bottom: 40px;
}
.clock, .react-link, .post-avatar-name{
  color: #b2b2b2;
  font-size: 14px;
  display: inline-block;
  margin-bottom: 20px;
}
ul,.react-link{
  display: flex;
  list-style:none;
}
.v-icon.v-icon {
  font-size:20px;
  color: lightcoral;
}
.v-application ul, .v-application ol {
    padding-left: 0px;
}

li, .react-link{
 padding-right: 10px;
}
.show-comments{
  display: flex;
  flex-direction: row;
  margin: 10px;
}
</style>
