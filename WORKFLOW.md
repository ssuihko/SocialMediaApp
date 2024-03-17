## How to contribute code

Taken from this recording:
https://us02web.zoom.us/rec/share/4fttR9QLqzxY18ptg_8kZv7nBGXFD-5vMpo80mvIuMraMlGpV0FsUagVxoltw1Hp.3c61x-tK3H9rweEn

If something in the instructions is not working, please checkout the video above.

In the projects board

1. create an issue out of the task you've been assinged to.
   Make sure you pick the right project when creating the issue (SocialMediaApp).
2. Make a new branch from the issue view:

![image info](./img/create_branch.png)

3. Make sure you create the new branch out of the main branch

![image info](./img/branch_settings.png)

4. You get a set of commands after clicking the 'create branch' button which look like this:

```console
git fetch origin
git checkout 'branch-name'
```

Inside you local development terminal, make sure you are in the 'main' branch.
You can check this by runnin the command 'git branch -a'.
Copypaste the given commands to terminal inside of the correct project folder and press enter.

By running 'git branch -a' you will now see that you're inside of a new branch.

5. Make your new changes inside of this branch. Add, commit and push to this branch:

```console
git add .
git commit -m "my comment"
git push -u origin 'my-branch-name'
```

6. Navigate to your branch in the repositry. In case your updates are recent, you should see a similar message:

![image info](./img/pr_message.png)

Proceed to create a pull-request. Assign the current team leader to review the pr before merging (preferably do not merge immediately by yourself! Let the reviewer look at the code first.)

### MERGE CONFLICT ENCOUTERED

In terminal in the main branch:

```console
git fetch
git pull
```

Navigate to the branch where your changes are:

```console
git checkout -b 'your-branch-name'
git merge main
```

You will see a merge conflict is created. Fix the merge conflict in your code editor, and add + commit + push to the branch. Now you should be able to merge.
