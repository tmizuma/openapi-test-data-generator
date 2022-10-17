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
export const employee = {"id":"8h35rsc7tq","companyId":757282,"role":"ENGINEER","name":"John Doe","profile":{"sex":"MALE","hobby":"watching movies"}}
// employee is the same as employee_0
const employee_0 = {"id":"8h35rsc7tq","companyId":757282,"role":"ENGINEER","name":"John Doe","profile":{"sex":"MALE","hobby":"watching movies"}}
const employee_1 = {"id":"92k4v6j6pgo","companyId":687567,"role":"ENGINEER","name":"John Doe","profile":{"sex":"MALE","hobby":"watching movies"}}
const employee_2 = {"id":"53so385bm1g","companyId":483375,"role":"ENGINEER","name":"John Doe","profile":{"sex":"MALE","hobby":"watching movies"}}

export const employeeList = [employee_0,employee_1,employee_2]

// *-- output/Profile.ts --*

//  This file was automatically generated and should not be edited.
export const profile = {"sex":"MALE","hobby":"watching movies"}
// profile is the same as profile_0
const profile_0 = {"sex":"MALE","hobby":"watching movies"}
const profile_1 = {"sex":"MALE","hobby":"watching movies"}
const profile_2 = {"sex":"MALE","hobby":"watching movies"}

export const profileList = [profile_0,profile_1,profile_2]

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