# OpenAPI test data generator from OpenApi schema for Javascript/TypeScript (otdgen)

`otdgen`はOpenApi(yaml)のスキーマ定義からJavaScript/TypeScriptのテストデータを生成します。

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

- OpenApiのスキーマ定義から以下のようなファイルを生成します。

```ts
// *-- output/Employee.ts --*

//  This file was automatically generated and should not be edited.
export const employee = {
	"id": "63db489e5f",
	"companyId": "999_0",
	"role": "ENGINEER_0",
	"name": "John Doe_0",
	"registdate": "2002-11-17 11:47:47",
	"profile": {
		"age": 46,
		"birthdate": "2011-04-12",
		"sex": "MALE",
		"hobby": "watching movies_0"
	}
}
// employee is the same as employee_0
const employee0 = {
	"id": "63db489e5f",
	"companyId": "999_0",
	"role": "ENGINEER_0",
	"name": "John Doe_0",
	"registdate": "2002-11-17 11:47:47",
	"profile": {
		"age": 46,
		"birthdate": "2011-04-12",
		"sex": "MALE",
		"hobby": "watching movies_0"
	}
}
const employee1 = {
	"id": "f9983a8547",
	"companyId": "999_1",
	"role": "ENGINEER_1",
	"name": "John Doe_1",
	"registdate": "2015-10-15 04:04:04",
	"profile": {
		"age": 48,
		"birthdate": "2017-12-22",
		"sex": "MALE",
		"hobby": "watching movies_0"
	}
}
const employee2 = {
	"id": "dea61a71e5",
	"companyId": "999_2",
	"role": "ENGINEER_2",
	"name": "John Doe_2",
	"registdate": "2022-01-08 22:22:22",
	"profile": {
		"age": 32,
		"birthdate": "2024-04-09",
		"sex": "MALE",
		"hobby": "watching movies_0"
	}
}

export const employeeList = [employee0,employee1,employee2]

// *-- output/Profile.ts --*

//  This file was automatically generated and should not be edited.
export const profile = {
	"age": 34,
	"birthdate": "2000-06-30",
	"sex": "MALE",
	"hobby": "watching movies_0"
}
// profile is the same as profile_0
const profile0 = {
	"age": 34,
	"birthdate": "2000-06-30",
	"sex": "MALE",
	"hobby": "watching movies_0"
}
const profile1 = {
	"age": 29,
	"birthdate": "2013-01-07",
	"sex": "FEMALE",
	"hobby": "watching movies_1"
}
const profile2 = {
	"age": 36,
	"birthdate": "2005-02-03",
	"sex": "ELSE",
	"hobby": "watching movies_2"
}

export const profileList = [profile0,profile1,profile2]

```

ここでは2つの変数が生成されます。一つは、OpenApiのスキーマ定義に基づくテストデータです。二つ目は、一つ目の変数の配列型を生成します。この配列の要素数(テストデータの件数)は`-n`オプションでコントロールが可能です。(デフォルトは3)

- 定義ファイル `example-openapi.yaml`
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
| -i, --input \<OpenApi yaml file path\> | OpenApiのスキーマファイルのパス | - |● |
| -o, --output \<Typescript / JavasSript output path\> | tsファイル、もしくはjsファイルの出力先フォルダパス | - |● |
| -n, --number-of-array-data \<the number of array type test data\> | テストデータ配列の要素数 | 3 | - |
| -ext, --extension \<output file extension\> | 出力拡張子 `.ts` \| `.js` | `.ts` | - |
| -ignore, --ignore \<ignore schema list\> | 出力を無視したいスキーマリスト(カンマ区切り) `e.g) -ignore Employee,Profile` | - | - |
| -s, --stateless \<true \| false\> | ステートレスなランダムデータを生成することができます。このオプションは、同じyaml定義が与えられたときに、同じサンプルデータを返すことを保証します。 | true | - |
