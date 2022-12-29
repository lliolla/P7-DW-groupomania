import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
});

//on va recuperer et tester les infos (id token) du user connecté pour qu'il reste connecté le temps de la validité du token
let user = localStorage.getItem('user')

if(!user){
  user={
    userId: -1,
    token : "",
  } 
}else {
  try {
    //on parse le user ds LS
    user = JSON.parse(user)
  
  
   
  } catch (error) {
    //si pb avec le parse on definit parametre user par defaut
    user={
      userId: -1,
      token : "",
    } 
  }
 

}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    comments:10,
    idPost : 2,
    posts:[],
    users:[],
    errMsg:"",
    status:"",
    user:user,//user chargé depuis le local storage
    token :user.token,
    username:"",
    userInfos:{
      username:"",
      lastname:"",
      firstname:"",
      email:"",
      password:"",
      media:"",
    }
  },
  getters: {
    posts: (state) => {
      //  get current value of the post
      return state.posts;
    },
    users:(state)=>{
      return state.users;
    },
    user:(state)=>{
      return state.user
    },
   
  },
  mutations: {
  
   SET_POSTS (state,posts){
     state.posts=posts
   },
   GET_USERS(state,users){
    state.users=users
  },
   SET_STATUS(state, status){
     state.status= status;
   },
   LOG_USER(state, user){
    // on definit le header autorisation pour utiliser le token
    instance.defaults.headers.common['Authorization'] = user.token
    state.user=user;
    localStorage.setItem('user',JSON.stringify( user)) 
   },
   
  },
  actions: {
    
    getAllPosts({commit}){
        //get user connect and  his ID in local storage
        let user=JSON.parse(localStorage.getItem('user'))
        //get token in storage and extract ID
        let token=user.token
      axios
      .get("http://localhost:3000/api/v1/post", {headers: {Authorization: 'Bearer ' + token}})
      .then(res => {
        commit('SET_POSTS', res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getAllUsers({commit}){
        //get user connect and  his ID in local storage
        let user=JSON.parse(localStorage.getItem('user'))
         
        //get token in storage and extract ID
            let token=user.token
      axios
      .get("http://localhost:3000/api/v1/user", {headers: {Authorization: 'Bearer' + token}})
      .then(res => {
        commit('GET_USERS', res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    login({commit}, dataLogin){
      // on fait une promise pour traiter notre code asynchrone
      return new Promise((resolve, reject)=>{
        commit('SET_STATUS','loading');
        axios.post('auth/loging',dataLogin)
            .then(res =>{
              //quand on a la reponse on change le status
              commit('SET_STATUS','')
              //on stock le user
              commit('LOG_USER',res.data)
              resolve(res);
            })
            .catch(err=>{
                  reject(err);
              })
      })
    },
    register({commit},dataRegister){
    // on fait une promise pour traiter notre code asynchrone
      return new Promise((resolve, reject)=>{
        commit('SET_STATUS','loading')
        axios.post('auth/register',dataRegister)
              .then(res =>{
                //quand on a la reponse on change le status
                commit('SET_STATUS','')
                resolve(res);
              })
              .catch(err=>{
                reject(err);
                })
        })
    },
    //la fonction n'est pas asynchrone car lee se met a jour toute seule avec les mutations
    getUserInfo:( {commit} )=>{
        //get user connect and  his ID in local storage
        let user=JSON.parse(localStorage.getItem('user'))
         
        //get token in storage and extract ID
            let token=user.token
      let userConnect = JSON.parse(localStorage.getItem('user')) 
       let userConnectId =userConnect.userId
       axios .get("http://localhost:3000/api/v1/user"+userConnectId, {headers: {Authorization: 'Bearer ' + token}})
        .then(res =>{
        commit;
          console.log('LOG_USER',res.data)
      
        })
        .catch() 
        }
     },
 
})
