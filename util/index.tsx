export const removeChars = (s:string) => {
    return s.replace(/&quot;/g, '"')
     .replace(/&#039;/g, "'")
     .replace(/&amp;/g, "&")
     .replace(/&sup2;:/g, "")

}