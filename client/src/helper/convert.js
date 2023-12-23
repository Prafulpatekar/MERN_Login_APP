/* Convert Image into base64*/

export const convertBase64 = (file) => {
    return new Promise((resolve,reject)=>{
        const fileReader =  new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () =>{
            resolve(fileReader.result);
        }

        fileReader.onerror = (err)=>{
            reject(err)
        }
    })
}