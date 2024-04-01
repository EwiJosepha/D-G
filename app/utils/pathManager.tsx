'use-client'
let verify: any;

if (typeof localStorage !== "undefined") {
    verify = JSON.parse(localStorage.getItem("decoded") as string);
}

export { verify };
