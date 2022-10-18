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
export const employee = {"id":"w6i0d3kn","companyId":277202,"role":"ENGINEER","name":"John Doe","profile":{"age":48,"sex":"ELSE","hobby":"watching movies"}}
// employee is the same as employee_0
const employee0 = {"id":"w6i0d3kn","companyId":277202,"role":"ENGINEER","name":"John Doe","profile":{"age":48,"sex":"ELSE","hobby":"watching movies"}}
const employee1 = {"id":"o6nog0r","companyId":531517,"role":"ENGINEER","name":"John Doe","profile":{"age":30,"sex":"MALE","hobby":"watching movies"}}
const employee2 = {"id":"l6p52q","companyId":181853,"role":"ENGINEER","name":"John Doe","profile":{"age":38,"sex":"FEMALE","hobby":"watching movies"}}

export const employeeList = [employee0,employee1,employee2]

// *-- output/Profile.ts --*

//  This file was automatically generated and should not be edited.
export const profile = {"age":29,"sex":"ELSE","hobby":"watching movies"}
// profile is the same as profile_0
const profile0 = {"age":29,"sex":"ELSE","hobby":"watching movies"}
const profile1 = {"age":20,"sex":"ELSE","hobby":"watching movies"}
const profile2 = {"age":22,"sex":"ELSE","hobby":"watching movies"}

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