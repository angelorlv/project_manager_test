<template>
    <div class="flex w-screen h-screen justify-center items-center">
        <span class="text-4xl text-yellow-600 font-bold"> Aucune information ici </span>
    </div>
</template>

<script setup>

import { useGlobalStore } from "@/stores/global";
import { storeToRefs } from 'pinia'
const global = useGlobalStore()


// -------------------------------------
const { user,connected } = storeToRefs(global)
/// ------------------------------------


onMounted (() => {

})

</script>