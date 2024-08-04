<template>
    <div class="flex w-screen h-screen justify-center items-center text-gray-700" >

        <form  @submit.prevent="auth" action="/" method="post" class="border flex flex-col rounded w-[500px]  shadow transition">
            <div class="flex flex-col rounded-t p-3 border-b bg-gray-50">
                <span class="text-xl"> Application de gestion de projet - [test] </span>
                <p class="text-xs"> Ceci est la page de connexion d'une application de gestion de projet - un projet test pour le poste de Développeur Vuejs  </p>
            </div>
            <div v-if="error" class="flex flex-col rounded-t p-3 border-b bg-red-50">
                <span class="text-xs text-red-500"> {{ error }} </span>
            </div>
            <div class="flex flex-col p-3">
                <label for="uti_email"> Votre email </label>
                <input v-model="uti.uti_email" class="input" type="text" name="uti_email" placeholder="john@gmail.com" id="uti_email" >
            </div>

            <div class="flex flex-col p-3">
                <label for="uti_password"> Mot de passe  </label>
                <input v-model="uti.uti_password" class="input" type="password" name="uti_password" id="uti_password" >
            </div>

            <div class="p-3 ">
                <button class="bt" type="submit"> {{ on_request?"Connexion ...":"Se connecter" }} </button>
            </div>

        </form>

    </div>
</template>

<script setup>

//Global store
import { useGlobalStore } from "@/stores/global";
import { storeToRefs } from 'pinia';

const global = useGlobalStore()
const { user,connected } = storeToRefs(global)

definePageMeta({
    layout: "layout_login",
});

const router = useRouter()

const on_request = ref(false)

const error = ref("")

const uti = ref({
    uti_email:"",
    uti_password:""
})

async function auth(){
    on_request.value = true

    try {
        const r = await $fetch('/api/auth',{
            method:"post",
            body:uti.value
        })
        if(!r.error){
            user.value = r.user
            connected.value = true

            if(user.value.uti_role == 'admin'){
                router.push('/admin')
            }else{
                router.push('/')
            }
        }else{
            error.value = r.error
        }

    } catch (e) {
        console.log(e)
    }

    on_request.value = false
}
</script>