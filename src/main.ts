import * as fs from "fs"
import {processSchema} from "./processSchema";
import {TKnackProcessSchemaResult} from "./TKnackProcessSchemaResult";
import {printUsage} from "./printUsage";

// extract the input and output parameters from arguments
function loadParameters(argv: string[]): {success: boolean, input: string, output: string} {
    let ret = {
        success: false,
        input: "",
        output: ""
    }
    argv.forEach((arg) => {
        if (arg.startsWith("--input=")) {
            ret.input = arg.replace("--input=", "");
            if (ret.input.startsWith("\"")) {
                ret.input = ret.input.substring(1, ret.input.length - 2);
            }
        }
        if (arg.startsWith("--output=")) {
            ret.output = arg.replace("--output=", "");
            if (ret.output.startsWith("\"")) {
                ret.output = ret.output.substring(1, ret.output.length - 2);
            }
        }
    });
    if (ret.input !== "" && ret.output !== "") {
        ret.success = true;
    }
    return ret;
}

// This is the entry-point
// we check the arguments,
// load the input schema from disk,
// detect the schema version,
// sanitize it and save it to disk
function main(argv: string[]) {
    const params = loadParameters(argv);
    if (params.success === false) {
        return printUsage();
    }
    const input = params.input;
    const output = params.output;

    console.log("INPUT: " + input);
    console.log("OUTPUT: " + output);
    let data = "";
    try {
        data = fs.readFileSync(input).toString();
    } catch (e) {
        console.log(e.message);
        return;
    }
    let result: TKnackProcessSchemaResult = processSchema(data);
    if (result.success === false || result.schema === undefined) {
        console.log(result.errorMessage);
        return;
    }
    result.notifications.forEach((n) => {
        console.log(n);
    });
    fs.writeFileSync(output, JSON.stringify(result.schema));

}


main(process.argv);

