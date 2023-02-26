# otdgen: API Test Data Generator with OpenAI

[otdgen](https://www.npmjs.com/package/otdgen) is an open-source tool that generates JavaScript/TypeScript test data from an OpenAPI schema file in YAML format. It provides two options for users:

Generate random test data from an OpenAPI schema file in YAML format
Generate test data using [OpenAI](https://openai.com/) to generate text data for specific schema properties

### Reporting Bugs/Feature Requests

[![tmizuma](https://circleci.com/gh/tmizuma/openapi-test-data-generator.svg?style=svg)](https://github.com/tmizuma/openapi-test-data-generator) [![Open Bugs](https://img.shields.io/github/issues/tmizuma/openapi-test-data-generator/bug?color=d73a4a&label=bugs)](https://github.com/tmizuma/openapi-test-data-generator/issues?q=is%3Aissue+is%3Aopen+label%3Abug) [![Feature Requests](https://img.shields.io/github/issues/tmizuma/openapi-test-data-generator/feature-request?color=ff9001&label=feature%20requests)](https://github.com/tmizuma/openapi-test-data-generator/issues?q=is%3Aissue+label%3Afeature-request+is%3Aopen) [![Closed Issues](https://img.shields.io/github/issues-closed/tmizuma/openapi-test-data-generator/feature-request?color=%2325CC00&label=issues%20closed)](https://github.com/tmizuma/openapi-test-data-generator/issues?q=is%3Aissue+is%3Aclosed+)

### Installation

Install otdgen via npm:

```bash
$ npm install otdgen
```

### Usage

To use otdgen, you'll need an OpenAPI schema file in YAML format and an OpenAI API KEY.

```bash
$ mkdir output # create output folder for test data
$ otdgen generate -i example-openapi.yaml -o output/ -ai true -api-key <Your API_KEY>
```

Example file: [example-openapi.yaml](./example-openapi.yaml)

<details><summary>Output1. Employee.ts</summary><div>

```ts
//  This file was automatically generated and should not be edited.
export const employee = {
	id: '12345',
	companyId: 293093,
	role: 'MANAGER',
	name: 'John Doe',
	registdate: '2017-01-27 05:10:29',
	profile: {
		family_name: 'Smith',
		age: 33,
		address: '123 Main Street, Anytown, USA',
		birthdate: '2003-12-13',
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
	companyId: 293093,
	role: 'MANAGER',
	name: 'John Doe',
	registdate: '2017-01-27 05:10:29',
	profile: {
		family_name: 'Smith',
		age: 33,
		address: '123 Main Street, Anytown, USA',
		birthdate: '2003-12-13',
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
	companyId: 918270,
	role: 'ENGINEER',
	name: 'Jane Smith',
	registdate: '2021-02-08 06:33:25',
	profile: {
		family_name: 'Johnson',
		age: 20,
		address: '456 Maple Avenue, Anytown, USA',
		birthdate: '2020-02-28',
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
	companyId: 943744,
	role: 'ASSISTANT',
	name: 'Jack Johnson',
	registdate: '2006-01-26 05:22:12',
	profile: {
		family_name: 'Williams',
		age: 33,
		address: '789 Oak Street, Anytown, USA',
		birthdate: '2008-03-25',
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
```

</div></details>

<details><summary>Output2. Member.ts</summary><div>

```ts
//  This file was automatically generated and should not be edited.
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
```

</div></details>

<details><summary>Output3. Profile.ts</summary><div>

```ts
//  This file was automatically generated and should not be edited.
export const profile = {
	family_name: 'Smith',
	age: 38,
	address: '123 Main Street, Anytown, USA',
	birthdate: '2002-07-23',
	sex: 'MALE',
	hobby: ['Playing the guitar', 'Painting', 'Gardening']
};
// profile is the same as profile_0
const profile0 = {
	family_name: 'Smith',
	age: 38,
	address: '123 Main Street, Anytown, USA',
	birthdate: '2002-07-23',
	sex: 'MALE',
	hobby: ['Playing the guitar', 'Painting', 'Gardening']
};
const profile1 = {
	family_name: 'Johnson',
	age: 28,
	address: '456 Maple Avenue, Anytown, USA',
	birthdate: '2015-07-26',
	sex: 'FEMALE',
	hobby: ['Playing the guitar', 'Painting', 'Gardening']
};
const profile2 = {
	family_name: 'Williams',
	age: 43,
	address: '789 Oak Street, Anytown, USA',
	birthdate: '2000-10-07',
	sex: 'ELSE',
	hobby: ['Playing the guitar', 'Painting', 'Gardening']
};

export const profileList = [profile0, profile1, profile2];
```

</div></details>

In this example, AI generates test data for the five properties [`id`,`name`,`family_name`,`address`,`hobby`].
It's important to note that **OpenAI generates test data only for string types.** Otherwise, otdgen generates random values from the attribute values (e.g., minimum, maximum, enum) specified in each schema.

```ts
export const profile = {
	family_name: 'Smith', // generated by OpenAI!!
	age: 38, // random value between minimum and maximum
	address: '123 Main Street, Anytown, USA', // generated by OpenAI!!
	birthdate: '2002-07-23', // random value
	sex: 'MALE', // random value from enum definition
	hobby: ['Playing the guitar', 'Painting', 'Gardening'] // generated by OpenAI!!
};
```

`otdgen` generates test data in the output/ folder. If the `-ai` option is not specified, `otdgen` generates random test data.

```bash
# generate test data randomly without OpenAI
$ otdgen generate -i example-openapi.yaml -o output/
```

### Options

| Options                                       | Description                                                                                                                                                                                                                                                                      |                  Default                  | Required |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------: | :------: |
| -i, --input \<file path\>                     | The path to the OpenAPI schema file in YAML format                                                                                                                                                                                                                               |                     -                     |    ●     |
| -o, --output \<output folder path\>           | The output folder for test data folder                                                                                                                                                                                                                                           |                     -                     |    ●     |
| -n, --number-of-array-data \<test data size\> | The size of the test data. This option is limited to a maximum of 10 cases when using the `-ai true` option.                                                                                                                                                                     |                     3                     |    -     |
| -ext, --extension \<output file extension\>   | The output file extension: `.ts` or `.js`.                                                                                                                                                                                                                                       |                   `.ts`                   |    -     |
| -ignore, --ignore \<ignore schema list\>      | A list of schemas that should not generate test data. Please specify comma-separated values. For example: `-ignore Employee,Profile`                                                                                                                                             |                     -                     |    -     |
| -s, --stateless \<true \| false\>             | Setting this option to true ensures that the generated test data is reproducible and has the same values across multiple test runs. This option is strongly recommended when using unit or snapshot tests. Please note that this option is disabled when using the `-ai` option. | true (if `-ai` is not specified or false) |    -     |
| -ai, --ai                                     | This option enables the OpenAI feature, which generates appropriate test data from the schema property names such as hobby, company name, and family name. Please note that you need to provide an API key if you use this option.                                               |                   false                   |    -     |
| -api-key, --api-key                           | If you use the `-ai` option, you must provide your OpenAI API key here.                                                                                                                                                                                                          |                   false                   |    -     |
| -avoid-ai, --avoid-ai                         | This option can be specified when the `-ai` option is true. When using the OpenAI feature, some property names may cause errors. In that case, you can use this option to disable specific properties. For example: `-avoid-ai hobby,company_name`                               |                   false                   |    -     |
| -es, --example-suffix \<true \| false\>       | This option controls whether or not to add the suffix to the test data if the example attribute exists in the YAML file. If this option is true, the `-ai` option is ignored.                                                                                                    | true (if `-ai` is not specified or false) |    -     |

### Contributor

Please contact me!
Twitter： [https://twitter.com/mizuma_t](https://twitter.com/mizuma_t)
