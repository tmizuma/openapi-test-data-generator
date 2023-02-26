# API test data generator with OpenAI (otdgen)

`otdgen` is an open-source tool that generates JavaScript/TypeScript format test data from an OpenAPI schema file in YAML format. It offers two choices for users:

- Generate random test data from OpenAPI schema files in YAML format
- Generate test data according to schema properties using [OpenAI](https://openai.com/) API (Preview)

### Reporting Bugs/Feature Requests

[![tmizuma](https://circleci.com/gh/tmizuma/openapi-test-data-generator.svg?style=svg)](https://github.com/tmizuma/openapi-test-data-generator) [![Open Bugs](https://img.shields.io/github/issues/tmizuma/openapi-test-data-generator/bug?color=d73a4a&label=bugs)](https://github.com/tmizuma/openapi-test-data-generator/issues?q=is%3Aissue+is%3Aopen+label%3Abug) [![Feature Requests](https://img.shields.io/github/issues/tmizuma/openapi-test-data-generator/feature-request?color=ff9001&label=feature%20requests)](https://github.com/tmizuma/openapi-test-data-generator/issues?q=is%3Aissue+label%3Afeature-request+is%3Aopen) [![Closed Issues](https://img.shields.io/github/issues-closed/tmizuma/openapi-test-data-generator/feature-request?color=%2325CC00&label=issues%20closed)](https://github.com/tmizuma/openapi-test-data-generator/issues?q=is%3Aissue+is%3Aclosed+)

### Installation

You can install otdgen via npm:

```bash
$ npm install otdgen
```

### Usage

To use otdgen, you need

- OpenAPI schema file in YAML format.
- API KEY for OpenAI

```bash
$ mkdir output # create output folder for test data
$ otdgen generate -i example-openapi.yaml -o output/ -ai true -api-key "sk-xxx..."
```

Example file: [example-openapi.yaml](./example-openapi.yaml)

<details><summary>Output</summary><div>

```ts
//  This file was automatically generated and should not be edited.
export const employee = {
	id: '12345',
	companyId: 282168,
	role: 'MANAGER',
	name: 'John Doe',
	registdate: '2008-12-12 08:46:41',
	profile: {
		age: 24,
		address: '123 Main Street, Anytown, USA',
		birthdate: '2015-02-02',
		sex: 'MALE',
		hobby: ['Playing the guitar', 'Painting', 'Gardening']
	},
	department: {
		id: '12345',
		employee: 'Marketing'
	},
	submemners: [
		{
			id: '12345',
			name: 'John Doe'
		},
		{
			id: '67890',
			name: 'Jane Smith'
		},
		{
			id: 'abcde',
			name: 'Jack Johnson'
		}
	]
};
// employee is the same as employee_0
const employee0 = {
	id: '12345',
	companyId: 282168,
	role: 'MANAGER',
	name: 'John Doe',
	registdate: '2008-12-12 08:46:41',
	profile: {
		age: 24,
		address: '123 Main Street, Anytown, USA',
		birthdate: '2015-02-02',
		sex: 'MALE',
		hobby: ['Playing the guitar', 'Painting', 'Gardening']
	},
	department: {
		id: '12345',
		employee: 'Marketing'
	},
	submemners: [
		{
			id: '12345',
			name: 'John Doe'
		},
		{
			id: '67890',
			name: 'Jane Smith'
		},
		{
			id: 'abcde',
			name: 'Jack Johnson'
		}
	]
};
const employee1 = {
	id: '67890',
	companyId: 318130,
	role: 'ENGINEER',
	name: 'Jane Smith',
	registdate: '2001-03-04 21:03:25',
	profile: {
		age: 33,
		address: '456 Maple Avenue, Anytown, USA',
		birthdate: '2018-03-29',
		sex: 'MALE',
		hobby: ['Playing the guitar', 'Painting', 'Gardening']
	},
	department: {
		id: '67890',
		employee: 'Human Resouce'
	},
	submemners: [
		{
			id: '12345',
			name: 'John Doe'
		},
		{
			id: '67890',
			name: 'Jane Smith'
		},
		{
			id: 'abcde',
			name: 'Jack Johnson'
		}
	]
};
const employee2 = {
	id: 'abcde',
	companyId: 367469,
	role: 'ASSISTANT',
	name: 'Jack Johnson',
	registdate: '2006-07-21 11:16:18',
	profile: {
		age: 28,
		address: '789 Oak Street, Anytown, USA',
		birthdate: '2017-06-13',
		sex: 'MALE',
		hobby: ['Playing the guitar', 'Painting', 'Gardening']
	},
	department: {
		id: 'abcde',
		employee: 'Development'
	},
	submemners: [
		{
			id: '12345',
			name: 'John Doe'
		},
		{
			id: '67890',
			name: 'Jane Smith'
		},
		{
			id: 'abcde',
			name: 'Jack Johnson'
		}
	]
};

export const employeeList = [employee0, employee1, employee2];

// This file was automatically generated and should not be edited.
export const member = {
	id: '12345',
	name: 'John Doe'
};
// member is the same as member_0
const member0 = {
	id: '12345',
	name: 'John Doe'
};
const member1 = {
	id: '67890',
	name: 'Jane Smith'
};
const member2 = {
	id: 'abcde',
	name: 'Jack Johnson'
};

export const memberList = [member0, member1, member2];

// This file was automatically generated and should not be edited.
export const profile = {
	age: 36,
	address: '123 Main Street, Anytown, USA',
	birthdate: '2020-07-08',
	sex: 'MALE',
	hobby: ['Playing the guitar', 'Painting', 'Gardening']
};
// profile is the same as profile_0
const profile0 = {
	age: 36,
	address: '123 Main Street, Anytown, USA',
	birthdate: '2020-07-08',
	sex: 'MALE',
	hobby: ['Playing the guitar', 'Painting', 'Gardening']
};
const profile1 = {
	age: 18,
	address: '456 Maple Avenue, Anytown, USA',
	birthdate: '2012-04-11',
	sex: 'FEMALE',
	hobby: ['Playing the guitar', 'Painting', 'Gardening']
};
const profile2 = {
	age: 38,
	address: '789 Oak Street, Anytown, USA',
	birthdate: '2009-12-03',
	sex: 'ELSE',
	hobby: ['Playing the guitar', 'Painting', 'Gardening']
};

export const profileList = [profile0, profile1, profile2];
```

</div></details>

In this example, AI generates test data for the four properties [`id`,`name`,`address`,`hobby`].
The important thing is **AI generates test data only for string type.** Otherwise, it generates random values from the attribute values (e.g. minimum, maximum, enum) specified in each schema.

```ts
export const profile = {
	age: 36, // randomly generated by value of type int
	address: '123 Main Street, Anytown, USA', // generated by !!
	birthdate: '2020-07-08', // randomly generated by date-time value
	sex: 'MALE', // randomly generated with the value specified in enum
	hobby: [
		'Playing the guitar', // generated by OpenAI!!
		'Painting', // generated by OpenAI!!
		'Gardening' // generated by OpenAI!!
	]
};
```

This will output generated test data to `output/` folder.
If the `-ai` option is not specified, otdgen will generate random test data.

```bash
# generate test data randomly without OpenAI
$ otdgen generate -i example-openapi.yaml -o output/
```

### Options

| Options                                       | Description                                                                                                                                                                                                                                                                           |             Default             | Required |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----------------------------: | :------: |
| -i, --input \<file path\>                     | The path of OpenAPI schema file in YAML format file                                                                                                                                                                                                                                   |                -                |    ●     |
| -o, --output \<output folder path\>           | Output folder for test data folder                                                                                                                                                                                                                                                    |                -                |    ●     |
| -n, --number-of-array-data \<test data size\> | Test Data size. <br/>\*Limited to a maximum of 10 cases when using the `-ai` option                                                                                                                                                                                                   |                3                |    -     |
| -ext, --extension \<output file extension\>   | output file extension `.ts` \| `.js`                                                                                                                                                                                                                                                  |              `.ts`              |    -     |
| -ignore, --ignore \<ignore schema list\>      | Schema list that does not generate test data. Please specify comma-separated. <br/> `e.g) -ignore Employee,Profile`                                                                                                                                                                   |                -                |    -     |
| -s, --stateless \<true \| false\>             | Setting this option to `true` ensures power equality of random data; it is strongly recommended to set this option to `true` when using Unit or snapshot tests. <br/> \*If ai option is true, this option will be disabled.                                                           | true / false (if `-ai` is true) |    -     |
| -ai, --ai                                     | OpenAI will generate the appropriate test data from the schema property names such as hobby, company name, family name. If this option is set to true, then `-api-key` must be specified.                                                                                             |              false              |    -     |
| -api-key, --api-key                           | OpenAPI KEY                                                                                                                                                                                                                                                                           |              false              |    -     |
| -avoid-ai, ---avoid-ai                        | This option can be specified when the `-ai` option is true. otdgen depends on the OpenAPI response, therefore errors may occur with certain property names. In that case, disable the target property using this option where the error occurred.(e.g `-avoid-ai hobby,company_name`) |              false              |    -     |
| -es, --example-suffix \<true \| false\>       | If the example attribute exists in yaml, whether or not the suffix is added to the test data. This attribute `-ai` is ignored if the option is true.                                                                                                                                  |              true               |    -     |

### Contributor

Please contact me!
Twitter： [https://twitter.com/mizuma_t](https://twitter.com/mizuma_t)
