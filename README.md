# OpenAPI test data generator from OpenApi schema for Javascript (otdgen)

The script outputs test data from the OpenApi schema file to the folder specified by the argument.

### Install the CLI

```bash
$ npm install otdgen
```

### Usage

- Example
```bash
$ mkdir output # create output folder
$ osamgem generate -i example-openapi.yaml -o output/
output: ==> output/Employee.ts
output: ==> output/Profile.ts
```

- You can find test codes as follow.
```ts
// output/Employee.ts
export const employee = {"id":"4aajop647sg","companyId":271773,"role":"ENGINEER","name":"John Doe","profile":{"sex":"MALE","hobby":"watching movies"}}
export const employeeList = [employee]

// output/Profile.ts
export const profile = {"sex":"MALE","hobby":"watching movies"}
export const profileList = [profile]

```

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

```bash
$ osamgem generate -help
Usage: index generate [options]

outputs test data from the OpenApi schema file to the folder specified by the argument.

Options:
  -i, --input <path>
  -o, --output <path>
  -h, --help           display help for command
```
