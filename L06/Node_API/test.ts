namespace L06_NodeAPI {
    // console.log(process.argv);

    process.addListener("exit", handleExit);

    function handleExit(_event: Event): void {
        console.log("Bye " + process.argv[2]);
    }

}