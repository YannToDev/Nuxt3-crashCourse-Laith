<!-- Composant correpondant à la section hero de la vue détaillée d'une voiture -->
<template>
    <div class="mt-10">
        <NuxtImg
            :src="props.url"
            alt="selected car image" />
        <h1 class="mt-10 text-4xl">{{ props.name }}</h1>
    
        <div class="text-slate-500 flex justify-between text-lg mt-3 border-b p-5">
            <div class="flex">
                <p class="mr-2">{{ props.seats }}</p>
                <p class="mr-2">|</p>
                <p class="mr-2">{{ props.miles }} miles</p>
            </div>
    
            <div>
                <p class="mt-1 sm:mt-0 font-bold text-sm sm:text-md md:text-xl">
                    ${{ props.price }}
                </p>
            </div>
    
        </div>
    </div>
</template>

<script setup lang="ts">

    interface Props {
        miles: string,
        name:  string,
        price: string,
        seats: string,
        url:string,
    };

    const props = defineProps<Props>();

</script>

