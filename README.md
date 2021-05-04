# Frontend

## Description

This code is purely frontend code used in creating the app.

## Stack

- React, TypeScript, Bootstrap

## Linting

- no-use-before-define is turned off because there is an error in react-scripts @typescript-eslint version
- "@typescript-eslint/no-use-before-define": ["error"] is turned off because there is an error in react-scripts @typescript-eslint version
- react/no-array-index-key is off for the same reasons we were told to turn it off in project 2
- react-hooks/exhaustive-deps is off for the same reasons we were told to turn it off in project 2
- react/jsx-filename-extension is off for the same reasons we were told to turn it off in project 2
- import/no-unresolved and import/extensions turned off because they directly conflict with a typescript error for not putting .tsx or .ts as at the end of imports
- camelcase if turned off because the jwt-decode package cant be imported with camelcase, code cant be run without turning off this error
- import/prefer-default-export, no-useless-constructor are disabled in all of the MODELS files because they needed to be defined how they are to work with the rest of the code

### FOLLOWING ARE TEMPORARY DISABLED FOR TESTING PURPOSES:

- @typescript-eslint/no-unused-vars
- no-unused-vars
- no-empty-function
