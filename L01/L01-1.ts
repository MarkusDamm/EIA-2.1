namespace asdf {

    let v1 = { "zahl": 7, "wahr": true, text: "Hallo" };
    let v2 = v1;
    console.log(v1, v2);
    v1["wahr"] = false;
    console.log(v1, v2);
}
