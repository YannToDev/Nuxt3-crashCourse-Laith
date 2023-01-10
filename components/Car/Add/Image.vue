<template>
    <div class= "grid md:col-span-5 offset-1 mt-2 w-full">
        <label
            for="" 
            class="text-cyan-500 mb-1 text-sm"
        >
            Image
        </label>

        <form class="mt-2">
            <div class="form-group">
                <div class="relative">
                    <input
                        @change="onImageUpload" 
                        type="file"
                        accept="image/*" 
                        class="opacity-1 absolute cursor-pointer"
                    >
                    <span class="cursor-pointer">Browser File</span>
                </div>

                <div
                    v-if="image.preview" 
                    class="border p-2 mt-3 w-full"
                >
                    <NuxtImg 
                        :src="image.preview"
                    />
                </div>

            </div>
        </form>

    </div>
</template>

<script setup lang="ts">

    const image = useState("carImage", () => {
        return {
            preview:"",
            image: {}
        }
    });


    const emits = defineEmits<{
        (event: 'changeInput',prefix:{file:object, name:string}): void
    }>();

    // 1. On récupère notre input qui est la cible(target) de notre event du DOM.
    // 2. On vérifie si input.files existe, autrement dit si on a bien télécharger une image depuis notre input
    // 
    // 4. on enregistre l'image en elle même, ses props sont contenues dans le premier élément retourné par l'objet input.files, le second est juste la length.
    // 5. ensuite on va récupérer l'URL ainsi que l'image en elle même grâce à la méthode readAsDataUtl() de FileReader.
    // 6. on envoi un émit qui contient le nom de l'émit, le fichier contenant l'image et ses caractéristiques aisi que le nom de propriétés à modifier
    //   dans le useSrate info , à savoir ici le champ "image"
    const onImageUpload = (event :Event) => {

        const input = event.target as HTMLInputElement;

        if(input.files){

            const reader = new FileReader();
            reader.onload = (e) => {
                image.value.preview = e.target?.result as string;
            };
            
            image.value.image = input.files[0] as Blob;
            
            reader.readAsDataURL(input.files[0]);

            emits("changeInput",{file:input.files[0],name:"image"})
        }
    };

</script>
