<!-- Composant correpondant à la section propriétéess de la vue détaillée d'une voiture -->
<template>
    <div class="mr-10 mt-5 border-b pb-5">
        <div class="flex flex-col text-lg mt-2">
            <p v-for="feature in props.features" class="rounded text-lime-800 mr-3">
                {{ feature }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">

    // On définit une interface qui sera le type de la props reçu par ce composant
    // a savoir ici un tableau de string.
    // Note: on est obligé de définir l'interface directement ici et pas dans le dossier Types sinon cela
    // ne fonctionne pas c'est une des limitations actuelle de Vue.
    interface Props{
        features :string[];
    };

    const props = defineProps<Props>();

</script>