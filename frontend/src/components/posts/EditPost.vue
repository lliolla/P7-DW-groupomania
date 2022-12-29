<template>
  <v-menu 
  offset-y
  v-model="menu" 
  :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="dropdown-icon icon" icon v-bind="attrs" v-on="on">
        <v-icon class="white--text"> mdi-dots-vertical </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item d-flex flex-column>
        <v-list-item-title class="a">
          <v-dialog
            transition="dialog-transition"
            max-width="600px"
            v-model="dialog"
          >
            <v-card class="card">
              <div class="post-title d-flex justify-space-around align-center">
                <v-card-title class="mx-auto">
                  Modifier l'article
                </v-card-title>
                <v-btn
                  fab
                  dark
                  x-small
                  color="red darken-1"
                  @click="closePost()"
                >
                  <v-icon color="white"> mdi-close </v-icon>
                </v-btn>
              </div>

              <div class="post-content">
                <v-text-field v-model="onePost.title"> </v-text-field>
                <v-textarea
                  :rules="rulesContent"
                  counter="254"
                  v-model="onePost.content"
                >
                </v-textarea>
                <div class="update-media">
                  
                  <v-file-input v-model="media" label="Changer de fichier">
                  </v-file-input>
                </div>
              </div>
              <v-divider></v-divider>
              <div class="post-footer">
                <template>
                  <v-btn
                    block
                    color="success"
                    @click="editDataPost(onePost.media)"
                  >
                    Valider</v-btn
                  >
                </template>
              </div>
            </v-card>
            <template v-slot:activator="{ on, attrs }">
              <v-icon dark v-bind="attrs" v-on="on" class="icon">
                mdi-playlist-edit </v-icon
              >Modifier
            </template>
          </v-dialog>
        </v-list-item-title>
      </v-list-item>
      <v-list-item d-flex flex-column>
        <v-list-item-title class="a">
          <v-icon class="icon" @click="delatePost(idPost)"> mdi-close</v-icon>
          Supprimer
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "EditPost",
  props: {
    idPost: Number,
  },
  data() {
    return {
      dialog: false,
      rulesContent: [
        (v) => !!v || "Le contenu ne doit pas être vide",
        (v) => (v && v.length <= 254) || "Max 254 characters",
      ],
      media: [],
      menu:false,
      onePost: {
        id: "",
        title: "",
        content: "",
        media: [],
      },
    };
  },
  mounted() {
    this.idPost = this.getIdPost;
    console.log("media",this.media);
    this.getPost();
  },

  computed: {
    ...mapState(["user"]),
    getIdPost() {
      return this.idPost;
    },
  },
  methods: {
    getPost() {
        //get user connect and  his ID in local storage
            let user=JSON.parse(localStorage.getItem('user'))
         
        //get token in storage and extract ID
            let token=user.token
      axios
        .get("http://localhost:3000/api/v1/post/" + this.idPost, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          this.onePost = res.data
        })
        .catch((err) => {
          console.log("err", err)
        });
    },
    editDataPost(media) {
        //get user connect and  his ID in local storage
            let user=JSON.parse(localStorage.getItem('user'))
         
        //get token in storage and extract ID
            let token=user.token
      //get user'id who wrote the post
      let id_users = this.onePost.id_users;
      //on recuperer l'id du post a modifier
      this.idPost = this.getIdPost;
      //on test si le media a ete changer ou pas pour ne pas envoyer un fichier vide
      if (!this.media) {
        this.media = media;
      }
      //on creer un formdata pour envoyer les données
      const updateDataPost = new FormData();
      updateDataPost.append("title", this.onePost.title),
        updateDataPost.append("content", this.onePost.content),
        updateDataPost.append("media", this.media),
        updateDataPost.append("id_users", id_users);

      axios
        .put(
          "http://localhost:3000/api/v1/post/" + this.idPost,
          updateDataPost,
          { headers: { Authorization: "Bearer " + token } }
        )
        .then(() => {
          this.$emit("update-cmt", (this.update = !this.update))
          this.$emit("menu-event", (this.menu = false))
          this.$emit("msg-event", ( this.message = "l'article a bien été modifié"));
          this.dialog = false
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delatePost(idpost) {
      //get token in storage and extract ID
      let user = JSON.parse(localStorage.getItem("user"));
      let token = user.token;
      // get post's ID
      localStorage.setItem("idpost", idpost);
      let idPost = localStorage.getItem("idpost");
      console.log("post a supprimer", idPost, token);
      // afficher un message de confirmation de supression qui declanche le delate
      axios
        .delete("http://localhost:3000/api/v1/post/" + idPost, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
           this.$emit("update-cmt", (this.update = !this.update))
          this.$emit("menu-event", (this.menu = false))
            this.dialog = false
          this.$emit("msg-event", ( this.message = "l'article a bien été supprimé"));
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    closePost() {
      this.dialog = false
      this.$emit("menu-event", (this.menu = false))
    },
  },
};
</script>
<style scoped>
.card {
  padding: 20px;
}

.post-footer {
  margin: 15px 0px;
  padding: 5px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.icon {
  cursor: pointer;
  background-color: lightcoral;
  border-radius: 50%;
  padding: 4px;
  margin: 5px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.18);
  list-style-type: none;
}
.v-icon {
  font-size: 20px;
  color: rgb(250, 237, 237);
  vertical-align: middle;
}
.update-media {
  display: flex;
}
.files-text {
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
}
</style>