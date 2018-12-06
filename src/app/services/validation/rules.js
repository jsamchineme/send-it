
export const userSignupRules = { 
  firstname: [
    {name: "min", ruleValue: 3},
    {name: "max", ruleValue: 30}
  ],
  lastname: [
    {name: "min", ruleValue: 3},
    {name: "max", ruleValue: 30}
  ],
  email: [
    {name: "required"},
    {name: "email"},
    {name: "min", ruleValue: 10},
    {name: "max", ruleValue: 100}
  ],
  username: [
    {name: "required"},
    {name: "min", ruleValue: 8},
    {name: "max", ruleValue: 50}
  ],
  password: [
    {name: "required"},
    {name: "min", ruleValue: 8},
    {name: "max", ruleValue: 40},
  ],
}

