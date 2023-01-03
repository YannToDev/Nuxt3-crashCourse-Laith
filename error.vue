<template>
    <div class=" h-screen flex flex-col justify-center items-center">
        <h1 class="text-8xl">{{ error?.statusCode }}</h1>
        <p class="mt-7 text-4xl">{{ error?.message }}</p>
    </div>
</template>

<script  setup lang="ts">

    // composable de Nuxt qui permet de manipuler les erreurs provenant du serveur
    const error = useError();

    const route = useRoute()
    const path = route.path;

    //  on utilise la méthode clearError() qui permet de reset l'erreur car sinon cette dernière
    // persiste dans notre application.
    setTimeout(() => {
        clearError({
            redirect:"/"
        })
    }, 2500);

</script>