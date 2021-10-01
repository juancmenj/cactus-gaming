<template>
  <div class="home">
    <div v-if="showLoader">
      <div class="progress">
        <div class="progress__bar"></div>
      </div>
    </div>
    <div v-if="!showLoader">
      <v-container fluid>
        <v-row align="center" justify="space-between" class="menuWrapper">
          <v-col cols="1">
            <v-btn text color="primary"
              ><v-icon>mdi-user</v-icon
              ><span v-html="homeContent.content.header.nombre"
            /></v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="1">
            <v-img
              max-height="60"
              max-width="60"
              :src="homeContent.content.header.logoImg"
              @click="
                gotopage(
                  homeContent.content.header.logoURL,
                  homeContent.content.header.newWindowLogo
                )
              "
            ></v-img>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <v-parallax
              dark
              :src="homeContent.content.header.bannerImg"
              @click="
                gotopage(
                  homeContent.content.header.bannerUrl,
                  homeContent.content.header.newWindowBanner
                )
              "
            >
            </v-parallax>
            <h1
              class="jumboText"
              :style="{
                fontSize: homeContent.content.header.tituloFontSize
                  ? homeContent.content.header.tituloFontSize
                  : '3rem',
                color: homeContent.content.header.tituloColor
                  ? homeContent.content.header.tituloColor
                  : 'gray',
              }"
              v-html="homeContent.content.header.tituloBienvenida"
            />

            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-sheet
                    class="mx-auto"
                    elevation="8"
                    v-for="(team, n) in homeContent.content.body"
                    :key="n"
                  >
                    <h4 v-html="team.nombreTeam" class="titleTeam" />
                    <v-card v-for="(player, n) in team.players" :key="n">
                      <v-img
                        max-height="60"
                        max-width="60"
                        :src="player.playerImg"
                        v-bind="attrs"
                        @click="openModal()"
                      ></v-img>

                      <v-dialog v-model="modal" width="500">
                        <v-card>
                          <v-card-title class="text-h5 grey lighten-2">
                            player.playerNombre
                          </v-card-title>

                          <v-card-text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="modal = false">
                              I accept
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-container>
            <br /><br /><br /><br /><br /><br />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
//vuex
import store from "../store";
import router from "../router";

export default {
  name: "Home",
  components: {},
  data: () => ({
    showLoader: true,
    modal: false,
  }),
  created() {
    store.dispatch("home/homeAction");
  },
  computed: {
    homeContent: function () {
      return store.getters["home/getHomeData"];
    },
  },
  watch: {
    homeContent: function () {
      const loading = store.getters["home/getLoading"];
      const data = store.getters["home/getHomeData"];

      if (!loading && data) {
        setTimeout(() => {
          this.showLoader = loading;
        }, 4000);
      }
      return data;
    },
  },
  methods: {
    gotopage(url, newtTab) {
      if (newtTab) {
        window.location.href = url;
      } else {
        router.push(url);
      }
    },
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
  },
};
</script>

<style scoped>
.menuWrapper {
  margin-top: 0rem;
  background: lemonchiffon;
}
.jumboText {
  margin: 4rem;
}

.titleTeam {
  text-align: left;
}

.progress {
  margin: 0px auto;
  width: 25%;
  border: 1px solid gray;
  height: 10px;
}

.progress .progress__bar {
  height: 100%;
  width: 5%;
  background: repeating-linear-gradient(
    135deg,
    #036ffc,
    #036ffc 20px,
    #1163cf 20px,
    #1163cf 40px
  );
  animation: fill-bar 1s infinite;
}

@keyframes fill-bar {
  from {
    width: 5%;
  }

  to {
    width: 100%;
  }
}
</style>
