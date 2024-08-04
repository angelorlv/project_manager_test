<template>
    <slot v-if="connected" />
</template>

<script setup>

import { useGlobalStore } from "@/stores/global";
import { storeToRefs } from 'pinia';

const global = useGlobalStore()
const { user, connected } = storeToRefs(global)

//Router
const router = useRouter()

async function getConnection(){
    try {
        const r = await fetch('/api/u')
        if(r.status == 401){
            //Erreur de connexion //besoin de connexion
            router.replace('/login')
        }else{
            const tt = await r.json()
            user.value = tt.user
            connected.value = true
        }

        
    } catch (e) {
        console.log(e)
    }
}

onBeforeMount(() => {
    if(!connected.value){
        getConnection()
    }
})


</script>