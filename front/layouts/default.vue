<template>
    <slot v-if="connected" />
</template>

<script setup>

//Global store
import { useGlobalStore } from "@/stores/global";
import { storeToRefs } from 'pinia';

const global = useGlobalStore()
const { user,connected } = storeToRefs(global)

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

            if(user.value.uti_role == "admin"){
                router.push('/admin')
            }
        }

        

    } catch (e) {
        console.log(e)
    }
}

onBeforeMount(() => {

    getConnection()
})

</script>