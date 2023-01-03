<!-- Composant correpondant à la section description de la vue détaillée d'une voiture -->
<template>
    <div class="mt-5">
        <p class="mb-10 text-justify">
            {{ props.description }} 
        </p>
    </div>
</template>

<script setup lang="ts">

    // On définit une interface qui correspond au type de props que ce composant à savoir ici un string.
    // Note: on est obligé de définir l'interface directement ici et pas dans le dossier Types sinon cela
    // ne fonctionne pas c'est une des limitations actuelle de Vue.
    interface Props {
        description: string
    };

    const props =  defineProps<Props>();

</script>
