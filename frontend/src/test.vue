  <div class="edit-post"  >
        <div class="card-overlay">
        </div>
        <v-card
            class="card ">
                <div class="post-media">
                    <v-avatar
                        size="45"
                        color="red">
                        <img :src="user.avatar" alt="alt">
                    </v-avatar>
                    <v-card-title>
                        Modifier le post
                    </v-card-title >
                </div>
                <div class="post-content">
                    <v-text-field
                        prepend-icon="mdi-pen"
                        v-model="onePost.title">
                    </v-text-field>
                    <v-textarea
                        prepend-icon="mdi-pen"
                        v-model="onePost.content">
                    </v-textarea>
                    <div class="update-media">
                        <img width="25%" :src="onePost.media" alt="">
                        <v-file-input
                            v-model="media"
                            ref="media"
                            label="Changer de fichier">
                        </v-file-input>
                    </div>

                </div>
                <v-divider></v-divider>
                <div class="post-footer">
                    <template>

                        <v-btn color="warning"
                        @click="closePost()"
                        >Fermer</v-btn>

                        <v-btn color="success"
                        @click="editDataPost(onePost.media)"
                        >Envoyer</v-btn>
                    </template>
                </div>
        </v-card>
    </div>