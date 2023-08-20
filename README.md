# Running

- Install dependencies
- Run docker compose to get postgres going: `docker-compose -f docker-compose.yaml up`
- Copy-paste the sql from the `setup.ts` into the postgres console (better migrations coming soon)
- `npm start`


# Todos
- Not allow duplicate phone numbers
- Phone number parsing / sms
- Dockerfile
- Fix db open handles on testing
- Refactor functions to use named parameters to reduce possible errors, 
  creating parameter interfaces for certain operations like user creation params.
- Functional forward-backward migration
- More robust models that inherit a parent model
- Linting, QA, cicd, automatic deployment, etc

# Notes
- AuthToken and SignupToken share a lot in common; their only major difference is AuthToken being for a user and SignupToken to verify the identity of a phone number to create a user. This could be better thought-out.