namespace L06_NodeAPI {
    process.addListener("exit", handleExit);

    function handleExit(_event: Event): void {
        console.log("Bye " + process.argv[2]);
    }
}