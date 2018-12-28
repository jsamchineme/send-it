
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

export const userLoginRules = { 
  email: [
    {name: "required"},
    {name: "email"},
    {name: "min", ruleValue: 10},
    {name: "max", ruleValue: 100}
  ],
  password: [
    {name: "required"},
    {name: "min", ruleValue: 8},
    {name: "max", ruleValue: 40},
  ],
}

export const adminLoginRules = { 
  email: [
    {name: "required"},
    {name: "email"},
    {name: "min", ruleValue: 10},
    {name: "max", ruleValue: 100}
  ],
  password: [
    {name: "required"},
    {name: "min", ruleValue: 8},
    {name: "max", ruleValue: 40},
  ],
}

export const resetPasswordRules = {
  email: [
    {name: "required"},
    {name: "email"},
    {name: "min", ruleValue: 10},
    {name: "max", ruleValue: 100}
  ],
}

export const changePasswordRules = {
  password: [
    {name: "required"},
    {name: "min", ruleValue: 8},
    {name: "max", ruleValue: 40},
  ],
}

export const createOrderRules = { 
  currentLocation: [
    {name: "required"},
    {name: "min", ruleValue: 10},
    {name: "max", ruleValue: 100}
  ],
  to: [
    {name: "required"},
    {name: "min", ruleValue: 10},
    {name: "max", ruleValue: 100},
  ],
  from: [
    {name: "required"},
    {name: "min", ruleValue: 10},
    {name: "max", ruleValue: 100},
  ],
  description: [
    {name: "min", ruleValue: 10},
    {name: "max", ruleValue: 200},
  ],
  weight: [
    {name: "required"},
    {name: "min", ruleValue: 10, numeric: true},
    {name: "max", ruleValue: 100, numeric: true},
  ],
}

export const editDestinationRules = { 
  to: [
    {name: "required"},
    {name: "min", ruleValue: 10},
    {name: "max", ruleValue: 100},
  ]
}

export const editPresentLocationRules = { 
  currentLocation: [
    {name: "required"},
    {name: "min", ruleValue: 10},
    {name: "max", ruleValue: 100},
  ]
}