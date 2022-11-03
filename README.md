# OpenAPI test data generator from OpenApi schema for Javascript/TypeScript (otdgen)

`otdgen` generates JavaScript/TypeScript test data from the OpenApi schema file(yaml) to the folder specified by the argument.

### Reporting Bugs/Feature Requests
[![tmizuma](https://circleci.com/gh/tmizuma/openapi-test-data-generator.svg?style=svg)](https://github.com/tmizuma/openapi-test-data-generator) [![Open Bugs](https://img.shields.io/github/issues/tmizuma/openapi-test-data-generator/bug?color=d73a4a&label=bugs)](https://github.com/tmizuma/openapi-test-data-generator/issues?q=is%3Aissue+is%3Aopen+label%3Abug) [![Feature Requests](https://img.shields.io/github/issues/tmizuma/openapi-test-data-generator/feature-request?color=ff9001&label=feature%20requests)](https://github.com/tmizuma/openapi-test-data-generator/issues?q=is%3Aissue+label%3Afeature-request+is%3Aopen) [![Closed Issues](https://img.shields.io/github/issues-closed/tmizuma/openapi-test-data-generator/feature-request?color=%2325CC00&label=issues%20closed)](https://github.com/tmizuma/openapi-test-data-generator/issues?q=is%3Aissue+is%3Aclosed+)

### Install the CLI

```bash
$ npm install otdgen
```

### Usage

- Example
```bash
$ mkdir output # create output folder
$ otdgen generate -i example-openapi.yaml -o output/
output: ==> output/Employee.ts
output: ==> output/Profile.ts
```

- You can find test codes as follow from openapi yaml file.

```ts
// *-- output/Employee.ts --*

//  This file was automatically generated and should not be edited.
export const employee = {
	"id": "9c0f76ea11",
	"companyId": "999_0",
	"role": "MANAGER",
	"name": "John Doe_0",
	"registdate": "2022-10-03 12:00:00",
	"profile": {
		"age": 40,
		"birthdate": "2026-08-28",
		"sex": "MALE",
		"hobby": "watching movies_0"
	}
}
// employee is the same as employee_0
const employee0 = {
	"id": "9c0f76ea11",
	"companyId": "999_0",
	"role": "MANAGER",
	"name": "John Doe_0",
	"registdate": "2022-10-03 12:00:00",
	"profile": {
		"age": 40,
		"birthdate": "2026-08-28",
		"sex": "MALE",
		"hobby": "watching movies_0"
	}
}
const employee1 = {
	"id": "d1adcc3f59",
	"companyId": "999_1",
	"role": "ENGINEER",
	"name": "John Doe_1",
	"registdate": "2029-09-07 08:08:08",
	"profile": {
		"age": 40,
		"birthdate": "2026-08-28",
		"sex": "MALE",
		"hobby": "watching movies_0"
	}
}
const employee2 = {
	"id": "a7e94f011e",
	"companyId": "999_2",
	"role": "ASSISTANT",
	"name": "John Doe_2",
	"registdate": "2011-11-22 11:59:59",
	"profile": {
		"age": 40,
		"birthdate": "2026-08-28",
		"sex": "MALE",
		"hobby": "watching movies_0"
	}
}

export const employeeList = [employee0,employee1,employee2]

// *-- output/Profile.ts --*

//  This file was automatically generated and should not be edited.
export const profile = {
	"age": 46,
	"birthdate": "2011-04-12",
	"sex": "MALE",
	"hobby": "watching movies_0"
}
// profile is the same as profile_0
const profile0 = {
	"age": 46,
	"birthdate": "2011-04-12",
	"sex": "MALE",
	"hobby": "watching movies_0"
}
const profile1 = {
	"age": 48,
	"birthdate": "2017-12-22",
	"sex": "FEMALE",
	"hobby": "watching movies_1"
}
const profile2 = {
	"age": 32,
	"birthdate": "2024-04-09",
	"sex": "ELSE",
	"hobby": "watching movies_2"
}

export const profileList = [profile0,profile1,profile2]

```

Two variables will be generated. The first one is the test data based on a schema definition in OpenApi.
The second one is an array type data of the first one.
You can control the number of elements in the array with `-n` option.(default: 3)


- `example-openapi.yaml` as source
```yaml
openapi: 3.0.0
components:
  schemas:
    Employee:
      title: Employee
      type: object
      description: Employee Info
      properties:
        id:
          type: string
          minLength: 5
          maxLength: 10
        companyId:
          type: number
          example: 999
        role:
          type: string
          example: ENGINEER
          enum:
            - MANAGER
            - ENGINEER
            - ASSISTANT
        name:
          type: string
          example: John Doe
        registdate:
          type: string
          format: date-time
        profile:
          $ref: '#/components/schemas/Profile'
    Profile:
      title: Profile
      type: object
      properties:
        age:
          type: number
          minimum: 18
          maximum: 50
        birthdate:
          type: string
          format: date
        sex:
          type: string
          enum:
            - MALE
            - FEMALE
            - ELSE
        hobby:
          type: string
          example: watching movies
```

### Options

| Options | Description |  Default |Required
| --- | --- | :---: | :---: |
| -i, --input \<OpenApi yaml file path\> | The path of OpenApi yaml file | - |● |
| -o, --output \<Typescript output path\> |The path of output folder | - |● |
| -n, --number-of-array-data \<the number of array type test data\> | The number of array type test data | 3 | - |
| -ext, --extension \<output file extension\> | output file extension `.ts` \| `.js` | `.ts` | - |
| -ignore, --ignore \<ignore schema list\> | ignore schema list separated by commas `e.g) -ignore Employee,Profile` | - | - |
| -s, --stateless \<true \| false\> | You can generate stateless random data. This option ensures to return same sample data when being given the same yaml definition. | true | - |
