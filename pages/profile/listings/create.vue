<!-- View qui correspond à la route /profile/listings/create -->
<template>
    <div>
        <div class="mt-24">
            <h1 class="text-6xl">Create a New Listing</h1>
        </div>

        <div class="shadow-md rounded-md p-3 md:mt-5 flex flex-col items-center md:flex-row md:flex-wrap md:justify-between">
            <CarAddSelect 
                title="Make"
                :options="makes"
                name="make"
                @changeInput="onChangeInput"
            />

            <CarAddInput 
                v-for="input in inputs"
                :key="input.id"
                :title="input.title"
                :name="input.name"
                :placeholder="input.placeholder"
                @changeInput="onChangeInput"
                
            />

            <CarAddTextarea 
                 title="Description"
                name="description"
                placeholder="Add a description.."
                @changeInput="onChangeInput"
            />

            <CarAddImage
                @changeInput="onChangeImageInput" 
            />
        </div>  
    </div>
</template>

<script setup lang="ts">

    const { makes } = useCars();

    // Composable qui contient toutes les propriétés des inputs de la page create
    const { inputs } = useCreateInputs(); 
   

    const info = useState('adInfo',() =>{
        return {
            make:"",
            model:"",
            year:"",
            miles:"",
            price:"",
            city:"",
            seats:"",
            features:"",
            description:"",
            image:{} || null
        }
    });

    watchEffect(()=>console.log(info.value))
    
    definePageMeta({
        layout: 'custom',
        middleware: ['auth']
    });

    // Permet de préciser le type des données émise par les composants enfants CarAddSelect CarAddInput et CarAddTextArea
    // ils envoient tous des données de type string d'ou une interface commune.
    interface Data {
        name:string,
        state:string 
    };

    // Pemet de préciser le type des données émise par le component enfant CarAdImage et qui sont reçues ici..
    // on crée une interface que pour lui car c'est le seul à envoyer un objet en donnée, objet correspondant à l'image. 
    interface DataImg {
        name: string,
        file: object
    };


    // Méthode déclenchée à la reception de l'émit du composant enfant, on change la valeur du champ de lobject 'info' qui correspond à name
    // par la valeur du state transmis
    const onChangeInput = (event: Data ) => {

        info.value[event.name as keyof typeof info.value] = event.state;
    };


    const onChangeImageInput = (event: DataImg) => {

        (info.value[event.name as keyof typeof info.value] as object) = event.file;
        console.log(event.file)
    };

</script>
