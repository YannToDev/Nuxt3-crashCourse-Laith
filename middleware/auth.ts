// ---- Named Middleware qui permet de restreindre l'accès des routes qui l'utilise uniqument aux 
// personnes connectées ----
export default defineNuxtRouteMiddleware((to,from) =>{

    const user = useSupabaseUser();
        if(user.value){
            return;
        }
            
        return navigateTo("/login");
});




// ---- Global Middleware ----
// 1. il faut renommer le fichier en "auth.global.ts"
// 2. il faut supprimer l'attribut middleware:["auth"] de chaque pages qui utilisaient le named middleware
// 3. on colle le code suivant:

// export default defineNuxtRouteMiddleware((to,from) => {

//     if(to.path.includes("profile")){

//         const user = useSupabaseUser();
//         if(user.value){
//             return;
//         }
//         return navigateTo("/login")
//     }
// })


