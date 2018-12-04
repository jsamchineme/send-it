
export const userSignupRules = { 
  firstname: [
    {name: "required"},
    {name: "max", ruleValue: 30}
  ],
  lastname: [
    {name: "required"},
    {name: "max", ruleValue: 30}
  ],
  email: [
    {name: "required"},
    {name: "email"},
    {name: "max", ruleValue: 60}
  ],
  password: [
    {name: "required"},
    {name: "max", ruleValue: 60},
    {name: "min", ruleValue: 10}
  ],
}

