<!-- View qui correspond à la route /profile/listings/view/[id]-->
<template>
    <div class="rounded-md shadow mt-20">
        <div v-for=" i in 4" class="even:bg-gray-200">
            <CarMessageCard />
        </div>        
    </div>
</template>

<script setup lang="ts">

    definePageMeta({
        layout: 'custom',
        middleware: ['auth']
    });

</script>

