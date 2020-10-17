export function filesize(size) {
     const i = Math.floor(Math.log(size) / Math.log(1024));
     return (
          (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
     );
}

// Transforms key/value pairs to FormData() object
export function toFormData(values = {}, method = 'POST') {
     const formData = new FormData();
     for (const field of Object.keys(values)) {
          if(values[field] == 'true'){
               formData.append(field, 1);
          }else if(values[field] == 'false'){
               formData.append(field, 0);
          }else{
               formData.append(field, values[field]);
          }
     }

     // NOTE: When working with Laravel PUT/PATCH requests and FormData
     // you SHOULD send POST request and fake the PUT request like this.
     // More info: http://stackoverflow.com/q/50691938
     if (method.toUpperCase() === 'PUT') {
          formData.append('_method', 'PUT');
     }
     console.log('formData', formData);
     return formData;
}

export function createSlug(string){
     if(string.length == 0){
          return "";
     }
     string = string.replace(' ', '-');
     var diactricMap = {
          "á": "a",
          "à": "a",
          "ä": "a",
          "â": "a",
          "Á": "A",
          "À": "A",
          "Â": "A",
          "Ä": "A",
          "é": "e",
          "è": "e",
          "ë": "e",
          "ê": "e",
          "É": "E",
          "È": "E",
          "Ê": "E",
          "Ë": "E",
          "í": "i",
          "ì": "i",
          "ï": "i",
          "î": "i",
          "Í": "I",
          "Ì": "I",
          "Ï": "I",
          "Î": "I",
          "ö": "o",
          "ó": "o",
          "ò": "o",
          "ő": "o",
          "ô": "o",
          "ö": "o",
          "Ö": "O",
          "Ó": "O",
          "Ő": "O",
          "Ô": "O",
          "Ö": "O",
          "ü": "u",
          "ú": "u",
          "ù": "u",
          "ű": "u",
          "ü": "u",
          "û": "u",
          "Ü": "U",
          "Ú": "U",
          "Ù": "U",
          "Ű": "U",
          "Û": "U",
          "ç": "c",
          "Ç": "C",
          "'":"",
          "’":"",
          " ":"-",
          ".":"-"
     };

     var diactrics = Object.keys(diactricMap);
     for (var diactricIndex = 0; diactricIndex < diactrics.length; diactricIndex++) {
          var from = diactrics[diactricIndex];
          var to = diactricMap[from];
          string = string.replace(from, to);
     }
     return string.toLowerCase().replace(/[^a-z0-9_-]/gi,'');
}

export function isPar(a){
     let b = a % 2;
     if(b == 0){
          return true;
     }else{
          return false;
     }
}

export function can(user, permission){
     if(user.can.indexOf(permission) > -1){
          return true;
     }
     return false;
}
