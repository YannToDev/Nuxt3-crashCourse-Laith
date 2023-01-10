<template>
    <div>
<header class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md"> 
    <NuxtLink 
        to="/" 
        class="text-3xl font-mono"
    >
        Cartrader 
    </NuxtLink>

    <div 
        v-if="user"
        class="flex"
    >
        <NuxtLink to="/profile/listings" class="mr-5 hover:underline hover:text-blue-500 hover:font-semibold">Profile</NuxtLink>
        <p 
            @click="logout"
            class="cursor-pointer hover:underline hover:text-blue-500 hover:font-semibold"
        >
            Logout
        </p>
    </div>

    <NuxtLink 
        v-else 
        to="/login"
        class="hover:underline hover:text-blue-500 hover:font-semibold"
    >
        Login
    </NuxtLink>

</header>
    </div>
</template>

<script setup lang="ts">

    // Composable provenant de Supabase et qui donne accès aux informations de l'utilisateur connecté
    const user = useSupabaseUser();

    // Composable qui donne accès au méthode d'authentification de Supabase.
    const supabase = useSupabaseClient();

    // A ce jour il y a un bug dans le module de Supabase pour nuxt si on utilise la méthode classique signout()
    // la déconnexion n'est pas détecter pour le code et le rendu conditionnel ne fonctionne pas donc on utilise cette requête
    //  à la main pour procéder à la déco.
    const logout = async () => {

         const { error } = await supabase.auth.signOut();

        try {
            await $fetch("/api/_supabase/session", {
                method: "POST",
                body: { event: "SIGNED_OUT", session: null },
            });

            user.value = null;

        } catch (error) {

            console.error(error);
        };

        console.log("user disconnected");
        navigateTo("/");
        };

</script>

<!-- Code qui sera utilisé quand le bug sera réparé -->
 

// if(error){
//     console.log(error);
// }