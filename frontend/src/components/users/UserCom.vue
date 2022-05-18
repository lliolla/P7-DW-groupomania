<template>
    <div class="userCom">
        <h1> liste des publications et commentaires  </h1>
            <template>
                <v-simple-table >
                    <template v-slot:default>
                    <thead >
                        <tr class="text-left">
                        <th>Titre</th>
                        <th>Nb de vues</th>
                        <th>Nb de com</th>
                        <th>Nb de likes</th>
                        <th>Administartion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="list in userPostsList"
                            :key="list.id">
                            <td>{{ list.title}}</td>
                            <td>{{ list.nbVues}}</td>
                            <td>{{ list.nbCom}}</td>
                            <td>{{ list.like}}</td>
                            <td class="d-flex">
                                <v-btn
                                elevation="2"
                                small
                                color="success"
                                @click="editUser()"
                                class="ma-2">
                                    <v-icon>mdi-pencil-outline</v-icon>
                                </v-btn>
                                <v-btn 
                                elevation="2"
                                small
                                color="warning"
                                class="ma-2 "
                                @click="delateUser()"  ><v-icon>mdi-close-circle-outline</v-icon> </v-btn>
                            </td>  
                            </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </template>
   

    </div>
</template>

<script>

export default {
    name :'UserCom',
    data:()=> {
        return{
            userPostsList:[
                {
                id :1,
                title :'un si joli titre pour gandalf',
                like: 10,
                nbVues: 5,
                nbCom:3
                },
                {
                id :2,
                title :'titre 2',
                like: 10,
                nbVues: 5,
                nbCom:3
                },
                {
                id :3,
                title :'titre 3',
                like: 10,
                nbVues: 5,
                nbCom:3
                },
                {
                id :4,
                title :'titre 4',
                like: 10,
                nbVues: 5,
                nbCom:3
                },
                

            ],
        }
        
    },
}
</script>