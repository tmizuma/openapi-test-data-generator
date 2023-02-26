# otdgen: API Test Data Generator with OpenAI

[otdgen](https://www.npmjs.com/package/otdgen) は、YAML 形式の OpenAPI スキーマファイルから JavaScript/TypeScript 形式のテストデータを生成するオープンソースのツールです。`otdgen`は以下 2 つの方法を提供します。

- YAML 形式の OpenAPI スキーマファイルからランダムにテストデータを生成する
- [OpenAI](https://openai.com/) API を使ってスキーマのプロパティに応じたテストデータを生成する

### Reporting Bugs/Feature Requests

[![tmizuma](https://circleci.com/gh/tmizuma/openapi-test-data-generator.svg?style=svg)](https://github.com/tmizuma/openapi-test-data-generator) [![Open Bugs](https://img.shields.io/github/issues/tmizuma/openapi-test-data-generator/bug?color=d73a4a&label=bugs)](https://github.com/tmizuma/openapi-test-data-generator/issues?q=is%3Aissue+is%3Aopen+label%3Abug) [![Feature Requests](https://img.shields.io/github/issues/tmizuma/openapi-test-data-generator/feature-request?color=ff9001&label=feature%20requests)](https://github.com/tmizuma/openapi-test-data-generator/issues?q=is%3Aissue+label%3Afeature-request+is%3Aopen) [![Closed Issues](https://img.shields.io/github/issues-closed/tmizuma/openapi-test-data-generator/feature-request?color=%2325CC00&label=issues%20closed)](https://github.com/tmizuma/openapi-test-data-generator/issues?q=is%3Aissue+is%3Aclosed+)

### Installation

npm を使ったインストール:

```bash
$ npm install otdgen
```

### Usage

`otdgen`を使用するには以下が必要です

- OpenAPI 準拠の YAML ファイル.
- OpenAI の API KEY

```bash
$ mkdir output # 出力フォルダを作成します
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

この例では、AI は [`id`,`name`,`family_name`,`address`,`hobby`] の 5 つの属性のテストデータについて自動で生成します。
重要なことは **AI で出力されるテストデータは String 形式のプロパティのみ** である点です。 その他については, スキーマの属性に応じてランダムな値が生成されます。 (例 minimum 属性, maximum 属性, enum 属性 等)

```ts
export const profile = {
	family_name: 'Smith', // AIにより生成!!
	age: 38, // int型のmin-maxの範囲でランダムに生成
	address: '123 Main Street, Anytown, USA', // AIにより生成!!
	birthdate: '2002-07-23', // date-timeの値でランダムに生成
	sex: 'MALE', // enumで指定された値でランダムに生成
	hobby: ['Playing the guitar', 'Painting', 'Gardening'] // AIにより生成!!
};
```

成果物は`output/`フォルダに出力されます。
もし`-ai` オプションを指定しない場合は、全ての値がランダムに生成されます。

```bash
# generate test data randomly without OpenAI
$ otdgen generate -i example-openapi.yaml -o output/
```

### Options

| Options                                       | Description                                                                                                                                                                                                                                                                                  |                   Default                    | Required |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------: | :------: |
| -i, --input \<file path\>                     | YAML 形式の OpenAPI ファイルのパスス                                                                                                                                                                                                                                                         |                      -                       |    ●     |
| -o, --output \<output folder path\>           | テストデータの出力フォルダ                                                                                                                                                                                                                                                                   |                      -                       |    ●     |
| -n, --number-of-array-data \<test data size\> | テストデータのサイズ <br/>\*`-ai`オプションが指定されている場合、この値は最大 10 に制限されます。                                                                                                                                                                                            |                      3                       |    -     |
| -ext, --extension \<output file extension\>   | 出力ファイルの拡張子 `.ts` \| `.js`                                                                                                                                                                                                                                                          |                    `.ts`                     |    -     |
| -ignore, --ignore \<ignore schema list\>      | テストデータの出力を無視したいスキーマのリスト(カンマ区切り) <br/> `例) -ignore Employee,Profile`                                                                                                                                                                                            |                      -                       |    -     |
| -s, --stateless \<true \| false\>             | このオプションに`true`を指定することで、ランダムデータの冪等性が担保されます。Unit テストやスナップショットテストで利用する際は、このオプションを`true`にすることを強く推奨します。<br/> \* `-ai`オプションが`true`の場合、このオプションは無効となります。                                  | true / false (`-ai`オプションが true の場合) |    -     |
| -ai, --ai                                     | このオプションを true に設定すると、OpenAI がスキーマのプロパティ名(趣味, 会社名, 苗字等)から適切なテストデータを生成します。このオプションが true の場合、`-api-key` を指定する必要ががあります。                                                                                           |                    false                     |    -     |
| -api-key, --api-key                           | OpenAPI の API KEY                                                                                                                                                                                                                                                                           |                    false                     |    -     |
| -avoid-ai, ---avoid-ai                        | このオプションは `-ai` オプションが true のときに指定できます。 otdgen は OpenAPI のレスポンスに依存しているため、プロパティ名によってはエラーが発生することがあります。その場合は、このオプションでエラーが発生した対象のプロパティを無効にしてください。例) `-avoid-ai hobby,company_name` |                    false                     |    -     |
| -es, --example-suffix \<true \| false\>       | yaml に example 属性が存在する場合、テストデータにサフィックスを付加するかどうかを指定します。この属性は`-ai`がオプションが true の場合無視されます。                                                                                                                                        |                     true                     |    -     |

### Contributor

Twitter： [https://twitter.com/mizuma_t](https://twitter.com/mizuma_t)
