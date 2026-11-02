# Lab: Fix failing CI with a GitHub-triggered automation

You will open a pull request that fails CI. Then you will ask Devin to create an Automation that starts a Devin session every time a CI check fails. That session fixes the pull request branch and pushes the fix.

Everything happens in your browser. You do not need to clone or install anything.

## What you need

- A GitHub account.
- A Devin account at [app.devin.ai](https://app.devin.ai).

## Steps

1. **Copy this repo.** On [thequantexplorer/devin-demo-ci-fix-automation](https://github.com/thequantexplorer/devin-demo-ci-fix-automation), click **Use this template**, then **Create a new repository**. Choose your account as the owner, keep the name `devin-demo-ci-fix-automation`, choose **Private**, and click **Create repository**.

   GitHub automations only fire on private repos by default. If your copy is already public, open its **Settings**, scroll to **Danger Zone**, click **Change visibility**, choose **Change to private**, and confirm.

2. **Give Devin access.** In Devin, open [Settings → Connections → GitHub](https://app.devin.ai/settings/connections/github) and make sure your new repo is one of the repositories Devin can access.

3. **Create the failing branch.** Open `https://github.com/<you>/devin-demo-ci-fix-automation/actions/workflows/create-failing-branch.yml`. Click **Run workflow**, then the green **Run workflow** button. Wait until the run has a green check (about 20 seconds).

4. **Open the pull request.** Open `https://github.com/<you>/devin-demo-ci-fix-automation/compare/main...feat/percent-coupons?expand=1` and click **Create pull request**. Wait about a minute. The **test** check fails. Click **Details** to see why:

   ```
   not ok 8 - percent coupon result is whole cents
     expected: 1699
     actual: 1699.15
   not ok 10 - invoice total includes state sales tax
     expected: 4825
     actual: 4499
   # pass 12
   # fail 2
   ```

5. **Create the automation.** Start a session at [app.devin.ai](https://app.devin.ai) and paste the prompt below. Replace `<you>` with your GitHub user or org. When Devin shows the **Create automation** card, check it and approve it.

## Prompt

```
Create a Devin Automation that fixes failing CI on pull requests in my repo https://github.com/<you>/devin-demo-ci-fix-automation.

Use these settings:
- Name: Fix failing CI
- Trigger: GitHub, event "Check run (CI)", repository <you>/devin-demo-ci-fix-automation
- Condition: Conclusion = failure
- Action: Start session, with the repo attached and this prompt:
  "A CI check failed in https://github.com/<you>/devin-demo-ci-fix-automation. The check run event is attached. If the check is not on an open pull request, or its branch is main, stop and do nothing. Otherwise follow the fix-ci skill in .agents/skills/fix-ci/SKILL.md: check out the pull request branch, read the failed job log, find the root cause, fix the code (not the tests), run npm test until every test passes, and push the fix to the same branch. Do not open a new pull request. Do not merge. Leave one comment on the pull request that says what failed and what you changed."

Show me the automation so I can approve it. Do not fix the code yourself in this session.

After it is saved, re-run the failed "test" job on my open pull request from feat/percent-coupons, so the automation fires. If you cannot re-run it, tell me and I will click "Re-run jobs" on GitHub. Then tell me where to find the session the automation starts.
```

## What to watch

- The automation starts a new Devin session a minute or two after the `test` check fails again. You can find it under **Automations** in the sidebar.
- That session pushes a commit to `feat/percent-coupons` and comments on your pull request.
- The **test** check on the pull request turns green.

If Devin cannot re-run the job, open the pull request, click the **Checks** tab, click **Re-run jobs**, then **Re-run failed jobs**.

## Done when

- **Fix failing CI** is listed under **Automations** in Devin.
- Your pull request has a fix commit from Devin and a green **test** check. Nothing was merged.

## Try it again

Push any other change that breaks a test to a pull request branch. The same automation fixes it. You do not need to start a session yourself.

## Without Devin's help

You can also build the automation by hand. In Devin, click **Automations** in the sidebar, then **Create automation**, then **Create**. Add a **GitHub** trigger, pick your repo and the **Check run (CI)** event, and add the condition **Conclusion** = `failure`. For the action, pick **Start session** and paste the quoted prompt from above into **Prompt**. Click **Create automation**.
