<template>
    <slot />
</template>

<script setup>

//Global store
import { useGlobalStore } from "@/stores/global";
import { storeToRefs } from 'pinia';

const global = useGlobalStore()
const { user,connected } = storeToRefs(global)

const router = useRouter()

if(connected){
    if(user.value.uti_role == 'admin'){
        router.push('/admin')
    }else{
        router.push('/')
    }
}

</script>