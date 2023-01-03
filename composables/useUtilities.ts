// ------ Composable qui reçoit un string en paramètre et qui met sa 1ère lettre en majuscule ------

export const useUtilities = () => {

    function toTitleCase(str: string): string {

        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
    }

    return{

        toTitleCase
    }
}