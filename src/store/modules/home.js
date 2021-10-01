import axios from "axios";
const apiUrl = process.env.API_URL || "http://localhost:1337";

const state = () => {
  return {
    homeStart: false,
    homeSuccess: null,
    homeError: null
  };
};

const mutations = {
  homeStartMutation(state, payload) {
    state.homeStart = payload;
  },
  homeSuccessMutation(state, payload) {
    state.homeSuccess = payload;
  },
  homeErrorMutation(state, payload) {
    state.homeError = payload;
  }
};

const actions = {
  homeAction({ commit }) {
    commit("homeStartMutation", true);
    const url = `${apiUrl}/games`;

    axios.get(url)
      .then(response => {
        commit("homeSuccessMutation", response.data[0]);
      })
      .catch(error => {
        commit("homeErrorMutation", error.response.message);
      });
  },
}

const getters = {
  getHomeData(state) {
    return state.homeSuccess;
  },
  getLoading(state) {
    return !state.homeSuccess;
  }
};

export const HOME = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};