import Vue from 'vue'
import VueRouter from 'vue-router'

//on importe les vues que l'on cahrge entierement , les composant sont chargés ds la route
import Home from '../views/Home.vue'
import Wall from '../views/Wall.vue'
import NotFound from '../views/NotFound.vue'
import Dashboard from '../views/Dashboard.vue'
import MyPosts from '../views/MyPosts.vue'
import MyProfile from '../views/MyProfile.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: '404',
    component: NotFound
  },
 // routes Adminstration
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title :"Accueil"
    }
  },
  {
    path: '/dashboard',
    name: 'Administration',
    component: Dashboard,
    meta:{
      title :"Administration"
    }
  },
// routes des Utilisateurs
{
path: '/user/:id',//update user's profil
name:'Mon profil',
component: MyProfile,
props:true,
meta:{
  title :"Mon profil"
  }
},


// routes des publications
{
  path: '/posts',//afficher tous les posts de tous les utilisateurs
  name: 'Wall',
  component: Wall, 
  props:true,
  meta:{
    title :"Publications"
  }
},

{
  path: '/posts/:id/EditPost',//modifier le post d'un utilisateur
  name:'EditPost',
  props:true,
  meta:{
    title :"Modifier un article"
  },
  //lasy loading: permet d'aleger le chargement de l'appli en ciblant uniquement le composant et non toute l'application
  component:()=>import('../components/posts/EditPost.vue')
},
{
  path: '/MyPosts',//afficher les posts d'un utilisateur
  name:'MyPosts',
  component:MyPosts,
  props:true,
  meta:{
    title :"Mes publications"
  },

},
{
  path: '/posts/:id/SinglePost',//afficher le post d'un utilisateur
  name:'oneUserPosts',
  props:true,
  component:()=>import('../components/posts/SinglePost.vue')
}
  
    // routes Adminstration
   
]

const router = new VueRouter({
  routes,
  
})
// on definit le titre de la page 
router.afterEach((to)=>{
document.title =to.meta.title;
});
export default router
