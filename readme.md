git init - Create a new git repo
git status - View the changes to your project
git add - Add files to staging area
git commit - Creates a new commit with files from staging area
git log - View recent commits

git remote add origin git@github.com:paulhudsonx/react-course-2-expensify-app.git
git remote -v

git push -u origin main


To generate public/private rsa key pair:

ssh-keygen -t rsa -b 4096 -C "paulhudsonx@gmail.com"

eval "$(ssh-agent -s)"

ssh-add ~/.ssh/id_rsa

ssh -T git@github.com
