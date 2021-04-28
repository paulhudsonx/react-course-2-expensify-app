git init - Create a new git repo
git status - View the changes to your project
git add - Add files to staging area
git commit - Creates a new commit with files from staging area
git log - View recent commits

git remote add origin git@github.com:paulhudsonx/react-course-2-expensify-app.git
git remote -v

git push -u origin master

To commit modified only files i.e. without adding new files:

`git commit -a -m ""`


To generate public/private rsa key pair:

ssh-keygen -t rsa -b 4096 -C "paulhudsonx@gmail.com"

eval "$(ssh-agent -s)"

ssh-add ~/.ssh/id_rsa

ssh -T git@github.com

Regenerate node_modules:

yarn install

To run webpack build:

yarn run build


yarn add extract-text-webpack-plugin@3.0.2

yarn add express@4.15.4

###Heroku Installation
sudo snap install --classic heroku
Ensure vi ~/.local/share/heroku/config.json has object {} to prevent unexpected EOF message
heroku --version
heroku login

Create a unique heroku app:
heroku create react-course-2-expensify-ph 

git commit -m "Configure Heroku server"

*Remove npm lockfile, if Heroku complains about 2 lock files:*

`git rm package-lock.json`

`git commit -m "Remove npm lock file"`

`git push heroku master`

To open the app in the browser:
`heroku open`

To view Heroku logs:
`heroku logs`

## Regular vs. Development Dependencies

To add dependency to development:

`yarn add chalk --dev`

Install node modules for production only:

`yarn install --production`

## Dev / Prod Server

`yarn run start`


Run the Jest test suite:

`yarn run dev-server`
`yarn test -- --watch`


