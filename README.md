# SkillsAmp

## Description
GrowthCompass is a tool for personal growth, the users can create a team addind others users and choose or create a growth model or choose one that already exists and then create new session of assessments. 
During a session, the user will have to assess himself and the other members of the team. When everybody finish the assessments, The team compare there result for each person of the team and find an agreement for a final assessment. For this, the members can chat together to express there point of view. Then, they determinate 2 indicators to improve for each member and give some tasks to do that will help for the improvment.

[Link Deploy](https://skillsamp.herokuapp.com/)


## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start creating or joining team
-  **Login:** As a user I can login to the platform so that I can see my profile
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **See my profile** As a user I want to see my profile, with my last growth compass, what I have to improve and my team
-  **Add growth Model** As a user I can create a new growth model so that I can share it with the community
-  **Add team** As a user I can create a new team so that I can start to evaluate myself and the other users
-  **See my team** As a user I want to see my team, the list of sessions and the final growth commpass while it's done
-  **See a session** As a user I want to see the sessions of a team with the result and the next step if it's the current one
-  **Do an assessment** As a user I want to ne able to assess myself or the other member of my team
-  **Do the final assessment** As a user I want to be able to share my opinion with my team and find an aggreement for the final growth compass


## Backlog
- Task board
- Add comment during the assessments


# Client

## Routes
| Path | Component | Permissions | Behavior | 
|------|--------|--| -------|
 `/` | HomePageComponent| public/user | Link to login and signup in public and user's dashboard if user |
| `/signup` | SignupPageComponent| anon only| signup form, link to login, navigate to homepage after signup|
| `/login` | LoginPageComponent | anon only |login form, link to signup, navigate to homepage after login |
| `/edit-profile` | EditProfilePageComponent| user only| form to update the user's data|
| `/add-team` | AddTeamPageComponent| user only | form to add team search bar by name for users and for growth model navigate to team page after creation|
| `/add-team` | AddTeamPageComponent| user only | update the users member of the new team |
| `/add-model` | AddGrowthModelPageComponent | user only | creates a new growth model, navigates to profile page after creation |
| `/add-model` | AddGrowthModelPageComponent | user only | update one of my growth model, navigates to profile page after update |
| `/add-model` | AddGrowthModelPageComponent| user only | delete one of my growth model|
| `/team/:id` | TeamPageComponent | user only | dashboard of the team with link to the sessions |
| `/team/:id` | TeamPageComponent | user only | update the team in any changes |
| `/team/:id/session:id` | SessionPageComponent | user only | create a new session |
| `/team/:id/session:id` | SessionPageComponent | user only | display the session with the current state and the next step |
| `/team/:id/session:id` | SessionPageComponent | user only | update the session in any change |
| `/team/:id/session:id/assessment` | AssessmentPageComponent | user only | create an assessment |
| `/team/:id/session:id/assessment` | SessionPageComponent | user only | update the assessment in any change |
| `/team/:id/session:id/final-assessment` | SessionPageComponent | user only | create a final assessment |
| `/team/:id/session:id/final-assessment` | SessionPageComponent | user only | display the final assessment |
| `/team/:id/session:id/final-assessment` | SessionPageComponent | user only | update the final assessment in any change |
| `**` | NotFoundPageComponent | public | 


## Components

- HomeNoUser component
  - Input: empty
  - Output: empty
- Login component
  - Input: user: any
  - Output: user object
- Signup component
  - Input: user: any
  - Output: user object

- Home component
  - Input: user object
  - Output: user object
- Team card component
  - Input: user object
  - Output: team object
- Task card component
  - Input: user object
  - Output: task object
- CurrentGrowthCompass card component
  - Input: user object
  - Output: finalCompass object
- Evolution card component
  - Input: user object
  - Output: finalCompass object

- AddTeam component
  - Input: user: any, growthModel: any
  - Output: team object

- AddGrowthModel component
  - Input: growthModel: any
  - Output: growthModel object
- NewIndicators card component
  - Input: empty
  - Output: change(params indicators.Schema)

- Team component
  - Input: team object
  - Output: team object
- TeamMember card component
  - Input: team object
  - Output: user object
- session card component
  - Input: team object
  - Output: session object

- Assessment component
  - Input: team object
  - Output: session object

- Session component
  - Input: session object
  - Output: session object
- SessionState card component
  - Input: session object
  - Output: session object

- FinalAssessment component
  - Input: session object
  - Output: user object and session object
- SessionFinal card component
  - Input: finalCompass object
  - Output: session object, finalCompass object and user object


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.imageUpload(file)
  - auth.logout()
  - auth.me()

- Team Service
  - team.createTeam(data)
  - team.getOne(id)
  - team.updateOne(id, data)

- User Service
  - user.getAll()
  - user.getOne(id)
  - user.getOneByEmail(email)
  - user.updateTheUserTeam(id, data)
  - user.updateUserCurrentCompass(id, data)
  - user.updateUser(id, data)

- GrowthModel Service
  - growthModel.getAll()
  - growthModel.getOne(id)
  - growthModel.getOneByName(name)

- Checkpoint Service
  - checkpoint.createCheckpoint(data)
  - checkpoint.getAll()
  - checkpoint.getOne(id)
  - checkpoint.updateOne(data)

- FinalCompass Service
  - finalCompass.createFinalCompass(data)
  - finalCompass.getAll()
  - finalCompass.getOne(id)
  - finalCompass.updateOne(id, data)


# Server

## Models
```
user={
  password: String,
  firstName: String,
  lastName: String,
  email: {
    type:String,
    required: true,
    unique: true
  },
  photoUrl: String,
  team: {type: Schema.Types.ObjectId, ref: 'Team'},
  currentGrowthCompass : {type: Schema.Types.ObjectId, ref: 'FinalCompass'}
}

growthModel={
  name:{ type: String, required: true, unique: true},
  indicators:{ type: [indicatorSchema], required: true},
}

team={
  name:{ type: String, required: true},
  members:[{type: Schema.Types.ObjectId, ref: 'User'}],
  growthModel: {type: Schema.Types.ObjectId, ref:'GrowthModel'},
  checkpoints:[{type: Schema.Types.ObjectId, ref: 'Checkpoint'}],
}

checkpoint={
  date: Date,
  assessments:{ type: [assessmentSchema] },
  finalAssessments: [{type: Schema.Types.ObjectId, ref: 'FinalCompass'}],
  currentCheckpoint: Boolean,
}

finalCompass_id={
  evaluated: {type: Schema.Types.ObjectId, ref: 'User'},
  growthCompass:{ type: growthCompassSchema},
  toImprove: {type: Array, default: []},
  done: {type: Boolean, default: false},
  team:{type: Schema.Types.ObjectId, ref: 'Team'}
}
```

## Schemas
```
indicator=newSchema{
  name:{ type: String, required: true},
  levelOne:{ type: String},
  levelTwo:{ type: String},
  levelThree:{ type: String},
  levelFour:{ type: String},
  assessedLevel:{ type: Number, default: 0},
}

growthCompass=newSchema{
  name: String,
  indicators:{ type: [indicatorSchema]},
}

assessment=newSchema{
  evaluator: {type: Schema.Types.ObjectId, ref: 'User'},
  evaluated: {type: Schema.Types.ObjectId, ref: 'User'},
  growthCompass: { type: growthCompassSchema},
  done: {type: Boolean, default: false}
}

```

## Data structure

### Front-end routes

- ('/') : profile page if logged in or home page with login/signup links
- ('/login') : login page
- ('/signup') : signup page
- ('/edit-profile') : edit profile 
- ('/add-team') : form page to create new team
- ('/add-model') : form page to create new growth model
- ('/team:id') : profile of the team which display the users, there growth compass and the sessions
- ('/team:id/session') : dashboard of the session with the users and the next step
- ('/team:id/session/assessment') : assessment page 

## API Endpoints (backend routes)

- GET /auth/me
  - 404 if no user in session
  - 200 with user object
- POST /auth/signup
  - 401 if user logged in
  - body:
    - firstName
    - lastName
    - photoUrl
    - email
    - password
  - validation
    - fields not empty (422)
    - user not exists (409)
  - create user with encrypted password
  - store user in session
  - 200 with user object
- POST /auth/login
  - 401 if user logged in
  - body:
    - email
    - password
  - validation
    - fields not empty (422)
    - user exists (404)
    - passdword matches (404)
  - store user in session
  - 200 with user object
- POST /auth/logout
  - body: (empty)
  - 204

- GET /user/
  - 404 if no user in session
  - 200 with users object
- GET /user/:id
  - 404 if no user
  - 200 with user object
- PUT /user/:id
  - body:
    - team
    - currentGrowthCompass
    - previousGrowthCompass
    - currentTask
    - completedTask
    - myGrowthModel
  - validation
    - id is valid (404)
    - id exists (404)
  - update user

- GET /growth-model/
  - 404 if no growthmodel
  - 200 with growthModels object
- GET /growth-model/:id
  - 404 if no growthModel
  - 200 with growthModel object
- POST /growth-model
  - body:
    - name
    - indicators
  - validation
    - fields not empty
  - create new growthModel
  - updates user in session
- PUT /growth-model/:id
  - body:
    - name
    - indicators
  - validation
    - id is valid (404)
    - id exists (404)
  - update growthModel
- DELETE /growth-model/:id
  - validation
    - id is valid (404)
    - id exists (404)
  - body: (empty - the growthModel is already stored in the users session)
  - remove from growthModel
  - updates user in session

- GET /team/:id
  - 404 if no team
  - 200 with team object
- POST /team
  - body:
    - name
    - members
    - growthModel
  - validation
    - fields not empty
  - create new team
  - updates users
- PUT /team/:id
  - body:
    - members
    - sessions
  - validation
    - id is valid (404)
    - id exists (404)
  - update team

- GET /session/:id
  - 404 if no session
  - 200 with session object
- POST /session
  - body:
    - date
    - currentSession
  - validation
    - fields not empty
  - create new session
  - updates team
- PUT /session/:id
  - body:
    - assessment
    - finalAssessment
    - currentSession
  - validation
    - id is valid (404)
    - id exists (404)
    - currentSession: true
  - update session

- GET /final-compass/:id
  - 404 if no finalCompass
  - 200 with finalCompass object
- POST /final-compass
  - body:
    - evaluated
    - growthCompass
    - toImprove
    - tasks
    - messages
  - validation
    - fields not empty
  - create new finalCompass
  - update session
  - update user
- PUT /final-compass/:id
  - body:
    - evaluated
    - growthCompass
    - toImprove
    - tasks
    - messages
  - validation
    - id is valid (404)
    - id exists (404)
  - update finalCompass


## States y States Transitions

- GrowthCompass Visualisation
- Visualisation of the assessed GrowthCompass
- GrowthCompass first round assessments
- GrowthCompass final assessment
- Authentification
- Teams and users management system
- Growth model builder
- User's evolution
- Personal Growth tasks board
- Landing page
- Help system center


## Task

- Setup achitecture product
- Create the growthModel:
  - Indicators definition
  - levels definition
  - My growthModel management
- growthModel infos interface
- update de growthCompass after assessment
- assess my own growthCompass
- assess other member's growthCompass
- Display the growthCompassess
- Creation of the final assessment
- Definitin of the 2 indicators to improve
- Chat board
- Authentification:
  - log in
  - log out
  - Sign up
  - Edit profile
- Team builder:
  - Users search while creation team
  - growthModel search while creation team
- Current and previous growthCompass listing
- Tasks list creation


## Links


### Trello
[Link url](https://trello.com/b/TB3xiKpg/skillsamp)


### Git
URls for the project repo and deploy
[Link Repo Server](https://github.com/chloeleteinturier/GrowthCompass-Server)
[Link Repo Client](https://github.com/chloeleteinturier/SkillsAmp-Client)
[Link Deploy](https://skillsamp.herokuapp.com/)


### Slides
URls for the project presentation (slides)
[Link Slides.com]()
