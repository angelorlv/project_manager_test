<template>
    <div class="w-[800px] max-w-[800px] m-auto border-x h-screen overflow-auto ">
        <div class="flex border-b items-center">
            <NuxtLink class="link_top" to="/admin"> Gestion des utilisateurs </NuxtLink>
            <NuxtLink class="link_top" to="/admin/projects"> Gestion des projets </NuxtLink>
            
            <span class="flex-grow"></span>
            <span @click="deconnect" class="p-2 mx-2 cursor-pointer text-xs border rounded border-green-500"> {{ user.uti_email }} - Deconnexion </span>
        </div>  
        <NuxtPage/>
    </div>
</template>

<script setup>

//Global store
import { useGlobalStore } from "@/stores/global";
import { storeToRefs } from 'pinia';

const global = useGlobalStore()
const { user, connected } = storeToRefs(global)

const router = useRouter()

definePageMeta({
    layout: "admin",
});

async function deconnect(){
    try {
        
        const r = await fetch('/api/u/deconnect')

        if(r.status == 200){
            router.push('/login')
        }

    } catch (e) {
        console.log(e)
    }
}

</script>

<style scoped>

.link_top{
    @apply p-2 py-3;
}
.router-link-exact-active{
    @apply text-blue-500 border-b-2 border-blue-500 font-bold;
}
    
</style>