<template>
    <div 
        class="relative h-screen w-full bg-no-repeat bg-cover bg-bottom 
        bg-[url(https://carconfigurator.ferrari.com/assets/cars/portofinom/packages/default/car-ferrari-portofino-m_splash.jpg)]"
    >
        <div class="z-10 absolute w-full h-full flex justify-center items-center">
            <div class="text-center w-1/2">
                <h1 class="text-7xl mb-10 font-serif text-white">Find Your Drive</h1>
                <!-- HOME SEARCH BAR -->
                <CarSearchBar />
            </div>
        </div>

        <!-- overlay de l'image -->
        <div class="z-1 absolute w-full h-full bg-black opacity-50"></div>

    </div>
</template>

<script setup lang="ts">

    const photoUrl = "https://carconfigurator.ferrari.com/assets/cars/portofinom/packages/default/car-ferrari-portofino-m_splash.jpg"

</script>
