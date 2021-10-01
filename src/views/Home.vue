<template>
  <div class="home">
    <div v-if="showLoader">
      <div class="progress">
        <div class="progress__bar"></div>
      </div>
    </div>
    <div v-if="!showLoader">
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

      <v-container>
        <v-row justify="center">
          <v-col cols="12">
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
                    <div class="players">
                      <div
                        v-for="(player, n) in team.players"
                        :key="n"
                        class="player"
                      >
                        <v-img
                          :src="player.playerImg"
                          v-bind="attrs"
                          @click.stop="openModal()"
                        ></v-img>

                        <v-sheet v-if="modal" :key="n" class="showData">
                          <v-btn
                            elevation="2"
                            @click.stop="closeModal()"
                          >x</v-btn>
                          <v-row
                            align="center"
                            justify="space-between"
                            class="menuWrapper"
                          >
                            <v-col cols="6">
                              <v-img
                                :src="player.playerImg"
                                v-bind="attrs"
                              ></v-img>
                            </v-col>
                            <v-col cols="6">
                              <p v-html="player.playerNombre" />
                              <p v-html="player.playerApellido" />
                              <p v-html="player.playerEdad" />
                              <p v-html="player.playerPasatiempo" />
                              <p v-html="player.playerWebSite" />
                              <p v-html="player.playerProfesion" />
                            </v-col>
                          </v-row>
                        </v-sheet>
                      </div>
                    </div>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <br><br><br><br><br><br><br><br><br><br><br>
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
    show: false,
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
        }, 1000);
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
  background: #777448;
  display: flex;
  align-items: center;
}
.jumboText {
  margin: 4rem;
}

.titleTeam {
  text-align: left;
}

.players {
  display: flex;
  flex-direction: row;
}

.player {
  height: 10rem;
  width: 10rem;
  border: 1px solid blanchedalmond;
  border-radius: 5px;
  margin: 2rem;
  padding: 1rem;
}
.showData {
  widows: 50%;
  height: auto;
  position: absolute;
  z-index: 99999;
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
