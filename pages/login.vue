<template>
    <div class="mt-10">
        <h1 class="text-5xl font-semibold mb-7">Log in</h1>

        <button
            @click="login"
            class="bg-red-400 p-3 rounded-md text-white font-bold">
            Login With Github
        </button>
    </div>
    {{ user }}
</template>

<script setup lang="ts">

    // Composable qui donne accès au méthode d'authentification de Supabase.
    const supabase = useSupabaseClient();

    // Composable provenant de Supabase et qui donne accès aux informations de l'utilisateur connecté
    const  user = useSupabaseUser();

    // Méthode pour se connecter à l'aide du client de Supabase
    const login = async() =>{

        const { error } = await supabase.auth.signInWithOAuth({
            provider:"github"
        });
        
        if(error){
           console.log(error);
        }
    };

    definePageMeta({
        layout:'custom'
    });

</script>




<!-- <div class ="flex flex-col gap-y-10 md:flex-row md:justify-between">

    <div>
        <h1>Log in with your Githut Account</h1>
        <button
            v-if="!user"
            @click="login"
            class="py-2 px-4 mt-5 bg-blue-400 rounded-md"
        >
            Login with github
        </button>
        <button 
            v-if="user" 
            @click="logout" 
            class="py-2 px-4 mt-5 bg-blue-400 rounded-md"
            >
                Logout
        </button>
    </div>

    <div 
        class="bg-gray-200 flex flex-col justify-center items-center py-2 px-4 rounded-md"
        v-if="user"
    >
        <p>{{ userName }}</p>
        <p>{{ userEmail }}</p>
    </div>

</div> -->


   const userName = computed(() => {
        return user.value?.user_metadata.full_name;
    });


    const userEmail = computed(() => {
        return user.value?.user_metadata.email;
    });



    const login = async() => {

        const {error} = await supabase.auth.signInWithOAuth({
            provider: 'github',
        });

        if(error){
            console.log(error)
        }
    };


    const logout = async () => {

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error(error);
            return;
        };

        // permer de corriger un bug, on voit toujours l'user connecté apres un refresh
        try {
            await $fetch("/api/_supabase/session", {
                method: "POST",
                body: { event: "SIGNED_OUT", session: null },
        });

            user.value = null;

        } catch (error) {

            console.error(error);
        };
         await navigateTo("/");
    };
