# Knack Schema sanitizer.

The goal is to remove duplicates fields, views, objects and scenes in a Knack application JSON file.

The source is in Typescript

Compile:
    
    npm install
    npm run compile
    
Run tests:
    
    npm run test

Run example:
    
    npm run example


Usage:

    node build/main.js --input=PATH_TO_KNACK_SCHEMA_FILE.json --output=PATH_TO_SANITIZED_SCHEMA.json

## Design choices

A simple solution would have been to use a recursive function. Crawl the schema tree, and for each object of type Array; scan the array, store the key in a hash and delete the duplicate if the same key is found again. 

I do not know enough about the format: maybe a scene needs to display the same record field twice as a label and as a textfield, and maybe some more cleaning can be done (for example making sure that a object who should store a javascript number is not a string due to a front-end error), I've decided to write different sanitizers for different parts of the schema.

File formats evolve and as such I think its best to write a specific loader and sanitizer for each version, the code for this current version is in folder V1.

processSchema in src/processSchema.ts is the most important function. it takes a string representation of a schema and returns the sanitized schema also with information about any problems found.

## Deployment

At the moment it is a nodejs application running on a host but there are different deployment possibilities:

- It could be converted to a docker image and use a mounted folder on the host machine to access the input schema.
- It could get the schema from a s3 bucket and write the result in a different bucket or folder.
- It could be transformed into a HTTP endpoint and accepts schema as a POST request and output the sanitized version.
- It could be transformed into a Lambda and be invoked from a queue.
- It could be turned into a javascript library and integrated with the front-end to sanitize the schema on load and on save...

## Possible critics

the sanitize functions scan the array in reverse and so delete the first object created instead of the second if a duplicate is found. This was done for speed but may have implications I'm not aware of 