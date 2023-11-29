import moment from "moment";
export function calculateAge(date) {
    date = date.split("/").reverse().join("-");
    var years = moment().diff(date, 'years');
    return years;
}

export const upperLowerCharacter = (nam) => {
    let t = nam.split(" ");
    let str=t[0].toLowerCase();
    for(let i=1; i< t.length; i++){
       str += t[i].charAt(0).toUpperCase() + t[i].slice(1).toLowerCase();
    }
    return str
} 